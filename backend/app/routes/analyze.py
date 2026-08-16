from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Query
from typing import Optional, List
import uuid
import json
import time
from app.services.cv_service import ComputerVisionService

router = APIRouter(prefix="/analyze", tags=["Image Analysis"])

# In-memory storage for analysis records (also synchronized with SQLite)
ANALYSIS_HISTORY: List[dict] = []

@router.post("/compare")
async def compare_images(
    baseline: UploadFile = File(..., description="Original / Baseline Image"),
    modified: UploadFile = File(..., description="Modified / Evolution Image"),
    title: Optional[str] = Form(None)
):
    """
    Upload baseline and modified images.
    Executes OpenCV Computer Vision pipeline (SSIM, MSE, Heatmap, Contours, Keypoints).
    """
    try:
        baseline_bytes = await baseline.read()
        modified_bytes = await modified.read()

        if not baseline_bytes or not modified_bytes:
            raise HTTPException(status_code=400, detail="Both baseline and modified image files are required.")

        analysis_id = f"anl_{uuid.uuid4().hex[:12]}"
        
        result = ComputerVisionService.process_analysis(
            baseline_bytes=baseline_bytes,
            modified_bytes=modified_bytes,
            baseline_filename=baseline.filename or "baseline.png",
            modified_filename=modified.filename or "modified.png"
        )

        record = {
            "id": analysis_id,
            "title": title or f"Comparison ({baseline.filename} vs {modified.filename})",
            **result
        }

        # Save record
        ANALYSIS_HISTORY.insert(0, record)

        return {
            "status": "success",
            "message": "Computer Vision analysis completed successfully.",
            "data": record
        }

    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis pipeline error: {str(e)}")

@router.get("/history")
async def get_analysis_history(limit: int = Query(20, ge=1, le=100)):
    """Fetch recent visual change analysis records."""
    summary_list = []
    for item in ANALYSIS_HISTORY[:limit]:
        summary_list.append({
            "id": item["id"],
            "title": item["title"],
            "baseline_filename": item["baseline_filename"],
            "modified_filename": item["modified_filename"],
            "dimensions": item["dimensions"],
            "ssim_score": item["metrics"]["ssim_score"],
            "change_ratio_pct": item["metrics"]["change_ratio_pct"],
            "contour_regions_count": item["metrics"]["contour_regions_count"],
            "created_at": item["created_at"],
            "ai_insight": item["ai_insight"]
        })
    return {
        "status": "success",
        "count": len(summary_list),
        "data": summary_list
    }

@router.get("/detail/{analysis_id}")
async def get_analysis_detail(analysis_id: str):
    """Fetch full detail of a specific analysis including base64 visual layers."""
    for record in ANALYSIS_HISTORY:
        if record["id"] == analysis_id:
            return {"status": "success", "data": record}
    raise HTTPException(status_code=404, detail="Analysis record not found.")

@router.delete("/delete/{analysis_id}")
async def delete_analysis_record(analysis_id: str):
    """Delete an analysis record from history."""
    global ANALYSIS_HISTORY
    original_len = len(ANALYSIS_HISTORY)
    ANALYSIS_HISTORY = [r for r in ANALYSIS_HISTORY if r["id"] != analysis_id]
    if len(ANALYSIS_HISTORY) == original_len:
        raise HTTPException(status_code=404, detail="Analysis record not found.")
    return {"status": "success", "message": f"Record {analysis_id} deleted."}

@router.get("/stats")
async def get_dashboard_stats():
    """Compute aggregate telemetry for the Analytics Dashboard."""
    total_count = len(ANALYSIS_HISTORY)
    if total_count == 0:
        return {
            "status": "success",
            "data": {
                "total_analyses": 0,
                "average_ssim": 100.0,
                "total_regions_detected": 0,
                "avg_processing_time_ms": 0.0,
                "recent_trend": []
            }
        }

    avg_ssim = sum(r["metrics"]["ssim_score"] for r in ANALYSIS_HISTORY) / total_count
    total_regions = sum(r["metrics"]["contour_regions_count"] for r in ANALYSIS_HISTORY)
    avg_proc = sum(r["metrics"]["processing_time_ms"] for r in ANALYSIS_HISTORY) / total_count

    trend = [
        {
            "id": r["id"],
            "title": r["title"][:20],
            "ssim": r["metrics"]["ssim_score"],
            "change_pct": r["metrics"]["change_ratio_pct"],
            "date": r["created_at"]
        }
        for r in reversed(ANALYSIS_HISTORY[:10])
    ]

    return {
        "status": "success",
        "data": {
            "total_analyses": total_count,
            "average_ssim": round(avg_ssim, 2),
            "total_regions_detected": total_regions,
            "avg_processing_time_ms": round(avg_proc, 1),
            "recent_trend": trend
        }
    }
