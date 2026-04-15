import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHotelStore } from "@/store/useHotelStore";
import type {
  AnalyticsData,
  MonthlyOccupancy,
  MonthlyRevenue,
  RevenueByRoomType,
} from "@/types/index";
import { Download, TrendingDown, TrendingUp } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";

// ─── helpers ──────────────────────────────────────────────────────────────────

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function fmtRupees(v: number) {
  if (v >= 10_00_000) return `₹${(v / 10_00_000).toFixed(1)}L`;
  if (v >= 1_000) return `₹${(v / 1000).toFixed(0)}K`;
  return `₹${v}`;
}

function fmtLargeRupees(v: number) {
  if (v >= 1_00_00_000) return `₹${(v / 1_00_00_000).toFixed(1)} Cr`;
  if (v >= 1_00_000) return `₹${(v / 1_00_000).toFixed(1)}L`;
  return `₹${v.toLocaleString("en-IN")}`;
}

interface TooltipState {
  x: number;
  y: number;
  label: string;
  value: string;
  visible: boolean;
}

// ─── KPI card ─────────────────────────────────────────────────────────────────

function KPICard({
  label,
  value,
  change,
  positive,
}: { label: string; value: string; change: string; positive: boolean }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          {label}
        </p>
        <p className="text-2xl font-bold text-foreground font-display">
          {value}
        </p>
        <div className="flex items-center gap-1 mt-2">
          {positive ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-red-400" />
          )}
          <span
            className={`text-xs font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}
          >
            {change}
          </span>
          <span className="text-xs text-muted-foreground">vs prior period</span>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Occupancy Line Chart ─────────────────────────────────────────────────────

const CHART_W = 900;
const CHART_H = 220;
const LINE_PAD = { top: 16, right: 20, bottom: 36, left: 44 };

function OccupancyLineChart({ data }: { data: MonthlyOccupancy[] }) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    x: 0,
    y: 0,
    label: "",
    value: "",
    visible: false,
  });
  const svgRef = useRef<SVGSVGElement>(null);

  const chartW = CHART_W - LINE_PAD.left - LINE_PAD.right;
  const chartH = CHART_H - LINE_PAD.top - LINE_PAD.bottom;

  const sorted = [...data].sort(
    (a, b) => Number(a.year - b.year) || Number(a.month - b.month),
  );
  const pts = sorted.map((d, i) => ({
    x:
      LINE_PAD.left +
      (sorted.length > 1 ? i / (sorted.length - 1) : 0.5) * chartW,
    y: LINE_PAD.top + chartH - (d.occupancyPercent / 100) * chartH,
    label: `${MONTH_LABELS[Number(d.month) - 1]} ${d.year}`,
    value: `${d.occupancyPercent.toFixed(1)}%`,
    monthKey: `${d.year}-${d.month}`,
  }));

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const yTicks = [0, 25, 50, 75, 100];

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${CHART_W} ${CHART_H}`}
      className="w-full"
      aria-label="Occupancy trend line chart"
      role="img"
      onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
    >
      {/* Y-axis grid */}
      {yTicks.map((tick) => {
        const y = LINE_PAD.top + chartH - (tick / 100) * chartH;
        return (
          <g key={tick}>
            <line
              x1={LINE_PAD.left}
              y1={y}
              x2={LINE_PAD.left + chartW}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.08}
              strokeDasharray="4 3"
            />
            <text
              x={LINE_PAD.left - 6}
              y={y + 4}
              textAnchor="end"
              fontSize={11}
              fill="currentColor"
              fillOpacity={0.45}
            >
              {tick}%
            </text>
          </g>
        );
      })}

      {/* X-axis labels */}
      {pts.map((p) => (
        <text
          key={p.monthKey}
          x={p.x}
          y={CHART_H - 8}
          textAnchor="middle"
          fontSize={11}
          fill="currentColor"
          fillOpacity={0.5}
        >
          {p.label.split(" ")[0]}
        </text>
      ))}

      {/* Area fill */}
      {pts.length > 1 && (
        <polygon
          points={`${pts[0].x},${LINE_PAD.top + chartH} ${polyline} ${pts[pts.length - 1].x},${LINE_PAD.top + chartH}`}
          fill="#f59e0b"
          fillOpacity={0.07}
        />
      )}

      {/* Line */}
      <polyline
        points={polyline}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Data points */}
      {pts.map((p) => (
        <circle
          key={p.monthKey}
          cx={p.x}
          cy={p.y}
          r={5}
          fill="#f59e0b"
          stroke="hsl(var(--card))"
          strokeWidth={2}
          className="cursor-pointer"
          onMouseEnter={(e) => {
            const rect = svgRef.current?.getBoundingClientRect();
            if (!rect) return;
            const scaleX = CHART_W / rect.width;
            const relX = (e.clientX - rect.left) * scaleX;
            setTooltip({
              x: relX,
              y: p.y,
              label: p.label,
              value: p.value,
              visible: true,
            });
          }}
        />
      ))}

      {/* Tooltip */}
      {tooltip.visible && (
        <foreignObject
          x={Math.min(tooltip.x + 8, CHART_W - 125)}
          y={Math.max(tooltip.y - 44, 4)}
          width={115}
          height={44}
        >
          <div className="bg-card border border-border rounded px-2 py-1 text-xs shadow-lg pointer-events-none">
            <p className="text-muted-foreground">{tooltip.label}</p>
            <p className="text-primary font-semibold">{tooltip.value}</p>
          </div>
        </foreignObject>
      )}
    </svg>
  );
}

