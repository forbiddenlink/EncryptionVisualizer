import React, { useMemo } from 'react';
import type { ECCPoint, ECCCurve } from '@/lib/types/ecc';
import { mod } from '@/lib/crypto/ecc';

interface ECCCurveGraphProps {
  curve: ECCCurve;
  highlightPoints?: { point: ECCPoint; label: string; color: string }[];
  showLine?: { from: ECCPoint; to: ECCPoint };
  className?: string;
}

/**
 * SVG component that draws an elliptic curve over a finite field.
 * Shows grid, axes, curve points, and optional point addition lines.
 */
export const ECCCurveGraph: React.FC<ECCCurveGraphProps> = ({
  curve,
  highlightPoints = [],
  showLine,
  className = '',
}) => {
  const { a, b, p } = curve;

  // For display purposes, limit to reasonable grid size
  const displayP = Math.min(p, 50);

  // Find all points on the curve within display range
  const curvePoints = useMemo(() => {
    const points: ECCPoint[] = [];
    for (let x = 0; x < displayP; x++) {
      const rhs = mod(x * x * x + a * x + b, p);
      for (let y = 0; y < displayP; y++) {
        if (mod(y * y, p) === rhs) {
          if (x < displayP && y < displayP) {
            points.push({ x, y });
          }
        }
      }
    }
    return points;
  }, [a, b, p, displayP]);

  // SVG dimensions and scaling
  const padding = 40;
  const width = 400;
  const height = 400;
  const plotWidth = width - 2 * padding;
  const plotHeight = height - 2 * padding;

  const scaleX = (x: number) => padding + (x / displayP) * plotWidth;
  const scaleY = (y: number) => height - padding - (y / displayP) * plotHeight;

  // Grid lines
  const gridStep = Math.max(1, Math.floor(displayP / 10));
  const gridLines = useMemo(() => {
    const lines: number[] = [];
    for (let i = 0; i <= displayP; i += gridStep) {
      lines.push(i);
    }
    return lines;
  }, [displayP, gridStep]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full max-w-md mx-auto ${className}`}
      role="img"
      aria-label={`Elliptic curve y² = x³ + ${a}x + ${b} (mod ${p}) with ${curvePoints.length} points`}
    >
      {/* Background */}
      <rect
        x={padding}
        y={padding}
        width={plotWidth}
        height={plotHeight}
        className="fill-slate-50 dark:fill-slate-900/50"
        rx={4}
      />

      {/* Grid lines */}
      {gridLines.map((val) => (
        <React.Fragment key={`grid-${val}`}>
          {/* Vertical */}
          <line
            x1={scaleX(val)}
            y1={padding}
            x2={scaleX(val)}
            y2={height - padding}
            className="stroke-slate-200 dark:stroke-slate-700"
            strokeWidth={0.5}
          />
          {/* Horizontal */}
          <line
            x1={padding}
            y1={scaleY(val)}
            x2={width - padding}
            y2={scaleY(val)}
            className="stroke-slate-200 dark:stroke-slate-700"
            strokeWidth={0.5}
          />
          {/* X labels */}
          <text
            x={scaleX(val)}
            y={height - padding + 16}
            textAnchor="middle"
            className="fill-slate-400 dark:fill-slate-500"
            fontSize={9}
            fontFamily="monospace"
          >
            {val}
          </text>
          {/* Y labels */}
          <text
            x={padding - 8}
            y={scaleY(val) + 3}
            textAnchor="end"
            className="fill-slate-400 dark:fill-slate-500"
            fontSize={9}
            fontFamily="monospace"
          >
            {val}
          </text>
        </React.Fragment>
      ))}

      {/* Axes */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        className="stroke-slate-400 dark:stroke-slate-500"
        strokeWidth={1.5}
      />
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        className="stroke-slate-400 dark:stroke-slate-500"
        strokeWidth={1.5}
      />

      {/* Axis labels */}
      <text
        x={width / 2}
        y={height - 4}
        textAnchor="middle"
        className="fill-slate-500 dark:fill-slate-400"
        fontSize={11}
        fontWeight="bold"
      >
        x
      </text>
      <text
        x={10}
        y={height / 2}
        textAnchor="middle"
        className="fill-slate-500 dark:fill-slate-400"
        fontSize={11}
        fontWeight="bold"
        transform={`rotate(-90, 10, ${height / 2})`}
      >
        y
      </text>

      {/* Curve points */}
      {curvePoints.map((point, idx) => (
        <circle
          key={`point-${idx}`}
          cx={scaleX(point.x)}
          cy={scaleY(point.y)}
          r={3}
          className="fill-purple-400/60 dark:fill-purple-400/40"
        />
      ))}

      {/* Line between two points (for visualizing point addition) */}
      {showLine && (
        <line
          x1={scaleX(showLine.from.x)}
          y1={scaleY(showLine.from.y)}
          x2={scaleX(showLine.to.x)}
          y2={scaleY(showLine.to.y)}
          stroke="#f59e0b"
          strokeWidth={1.5}
          strokeDasharray="4,3"
          opacity={0.8}
        />
      )}

      {/* Highlighted points */}
      {highlightPoints.map(({ point, label, color }, idx) => (
        <React.Fragment key={`highlight-${idx}`}>
          {/* Outer glow ring */}
          <circle
            cx={scaleX(point.x)}
            cy={scaleY(point.y)}
            r={8}
            fill={color}
            opacity={0.2}
          />
          {/* Point */}
          <circle
            cx={scaleX(point.x)}
            cy={scaleY(point.y)}
            r={5}
            fill={color}
            stroke="white"
            strokeWidth={1.5}
          />
          {/* Label */}
          <text
            x={scaleX(point.x) + 10}
            y={scaleY(point.y) - 8}
            fill={color}
            fontSize={12}
            fontWeight="bold"
            fontFamily="monospace"
          >
            {label}
          </text>
          {/* Coordinates */}
          <text
            x={scaleX(point.x) + 10}
            y={scaleY(point.y) + 6}
            className="fill-slate-500 dark:fill-slate-400"
            fontSize={9}
            fontFamily="monospace"
          >
            ({point.x},{point.y})
          </text>
        </React.Fragment>
      ))}

      {/* Title */}
      <text
        x={width / 2}
        y={padding - 12}
        textAnchor="middle"
        className="fill-slate-700 dark:fill-slate-300"
        fontSize={12}
        fontWeight="bold"
        fontFamily="monospace"
      >
        y² = x³ + {a}x + {b} (mod {p})
      </text>

      {/* Point count */}
      <text
        x={width - padding}
        y={padding - 12}
        textAnchor="end"
        className="fill-slate-400 dark:fill-slate-500"
        fontSize={9}
      >
        {curvePoints.length} points
      </text>
    </svg>
  );
};
