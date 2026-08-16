try:
    import cv2
    import numpy as np
    from skimage.metrics import structural_similarity as ssim
    CV2_AVAILABLE = True
except ImportError:
    cv2 = None
    np = None
    ssim = None
    CV2_AVAILABLE = False

import io
import base64
from PIL import Image
import time
import math

class ComputerVisionService:
    @staticmethod
    def bytes_to_cv2(image_bytes: bytes) -> np.ndarray:
        """Convert image bytes to OpenCV BGR numpy array."""
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("Invalid image file format or corrupted file.")
        return img

    @staticmethod
    def cv2_to_base64(img: np.ndarray, format: str = ".png") -> str:
        """Convert OpenCV numpy array to base64 image data URI string."""
        _, buffer = cv2.imencode(format, img)
        b64_str = base64.b64encode(buffer).decode("utf-8")
        return f"data:image/png;base64,{b64_str}"

    @classmethod
    def align_images(cls, img1: np.ndarray, img2: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
        """
        Ensure both images have matching dimensions.
        Resizes img2 to match img1 if dimensions differ.
        """
        h1, w1 = img1.shape[:2]
        h2, w2 = img2.shape[:2]

        if (h1, w1) != (h2, w2):
            img2_resized = cv2.resize(img2, (w1, h1), interpolation=cv2.INTER_AREA)
            return img1, img2_resized
        return img1, img2

    @classmethod
    def compute_ssim_and_diff(cls, img1_gray: np.ndarray, img2_gray: np.ndarray):
        """
        Compute Structural Similarity Index (SSIM) and difference map.
        Returns ssim_score (float 0..1), diff_map (0..255 uint8)
        """
        score, diff = ssim(img1_gray, img2_gray, full=True)
        # diff is in [-1, 1], convert to [0, 255]
        diff_uint8 = ((1.0 - diff) * 127.5).astype(np.uint8)
        return float(score), diff_uint8

    @classmethod
    def compute_mse(cls, img1_gray: np.ndarray, img2_gray: np.ndarray) -> float:
        """Compute Mean Squared Error between two images."""
        err = np.sum((img1_gray.astype("float") - img2_gray.astype("float")) ** 2)
        err /= float(img1_gray.shape[0] * img1_gray.shape[1])
        return float(err)

    @classmethod
    def compute_histogram_similarity(cls, img1_bgr: np.ndarray, img2_bgr: np.ndarray) -> float:
        """Compute color histogram correlation (0..1)."""
        hist1 = cv2.calcHist([img1_bgr], [0, 1, 2], None, [8, 8, 8], [0, 256, 0, 256, 0, 256])
        hist2 = cv2.calcHist([img2_bgr], [0, 1, 2], None, [8, 8, 8], [0, 256, 0, 256, 0, 256])
        
        cv2.normalize(hist1, hist1, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
        cv2.normalize(hist2, hist2, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)

        correlation = cv2.compareHist(hist1, hist2, cv2.HISTCMP_CORREL)
        return max(0.0, float(correlation))

    @classmethod
    def generate_heatmap(cls, diff_uint8: np.ndarray) -> np.ndarray:
        """Generate JET color heatmap from uint8 difference map."""
        heatmap_bgr = cv2.applyColorMap(diff_uint8, cv2.COLORMAP_JET)
        return heatmap_bgr

    @classmethod
    def extract_contours_and_boxes(cls, diff_uint8: np.ndarray, base_img: np.ndarray, min_area: int = 50):
        """
        Threshold difference map, find contours, draw bounding boxes on a copy of base_img.
        Returns (contour_overlay_img, regions_list)
        """
        _, thresh = cv2.threshold(diff_uint8, 35, 255, cv2.THRESH_BINARY)
        
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
        thresh_clean = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
        thresh_clean = cv2.morphologyEx(thresh_clean, cv2.MORPH_OPEN, kernel)

        contours, _ = cv2.findContours(thresh_clean, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        overlay = base_img.copy()
        regions = []

        total_changed_pixels = np.count_nonzero(thresh_clean)
        total_pixels = thresh_clean.shape[0] * thresh_clean.shape[1]
        change_ratio = (total_changed_pixels / total_pixels) * 100.0

        region_id = 1
        for c in contours:
            area = cv2.contourArea(c)
            if area < min_area:
                continue

            x, y, w, h = cv2.boundingRect(c)
            cv2.rectangle(overlay, (x, y), (x + w, y + h), (0, 0, 255), 2)
            cv2.rectangle(overlay, (x, max(0, y - 20)), (x + min(w, 80), y), (0, 0, 255), -1)
            cv2.putText(
                overlay,
                f"#{region_id}",
                (x + 5, y - 5),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.45,
                (255, 255, 255),
                1,
                cv2.LINE_AA
            )

            regions.append({
                "id": region_id,
                "x": int(x),
                "y": int(y),
                "width": int(w),
                "height": int(h),
                "area_px": int(area),
                "severity": "High" if area > (total_pixels * 0.05) else ("Medium" if area > (total_pixels * 0.01) else "Low")
            })
            region_id += 1

        return overlay, regions, float(change_ratio), thresh_clean

    @classmethod
    def compute_keypoint_matches(cls, img1_gray: np.ndarray, img2_gray: np.ndarray, max_features: int = 500) -> tuple[np.ndarray, int]:
        """
        Detect ORB keypoints and compute feature matches between baseline and modified image.
        Returns (matches_drawn_image, match_count)
        """
        orb = cv2.ORB_create(nfeatures=max_features)
        kp1, des1 = orb.detectAndCompute(img1_gray, None)
        kp2, des2 = orb.detectAndCompute(img2_gray, None)

        if des1 is None or des2 is None or len(kp1) == 0 or len(kp2) == 0:
            blank = np.hstack((cv2.cvtColor(img1_gray, cv2.COLOR_GRAY2BGR), cv2.cvtColor(img2_gray, cv2.COLOR_GRAY2BGR)))
            return blank, 0

        bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
        matches = bf.match(des1, des2)
        matches = sorted(matches, key=lambda x: x.distance)

        good_matches = matches[:50]
        matched_img = cv2.drawMatches(
            cv2.cvtColor(img1_gray, cv2.COLOR_GRAY2BGR),
            kp1,
            cv2.cvtColor(img2_gray, cv2.COLOR_GRAY2BGR),
            kp2,
            good_matches,
            None,
            flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS
        )
        return matched_img, len(matches)

    @classmethod
    def generate_ai_insight(
        cls,
        ssim_pct: float,
        mse: float,
        hist_sim_pct: float,
        change_ratio: float,
        num_regions: int,
        keypoint_count: int
    ) -> str:
        """Generate human-readable AI analysis insights based on CV telemetry."""
        if ssim_pct > 98.0:
            summary = (
                f"Near-identical images detected with high structural fidelity ({ssim_pct:.1f}% SSIM). "
                f"Only {num_regions} minor visual variance region(s) observed. Change ratio is minimal at {change_ratio:.2f}%."
            )
        elif ssim_pct > 80.0:
            summary = (
                f"Moderate visual evolution identified ({ssim_pct:.1f}% SSIM). "
                f"Located {num_regions} localized alteration zone(s) accounting for {change_ratio:.1f}% overall pixel modification. "
                f"Keypoint descriptor alignment confirmed {keypoint_count} structural correspondence points."
            )
        elif ssim_pct > 50.0:
            summary = (
                f"Significant structural evolution detected ({ssim_pct:.1f}% SSIM). "
                f"Found {num_regions} prominent modified bounding contours spanning {change_ratio:.1f}% of frame area. "
                f"Color histogram correlation sits at {hist_sim_pct:.1f}%."
            )
        else:
            summary = (
                f"Major visual divergence identified with low structural similarity ({ssim_pct:.1f}% SSIM). "
                f"High pixel change ratio ({change_ratio:.1f}%) across {num_regions} distinct contour regions. "
                f"Consider verifying image alignment or scene perspective."
            )
        return summary

    @classmethod
    def process_analysis(
        cls,
        baseline_bytes: bytes,
        modified_bytes: bytes,
        baseline_filename: str = "baseline.png",
        modified_filename: str = "modified.png"
    ) -> dict:
        """Full end-to-end Computer Vision analysis pipeline execution."""
        start_time = time.time()

        img1_bgr = cls.bytes_to_cv2(baseline_bytes)
        img2_bgr = cls.bytes_to_cv2(modified_bytes)

        # Align dimensions
        img1_bgr, img2_bgr = cls.align_images(img1_bgr, img2_bgr)

        # Convert to Grayscale
        img1_gray = cv2.cvtColor(img1_bgr, cv2.COLOR_BGR2GRAY)
        img2_gray = cv2.cvtColor(img2_bgr, cv2.COLOR_BGR2GRAY)

        # Compute Metrics
        ssim_raw, diff_uint8 = cls.compute_ssim_and_diff(img1_gray, img2_gray)
        ssim_pct = round(ssim_raw * 100.0, 2)
        mse_val = round(cls.compute_mse(img1_gray, img2_gray), 2)
        hist_sim_raw = cls.compute_histogram_similarity(img1_bgr, img2_bgr)
        hist_sim_pct = round(hist_sim_raw * 100.0, 2)

        # Generate Heatmap
        heatmap_bgr = cls.generate_heatmap(diff_uint8)

        # Extract Contours & Bounding Boxes
        contour_overlay_bgr, regions, change_ratio, binary_mask = cls.extract_contours_and_boxes(diff_uint8, img2_bgr)
        change_ratio_pct = round(change_ratio, 2)

        # Keypoint Feature Matching
        keypoint_img_bgr, keypoint_match_count = cls.compute_keypoint_matches(img1_gray, img2_gray)

        # Base64 Renderings
        baseline_b64 = cls.cv2_to_base64(img1_bgr)
        modified_b64 = cls.cv2_to_base64(img2_bgr)
        heatmap_b64 = cls.cv2_to_base64(heatmap_bgr)
        contours_b64 = cls.cv2_to_base64(contour_overlay_bgr)
        binary_mask_b64 = cls.cv2_to_base64(binary_mask)
        keypoints_b64 = cls.cv2_to_base64(keypoint_img_bgr)

        elapsed_ms = round((time.time() - start_time) * 1000, 2)

        confidence_meter = round(min(99.9, max(60.0, (ssim_pct * 0.5 + hist_sim_pct * 0.3 + (100 - min(100, change_ratio_pct)) * 0.2))), 1)

        ai_insight = cls.generate_ai_insight(
            ssim_pct=ssim_pct,
            mse=mse_val,
            hist_sim_pct=hist_sim_pct,
            change_ratio=change_ratio_pct,
            num_regions=len(regions),
            keypoint_count=keypoint_match_count
        )

        h, w = img1_bgr.shape[:2]

        return {
            "baseline_filename": baseline_filename,
            "modified_filename": modified_filename,
            "dimensions": f"{w}x{h}",
            "metrics": {
                "ssim_score": ssim_pct,
                "similarity_score": ssim_pct,
                "mse_score": mse_val,
                "histogram_similarity": hist_sim_pct,
                "change_ratio_pct": change_ratio_pct,
                "confidence_meter": confidence_meter,
                "contour_regions_count": len(regions),
                "keypoint_matches_count": keypoint_match_count,
                "processing_time_ms": elapsed_ms,
            },
            "visualizations": {
                "baseline_image": baseline_b64,
                "modified_image": modified_b64,
                "heatmap_image": heatmap_b64,
                "contours_image": contours_b64,
                "binary_mask_image": binary_mask_b64,
                "keypoints_image": keypoints_b64,
            },
            "change_regions": regions,
            "ai_insight": ai_insight,
            "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }
