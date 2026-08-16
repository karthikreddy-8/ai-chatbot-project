import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, Sliders, Maximize2, Flame, Download, FileJson,
  Layers, CheckCircle2, AlertTriangle, FileImage, ShieldCheck
} from 'lucide-react';
import ImageCompareSlider from '../ui/ImageCompareSlider';
import ZoomPanViewer from '../ui/ZoomPanViewer';
import HeatmapOverlay from '../ui/HeatmapOverlay';
import MetricsGauge from '../ui/MetricsGauge';
import { useToast } from '../../context/ToastContext';

export default function AnalysisResultBubble({ result }) {
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'zoom' | 'layers'
  const toast = useToast();

  if (!result) return null;

  const {
    id,
    title,
    baseline_filename,
    modified_filename,
    metrics = {},
    visualizations = {},
    change_regions = [],
    ai_insight,
  } = result;

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `analysis_${id || 'report'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('JSON telemetry report downloaded');
  };

  const handleExportPNG = () => {
    if (!visualizations.heatmap_image) return;
    const link = document.createElement('a');
    link.href = visualizations.heatmap_image;
    link.download = `heatmap_${id || 'diff'}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast.success('Diff heatmap PNG downloaded');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full card p-5 md:p-6 space-y-6 my-4 border-[var(--border-accent)] bg-[var(--bg-tertiary)] shadow-xl"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-primary)] pb-4">
        <div className="flex items-center gap-2 text-[var(--neon-purple-light)] font-bold text-xs uppercase tracking-wider">
          <Sparkles size={16} /> Computer Vision Telemetry & AI Analysis
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-purple font-mono text-[10px]">{id || 'ANL_ID'}</span>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">
            {metrics.processing_time_ms ? `${metrics.processing_time_ms} ms` : 'FastAPI CV Engine'}
          </span>
        </div>
      </div>

      {/* Title & File names */}
      <div>
        <h3 className="text-lg font-extrabold text-[var(--text-primary)] font-['Poppins']">
          {title || 'Image Evolution Analysis'}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] font-mono mt-1">
          Baseline: <span className="text-[var(--neon-cyan)]">{baseline_filename}</span> vs Evolution: <span className="text-[var(--neon-purple-light)]">{modified_filename}</span>
        </p>
      </div>

      {/* AI Insight Box */}
      {ai_insight && (
        <div className="p-4 rounded-xl bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.2)] text-xs text-[var(--text-primary)] leading-relaxed font-medium">
          "{ai_insight}"
        </div>
      )}

      {/* Telemetry Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricsGauge
          score={metrics.ssim_score ?? 100}
          label="SSIM Structural Match"
          sublabel="Structural Similarity Index"
        />

        <div className="p-4 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-primary)] flex flex-col justify-between">
          <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            Pixel Change Ratio
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">
            {metrics.change_ratio_pct ?? 0}%
          </div>
          <div className="text-[10px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-primary)] flex justify-between">
            <span>MSE Error:</span>
            <span className="font-mono text-[var(--text-primary)]">{metrics.mse_score ?? 0}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-primary)] flex flex-col justify-between">
          <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            Contours Detected
          </div>
          <div className="text-2xl font-black text-[var(--neon-purple-light)] font-mono mt-1">
            {metrics.contour_regions_count ?? change_regions.length} Regions
          </div>
          <div className="text-[10px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-primary)] flex justify-between">
            <span>Severity:</span>
            <span className="font-mono text-emerald-400">Localized</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-primary)] flex flex-col justify-between">
          <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            ORB Feature Matches
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
            {metrics.keypoint_matches_count ?? 0} Points
          </div>
          <div className="text-[10px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-primary)] flex justify-between">
            <span>Confidence:</span>
            <span className="font-mono text-[var(--neon-cyan)]">{metrics.confidence_meter ?? 95}%</span>
          </div>
        </div>
      </div>

      {/* View Mode Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-primary)]">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setViewMode('slider')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'slider'
                ? 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-blue)] text-white shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Sliders size={13} /> Split Comparison Slider
          </button>
          <button
            onClick={() => setViewMode('zoom')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'zoom'
                ? 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-blue)] text-white shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Maximize2 size={13} /> Synchronized Zoom/Pan
          </button>
          <button
            onClick={() => setViewMode('layers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'layers'
                ? 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] text-white shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Flame size={13} /> Difference Heatmap & Overlays
          </button>
        </div>

        {/* Exports */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPNG}
            className="btn-secondary py-1.5 px-3 text-xs"
            title="Download Heatmap PNG"
          >
            <Download size={13} /> PNG
          </button>
          <button
            onClick={handleExportJSON}
            className="btn-secondary py-1.5 px-3 text-xs"
            title="Export JSON Telemetry"
          >
            <FileJson size={13} /> JSON
          </button>
        </div>
      </div>

      {/* Interactive Visual Viewport */}
      <div>
        {viewMode === 'slider' && (
          <ImageCompareSlider
            baselineImg={visualizations.baseline_image}
            modifiedImg={visualizations.modified_image}
            baselineLabel={`Baseline (${baseline_filename || 't0'})`}
            modifiedLabel={`Evolution (${modified_filename || 't1'})`}
          />
        )}

        {viewMode === 'zoom' && (
          <ZoomPanViewer
            baselineImg={visualizations.baseline_image}
            modifiedImg={visualizations.modified_image}
          />
        )}

        {viewMode === 'layers' && (
          <HeatmapOverlay
            heatmapImg={visualizations.heatmap_image}
            contoursImg={visualizations.contours_image}
            binaryMaskImg={visualizations.binary_mask_image}
            keypointsImg={visualizations.keypoints_image}
            modifiedImg={visualizations.modified_image}
          />
        )}
      </div>

      {/* Bounding Contours Regions Table */}
      {change_regions && change_regions.length > 0 && (
        <div className="p-4 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-primary)] space-y-3">
          <h4 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2 font-['Poppins']">
            <Layers size={14} className="text-[var(--neon-cyan)]" />
            Detected Contour Change Regions ({change_regions.length})
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[var(--text-secondary)] border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-primary)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
                  <th className="py-2 px-2">ID</th>
                  <th className="py-2 px-2">Bounding Box (X, Y)</th>
                  <th className="py-2 px-2">Dimensions (W x H)</th>
                  <th className="py-2 px-2">Area (px)</th>
                  <th className="py-2 px-2">Severity</th>
                </tr>
              </thead>
              <tbody>
                {change_regions.map((reg) => (
                  <tr key={reg.id} className="border-b border-[var(--border-primary)] hover:bg-[var(--bg-hover)] font-mono text-[11px]">
                    <td className="py-2 px-2 font-bold text-[var(--neon-purple-light)]">#{reg.id}</td>
                    <td className="py-2 px-2">({reg.x}, {reg.y})</td>
                    <td className="py-2 px-2">{reg.width} x {reg.height} px</td>
                    <td className="py-2 px-2">{reg.area_px} px</td>
                    <td className="py-2 px-2">
                      <span className={`badge ${reg.severity === 'High' ? 'badge-red' : reg.severity === 'Medium' ? 'badge-amber' : 'badge-green'}`}>
                        {reg.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