// ─── Revenue Bar Chart ────────────────────────────────────────────────────────

const BAR_W = 440;
const BAR_H = 220;
const BAR_PAD = { top: 16, right: 12, bottom: 36, left: 52 };

function RevenueBarChart({ data }: { data: MonthlyRevenue[] }) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    x: 0,
    y: 0,
    label: "",
    value: "",
    visible: false,
  });
  const svgRef = useRef<SVGSVGElement>(null);

  const chartW = BAR_W - BAR_PAD.left - BAR_PAD.right;
  const chartH = BAR_H - BAR_PAD.top - BAR_PAD.bottom;

  const sorted = [...data].sort(
    (a, b) => Number(a.year - b.year) || Number(a.month - b.month),
  );
  const maxRev = Math.max(...sorted.map((d) => d.revenue), 1);
  const gap = chartW / sorted.length;
  const barW = gap * 0.6;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(maxRev * f));

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${BAR_W} ${BAR_H}`}
      className="w-full"
      aria-label="Revenue by month bar chart"
      role="img"
      onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
    >
      <defs>
        <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.95} />
          <stop offset="100%" stopColor="#d97706" stopOpacity={0.55} />
        </linearGradient>
      </defs>

      {yTicks.map((tick) => {
        const y = BAR_PAD.top + chartH - (tick / maxRev) * chartH;
        return (
          <g key={tick}>
            <line
              x1={BAR_PAD.left}
              y1={y}
              x2={BAR_PAD.left + chartW}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.08}
              strokeDasharray="4 3"
            />
            <text
              x={BAR_PAD.left - 6}
              y={y + 4}
              textAnchor="end"
              fontSize={10}
              fill="currentColor"
              fillOpacity={0.45}
            >
              {fmtRupees(tick)}
            </text>
          </g>
        );
      })}

      {sorted.map((d, i) => {
        const barH = (d.revenue / maxRev) * chartH;
        const bx = BAR_PAD.left + i * gap + (gap - barW) / 2;
        const by = BAR_PAD.top + chartH - barH;
        const monthLabel = MONTH_LABELS[Number(d.month) - 1];
        const monthKey = `${d.year}-${d.month}`;
        return (
          <g key={monthKey}>
            <rect
              x={bx}
              y={by}
              width={barW}
              height={barH}
              fill="url(#bar-grad)"
              rx={3}
              className="cursor-pointer transition-opacity hover:opacity-90"
              onMouseEnter={(e) => {
                const rect = svgRef.current?.getBoundingClientRect();
                if (!rect) return;
                const scaleX = BAR_W / rect.width;
                const relX = (e.clientX - rect.left) * scaleX;
                setTooltip({
                  x: relX,
                  y: by,
                  label: `${monthLabel} ${d.year}`,
                  value: fmtLargeRupees(d.revenue),
                  visible: true,
                });
              }}
            />
            <text
              x={bx + barW / 2}
              y={BAR_H - 8}
              textAnchor="middle"
              fontSize={10}
              fill="currentColor"
              fillOpacity={0.5}
            >
              {monthLabel}
            </text>
          </g>
        );
      })}

      {tooltip.visible && (
        <foreignObject
          x={Math.min(tooltip.x + 8, BAR_W - 120)}
          y={Math.max(tooltip.y - 44, 4)}
          width={115}
          height={44}
        >
          <div className="bg-card border border-border rounded px-2 py-1 text-xs shadow-lg pointer-events-none">
            <p className="text-muted-foreground">{tooltip.label}</p>
            <p className="text-primary font-semibold">{tooltip.value}</p>
          </div>
        </foreignObject>
      )}
    </svg>
  );
}

// ─── Donut Chart ──────────────────────────────────────────────────────────────

const ROOM_COLORS: Record<string, string> = {
  Standard: "#3b82f6",
  Deluxe: "#22c55e",
  Suite: "#f59e0b",
  Presidential: "#a855f7",
};

const DONUT_CX = 100;
const DONUT_CY = 100;
const DONUT_R = 72;
const DONUT_INNER_R = 48;

function DonutChart({
  data,
  total,
}: { data: RevenueByRoomType[]; total: number }) {
  const [active, setActive] = useState<string | null>(null);

  let cumulative = 0;
  const segments = data.map((d) => {
    const label = d.roomType as unknown as string;
    const pct = total > 0 ? d.revenue / total : 0;
    const start = cumulative * 2 * Math.PI - Math.PI / 2;
    cumulative += pct;
    const end = cumulative * 2 * Math.PI - Math.PI / 2;
    return {
      label,
      color: ROOM_COLORS[label] ?? "#888",
      percent: pct * 100,
      revenue: d.revenue,
      start,
      end,
    };
  });

  function arcPath(s: number, e: number, outerR: number, innerR: number) {
    const x1 = DONUT_CX + outerR * Math.cos(s);
    const y1 = DONUT_CY + outerR * Math.sin(s);
    const x2 = DONUT_CX + outerR * Math.cos(e);
    const y2 = DONUT_CY + outerR * Math.sin(e);
    const x3 = DONUT_CX + innerR * Math.cos(e);
    const y3 = DONUT_CY + innerR * Math.sin(e);
    const x4 = DONUT_CX + innerR * Math.cos(s);
    const y4 = DONUT_CY + innerR * Math.sin(s);
    const large = e - s > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${large} 0 ${x4} ${y4} Z`;
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <svg
        viewBox="0 0 200 200"
        className="w-44 h-44"
        aria-label="Revenue by room type donut chart"
        role="img"
      >
        {segments.map((seg) => (
          <path
            key={seg.label}
            d={arcPath(
              seg.start,
              seg.end,
              active === seg.label ? DONUT_R + 5 : DONUT_R,
              DONUT_INNER_R,
            )}
            fill={seg.color}
            fillOpacity={active && active !== seg.label ? 0.35 : 0.88}
            className="cursor-pointer transition-all duration-150"
            onMouseEnter={() => setActive(seg.label)}
            onMouseLeave={() => setActive(null)}
          />
        ))}
        <text
          x={DONUT_CX}
          y={DONUT_CY - 7}
          textAnchor="middle"
          fontSize={9}
          fill="currentColor"
          fillOpacity={0.5}
        >
          Total
        </text>
        <text
          x={DONUT_CX}
          y={DONUT_CY + 8}
          textAnchor="middle"
          fontSize={11}
          fontWeight={700}
          fill="currentColor"
        >
          {fmtRupees(total)}
        </text>
      </svg>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full px-2">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setActive(seg.label)}
            onMouseLeave={() => setActive(null)}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: seg.color }}
            />
            <span className="text-xs text-muted-foreground truncate">
              {seg.label}
            </span>
            <span className="text-xs font-semibold text-foreground ml-auto">
              {seg.percent.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Month Select ─────────────────────────────────────────────────────────────

function MonthYearSelect({
  monthId,
  yearId,
  month,
  year,
  onMonthChange,
  onYearChange,
  years,
}: {
  monthId: string;
  yearId: string;
  month: number;
  year: number;
  onMonthChange: (v: number) => void;
  onYearChange: (v: number) => void;
  years: number[];
}) {
  return (
    <div className="flex gap-1.5">
      <select
        id={monthId}
        className="bg-input border border-border text-foreground text-sm rounded-md px-2 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
        value={month}
        onChange={(e) => onMonthChange(Number(e.target.value))}
      >
        {MONTH_LABELS.map((m, i) => (
          <option key={m} value={i + 1}>
            {m}
          </option>
        ))}
      </select>
      <select
        id={yearId}
        className="bg-input border border-border text-foreground text-sm rounded-md px-2 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
        value={year}
        onChange={(e) => onYearChange(Number(e.target.value))}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const { hotels, analyticsData } = useHotelStore((s) => ({
    hotels: s.hotels,
    analyticsData: s.analyticsData,
  }));

  const [filterHotelId, setFilterHotelId] = useState<string>("all");
  const [startMonth, setStartMonth] = useState<number>(11);
  const [startYear, setStartYear] = useState<number>(2025);
  const [endMonth, setEndMonth] = useState<number>(4);
  const [endYear, setEndYear] = useState<number>(2026);
  const [applied, setApplied] = useState({
    filterHotelId: "all",
    startMonth: 11,
    startYear: 2025,
    endMonth: 4,
    endYear: 2026,
  });

  function applyFilters() {
    setApplied({ filterHotelId, startMonth, startYear, endMonth, endYear });
  }

  const merged = useMemo<AnalyticsData | null>(() => {
    const list =
      applied.filterHotelId === "all"
        ? analyticsData
        : analyticsData.filter(
            (a) => a.hotelId.toString() === applied.filterHotelId,
          );
    if (list.length === 0) return null;

    function inRange(month: bigint, year: bigint) {
      const n = Number(year) * 100 + Number(month);
      const from = applied.startYear * 100 + applied.startMonth;
      const to = applied.endYear * 100 + applied.endMonth;
      return n >= from && n <= to;
    }

    const revMap = new Map<string, MonthlyRevenue>();
    const occMap = new Map<string, MonthlyOccupancy>();
    const roomMap = new Map<
      string,
      { revenue: number; bookingCount: bigint }
    >();

    for (const a of list) {
      for (const m of a.revenueByMonth.filter((r) =>
        inRange(r.month, r.year),
      )) {
        const k = `${m.year}-${m.month}`;
        const ex = revMap.get(k);
        if (ex) ex.revenue += m.revenue;
        else revMap.set(k, { ...m });
      }

      for (const m of a.occupancyByMonth.filter((o) =>
        inRange(o.month, o.year),
      )) {
        const k = `${m.year}-${m.month}`;
        const ex = occMap.get(k);
        if (ex) {
          const occ = Number(ex.occupiedRooms) + Number(m.occupiedRooms);
          const tot = Number(ex.totalRooms) + Number(m.totalRooms);
          ex.occupiedRooms = BigInt(occ);
          ex.totalRooms = BigInt(tot);
          ex.occupancyPercent = tot > 0 ? (occ / tot) * 100 : 0;
        } else {
          occMap.set(k, { ...m });
        }
      }

      for (const rt of a.revenueByRoomType) {
        const key = rt.roomType as unknown as string;
        const ex = roomMap.get(key);
        if (ex) {
          ex.revenue += rt.revenue;
          ex.bookingCount += rt.bookingCount;
        } else {
          roomMap.set(key, {
            revenue: rt.revenue,
            bookingCount: rt.bookingCount,
          });
        }
      }
    }

    const revenueByMonth = Array.from(revMap.values());
    const occupancyByMonth = Array.from(occMap.values());
    const revenueByRoomType: RevenueByRoomType[] = Array.from(
      roomMap.entries(),
    ).map(([key, val]) => ({
      roomType: key as unknown as RevenueByRoomType["roomType"],
      ...val,
    }));

    const totalRevenue = revenueByMonth.reduce((s, m) => s + m.revenue, 0);
    const avgOccupancy =
      occupancyByMonth.length > 0
        ? occupancyByMonth.reduce((s, m) => s + m.occupancyPercent, 0) /
          occupancyByMonth.length
        : 0;
    const totalOccNights = occupancyByMonth.reduce(
      (s, m) => s + Number(m.occupiedRooms) * 30,
      0,
    );
    const totalAvailNights = occupancyByMonth.reduce(
      (s, m) => s + Number(m.totalRooms) * 30,
      0,
    );

    return {
      hotelId: list[0].hotelId,
      totalRevenue,
      adr: totalOccNights > 0 ? totalRevenue / totalOccNights : 0,
      revpar: totalAvailNights > 0 ? totalRevenue / totalAvailNights : 0,
      overallOccupancyPercent: avgOccupancy,
      revenueByMonth,
      occupancyByMonth,
      revenueByRoomType,
    };
  }, [analyticsData, applied]);

  const donutTotal =
    merged?.revenueByRoomType.reduce((s, r) => s + r.revenue, 0) ?? 0;
  const years = [2025, 2026];

  return (
    <div className="flex flex-col gap-6 p-6" data-ocid="reports.page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">
            Reports & Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track revenue, occupancy and performance metrics
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          data-ocid="reports.export_button"
          onClick={() => toast.info("Export feature coming soon")}
        >
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border" data-ocid="reports.filters.panel">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-end gap-3">
            {/* Property */}
            <div className="flex flex-col gap-1.5 min-w-[180px]">
              <label
                htmlFor="reports-property"
                className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Property
              </label>
              <select
                id="reports-property"
                className="bg-input border border-border text-foreground text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
                value={filterHotelId}
                onChange={(e) => setFilterHotelId(e.target.value)}
                data-ocid="reports.property.select"
              >
                <option value="all">All Properties</option>
                {hotels.map((h) => (
                  <option key={h.id.toString()} value={h.id.toString()}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>

            {/* From Month */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="reports-start-month"
                className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                From Month
              </label>
              <MonthYearSelect
                monthId="reports-start-month"
                yearId="reports-start-year"
                month={startMonth}
                year={startYear}
                onMonthChange={setStartMonth}
                onYearChange={setStartYear}
                years={years}
              />
            </div>

            {/* To Month */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="reports-end-month"
                className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                To Month
              </label>
              <MonthYearSelect
                monthId="reports-end-month"
                yearId="reports-end-year"
                month={endMonth}
                year={endYear}
                onMonthChange={setEndMonth}
                onYearChange={setEndYear}
                years={years}
              />
            </div>

            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={applyFilters}
              data-ocid="reports.apply_filters.button"
            >
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="reports.kpi.section"
      >
        <KPICard
          label="Total Revenue"
          value={fmtLargeRupees(merged?.totalRevenue ?? 0)}
          change="+6.2%"
          positive={true}
        />
        <KPICard
          label="Occupancy %"
          value={`${(merged?.overallOccupancyPercent ?? 0).toFixed(1)}%`}
          change="+3.8%"
          positive={true}
        />
        <KPICard
          label="ADR"
          value={fmtLargeRupees(Math.round(merged?.adr ?? 0))}
          change="-1.4%"
          positive={false}
        />
        <KPICard
          label="RevPAR"
          value={fmtLargeRupees(Math.round(merged?.revpar ?? 0))}
          change="+4.2%"
          positive={true}
        />
      </div>

      {/* Occupancy Trend – full width */}
      <Card
        className="bg-card border-border"
        data-ocid="reports.occupancy_chart.card"
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-foreground">
              Occupancy Trend
            </CardTitle>
            <Badge
              variant="outline"
              className="text-primary border-primary/40 text-xs"
            >
              Occupancy %
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {merged && merged.occupancyByMonth.length > 0 ? (
            <OccupancyLineChart data={merged.occupancyByMonth} />
          ) : (
            <div
              className="h-36 flex items-center justify-center text-muted-foreground text-sm"
              data-ocid="reports.occupancy_chart.empty_state"
            >
              No data for the selected range
            </div>
          )}
        </CardContent>
      </Card>

      {/* Revenue Bar + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card
          className="bg-card border-border"
          data-ocid="reports.revenue_chart.card"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">
              Revenue by Month
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {merged && merged.revenueByMonth.length > 0 ? (
              <RevenueBarChart data={merged.revenueByMonth} />
            ) : (
              <div
                className="h-36 flex items-center justify-center text-muted-foreground text-sm"
                data-ocid="reports.revenue_chart.empty_state"
              >
                No data for the selected range
              </div>
            )}
          </CardContent>
        </Card>

        <Card
          className="bg-card border-border"
          data-ocid="reports.roomtype_chart.card"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">
              Revenue by Room Type
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 flex justify-center">
            {merged && merged.revenueByRoomType.length > 0 ? (
              <DonutChart data={merged.revenueByRoomType} total={donutTotal} />
            ) : (
              <div
                className="h-36 flex items-center justify-center text-muted-foreground text-sm"
                data-ocid="reports.roomtype_chart.empty_state"
              >
                No data for the selected range
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
