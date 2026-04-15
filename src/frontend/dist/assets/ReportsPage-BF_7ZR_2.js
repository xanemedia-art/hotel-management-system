import { j as jsxRuntimeExports, a as cn, u as useHotelStore, r as reactExports, f as ue } from "./index-CBcYPlz6.js";
import { B as Badge } from "./badge-Ca613t8w.js";
import { B as Button } from "./button-Db-hK2sn.js";
import { D as Download } from "./download-B4gvO5Sw.js";
import { T as TrendingUp } from "./trending-up-Cl6YUfoP.js";
import { T as TrendingDown } from "./trending-down-BnViMsFb.js";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
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
  "Dec"
];
function fmtRupees(v) {
  if (v >= 1e6) return `₹${(v / 1e6).toFixed(1)}L`;
  if (v >= 1e3) return `₹${(v / 1e3).toFixed(0)}K`;
  return `₹${v}`;
}
function fmtLargeRupees(v) {
  if (v >= 1e7) return `₹${(v / 1e7).toFixed(1)} Cr`;
  if (v >= 1e5) return `₹${(v / 1e5).toFixed(1)}L`;
  return `₹${v.toLocaleString("en-IN")}`;
}
function KPICard({
  label,
  value,
  change,
  positive
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground font-display", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2", children: [
      positive ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3.5 h-3.5 text-red-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-xs font-medium ${positive ? "text-emerald-400" : "text-red-400"}`,
          children: change
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "vs prior period" })
    ] })
  ] }) });
}
const CHART_W = 900;
const CHART_H = 220;
const LINE_PAD = { top: 16, right: 20, bottom: 36, left: 44 };
function OccupancyLineChart({ data }) {
  const [tooltip, setTooltip] = reactExports.useState({
    x: 0,
    y: 0,
    label: "",
    value: "",
    visible: false
  });
  const svgRef = reactExports.useRef(null);
  const chartW = CHART_W - LINE_PAD.left - LINE_PAD.right;
  const chartH = CHART_H - LINE_PAD.top - LINE_PAD.bottom;
  const sorted = [...data].sort(
    (a, b) => Number(a.year - b.year) || Number(a.month - b.month)
  );
  const pts = sorted.map((d, i) => ({
    x: LINE_PAD.left + (sorted.length > 1 ? i / (sorted.length - 1) : 0.5) * chartW,
    y: LINE_PAD.top + chartH - d.occupancyPercent / 100 * chartH,
    label: `${MONTH_LABELS[Number(d.month) - 1]} ${d.year}`,
    value: `${d.occupancyPercent.toFixed(1)}%`,
    monthKey: `${d.year}-${d.month}`
  }));
  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const yTicks = [0, 25, 50, 75, 100];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      ref: svgRef,
      viewBox: `0 0 ${CHART_W} ${CHART_H}`,
      className: "w-full",
      "aria-label": "Occupancy trend line chart",
      role: "img",
      onMouseLeave: () => setTooltip((t) => ({ ...t, visible: false })),
      children: [
        yTicks.map((tick) => {
          const y = LINE_PAD.top + chartH - tick / 100 * chartH;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "line",
              {
                x1: LINE_PAD.left,
                y1: y,
                x2: LINE_PAD.left + chartW,
                y2: y,
                stroke: "currentColor",
                strokeOpacity: 0.08,
                strokeDasharray: "4 3"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "text",
              {
                x: LINE_PAD.left - 6,
                y: y + 4,
                textAnchor: "end",
                fontSize: 11,
                fill: "currentColor",
                fillOpacity: 0.45,
                children: [
                  tick,
                  "%"
                ]
              }
            )
          ] }, tick);
        }),
        pts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: p.x,
            y: CHART_H - 8,
            textAnchor: "middle",
            fontSize: 11,
            fill: "currentColor",
            fillOpacity: 0.5,
            children: p.label.split(" ")[0]
          },
          p.monthKey
        )),
        pts.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polygon",
          {
            points: `${pts[0].x},${LINE_PAD.top + chartH} ${polyline} ${pts[pts.length - 1].x},${LINE_PAD.top + chartH}`,
            fill: "#f59e0b",
            fillOpacity: 0.07
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polyline",
          {
            points: polyline,
            fill: "none",
            stroke: "#f59e0b",
            strokeWidth: 2.5,
            strokeLinejoin: "round",
            strokeLinecap: "round"
          }
        ),
        pts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: p.x,
            cy: p.y,
            r: 5,
            fill: "#f59e0b",
            stroke: "hsl(var(--card))",
            strokeWidth: 2,
            className: "cursor-pointer",
            onMouseEnter: (e) => {
              var _a;
              const rect = (_a = svgRef.current) == null ? void 0 : _a.getBoundingClientRect();
              if (!rect) return;
              const scaleX = CHART_W / rect.width;
              const relX = (e.clientX - rect.left) * scaleX;
              setTooltip({
                x: relX,
                y: p.y,
                label: p.label,
                value: p.value,
                visible: true
              });
            }
          },
          p.monthKey
        )),
        tooltip.visible && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "foreignObject",
          {
            x: Math.min(tooltip.x + 8, CHART_W - 125),
            y: Math.max(tooltip.y - 44, 4),
            width: 115,
            height: 44,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded px-2 py-1 text-xs shadow-lg pointer-events-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: tooltip.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold", children: tooltip.value })
            ] })
          }
        )
      ]
    }
  );
}
const BAR_W = 440;
const BAR_H = 220;
const BAR_PAD = { top: 16, right: 12, bottom: 36, left: 52 };
function RevenueBarChart({ data }) {
  const [tooltip, setTooltip] = reactExports.useState({
    x: 0,
    y: 0,
    label: "",
    value: "",
    visible: false
  });
  const svgRef = reactExports.useRef(null);
  const chartW = BAR_W - BAR_PAD.left - BAR_PAD.right;
  const chartH = BAR_H - BAR_PAD.top - BAR_PAD.bottom;
  const sorted = [...data].sort(
    (a, b) => Number(a.year - b.year) || Number(a.month - b.month)
  );
  const maxRev = Math.max(...sorted.map((d) => d.revenue), 1);
  const gap = chartW / sorted.length;
  const barW = gap * 0.6;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(maxRev * f));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      ref: svgRef,
      viewBox: `0 0 ${BAR_W} ${BAR_H}`,
      className: "w-full",
      "aria-label": "Revenue by month bar chart",
      role: "img",
      onMouseLeave: () => setTooltip((t) => ({ ...t, visible: false })),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "bar-grad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#f59e0b", stopOpacity: 0.95 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#d97706", stopOpacity: 0.55 })
        ] }) }),
        yTicks.map((tick) => {
          const y = BAR_PAD.top + chartH - tick / maxRev * chartH;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "line",
              {
                x1: BAR_PAD.left,
                y1: y,
                x2: BAR_PAD.left + chartW,
                y2: y,
                stroke: "currentColor",
                strokeOpacity: 0.08,
                strokeDasharray: "4 3"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: BAR_PAD.left - 6,
                y: y + 4,
                textAnchor: "end",
                fontSize: 10,
                fill: "currentColor",
                fillOpacity: 0.45,
                children: fmtRupees(tick)
              }
            )
          ] }, tick);
        }),
        sorted.map((d, i) => {
          const barH = d.revenue / maxRev * chartH;
          const bx = BAR_PAD.left + i * gap + (gap - barW) / 2;
          const by = BAR_PAD.top + chartH - barH;
          const monthLabel = MONTH_LABELS[Number(d.month) - 1];
          const monthKey = `${d.year}-${d.month}`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "rect",
              {
                x: bx,
                y: by,
                width: barW,
                height: barH,
                fill: "url(#bar-grad)",
                rx: 3,
                className: "cursor-pointer transition-opacity hover:opacity-90",
                onMouseEnter: (e) => {
                  var _a;
                  const rect = (_a = svgRef.current) == null ? void 0 : _a.getBoundingClientRect();
                  if (!rect) return;
                  const scaleX = BAR_W / rect.width;
                  const relX = (e.clientX - rect.left) * scaleX;
                  setTooltip({
                    x: relX,
                    y: by,
                    label: `${monthLabel} ${d.year}`,
                    value: fmtLargeRupees(d.revenue),
                    visible: true
                  });
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: bx + barW / 2,
                y: BAR_H - 8,
                textAnchor: "middle",
                fontSize: 10,
                fill: "currentColor",
                fillOpacity: 0.5,
                children: monthLabel
              }
            )
          ] }, monthKey);
        }),
        tooltip.visible && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "foreignObject",
          {
            x: Math.min(tooltip.x + 8, BAR_W - 120),
            y: Math.max(tooltip.y - 44, 4),
            width: 115,
            height: 44,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded px-2 py-1 text-xs shadow-lg pointer-events-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: tooltip.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold", children: tooltip.value })
            ] })
          }
        )
      ]
    }
  );
}
const ROOM_COLORS = {
  Standard: "#3b82f6",
  Deluxe: "#22c55e",
  Suite: "#f59e0b",
  Presidential: "#a855f7"
};
const DONUT_CX = 100;
const DONUT_CY = 100;
const DONUT_R = 72;
const DONUT_INNER_R = 48;
function DonutChart({
  data,
  total
}) {
  const [active, setActive] = reactExports.useState(null);
  let cumulative = 0;
  const segments = data.map((d) => {
    const label = d.roomType;
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
      end
    };
  });
  function arcPath(s, e, outerR, innerR) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: "0 0 200 200",
        className: "w-44 h-44",
        "aria-label": "Revenue by room type donut chart",
        role: "img",
        children: [
          segments.map((seg) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: arcPath(
                seg.start,
                seg.end,
                active === seg.label ? DONUT_R + 5 : DONUT_R,
                DONUT_INNER_R
              ),
              fill: seg.color,
              fillOpacity: active && active !== seg.label ? 0.35 : 0.88,
              className: "cursor-pointer transition-all duration-150",
              onMouseEnter: () => setActive(seg.label),
              onMouseLeave: () => setActive(null)
            },
            seg.label
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: DONUT_CX,
              y: DONUT_CY - 7,
              textAnchor: "middle",
              fontSize: 9,
              fill: "currentColor",
              fillOpacity: 0.5,
              children: "Total"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: DONUT_CX,
              y: DONUT_CY + 8,
              textAnchor: "middle",
              fontSize: 11,
              fontWeight: 700,
              fill: "currentColor",
              children: fmtRupees(total)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-6 gap-y-2 w-full px-2", children: segments.map((seg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 cursor-pointer",
        onMouseEnter: () => setActive(seg.label),
        onMouseLeave: () => setActive(null),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
              style: { background: seg.color }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: seg.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-foreground ml-auto", children: [
            seg.percent.toFixed(0),
            "%"
          ] })
        ]
      },
      seg.label
    )) })
  ] });
}
function MonthYearSelect({
  monthId,
  yearId,
  month,
  year,
  onMonthChange,
  onYearChange,
  years
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "select",
      {
        id: monthId,
        className: "bg-input border border-border text-foreground text-sm rounded-md px-2 py-2 focus:outline-none focus:ring-1 focus:ring-ring",
        value: month,
        onChange: (e) => onMonthChange(Number(e.target.value)),
        children: MONTH_LABELS.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: i + 1, children: m }, m))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "select",
      {
        id: yearId,
        className: "bg-input border border-border text-foreground text-sm rounded-md px-2 py-2 focus:outline-none focus:ring-1 focus:ring-ring",
        value: year,
        onChange: (e) => onYearChange(Number(e.target.value)),
        children: years.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: y, children: y }, y))
      }
    )
  ] });
}
function ReportsPage() {
  const { hotels, analyticsData } = useHotelStore((s) => ({
    hotels: s.hotels,
    analyticsData: s.analyticsData
  }));
  const [filterHotelId, setFilterHotelId] = reactExports.useState("all");
  const [startMonth, setStartMonth] = reactExports.useState(11);
  const [startYear, setStartYear] = reactExports.useState(2025);
  const [endMonth, setEndMonth] = reactExports.useState(4);
  const [endYear, setEndYear] = reactExports.useState(2026);
  const [applied, setApplied] = reactExports.useState({
    filterHotelId: "all",
    startMonth: 11,
    startYear: 2025,
    endMonth: 4,
    endYear: 2026
  });
  function applyFilters() {
    setApplied({ filterHotelId, startMonth, startYear, endMonth, endYear });
  }
  const merged = reactExports.useMemo(() => {
    const list = applied.filterHotelId === "all" ? analyticsData : analyticsData.filter(
      (a) => a.hotelId.toString() === applied.filterHotelId
    );
    if (list.length === 0) return null;
    function inRange(month, year) {
      const n = Number(year) * 100 + Number(month);
      const from = applied.startYear * 100 + applied.startMonth;
      const to = applied.endYear * 100 + applied.endMonth;
      return n >= from && n <= to;
    }
    const revMap = /* @__PURE__ */ new Map();
    const occMap = /* @__PURE__ */ new Map();
    const roomMap = /* @__PURE__ */ new Map();
    for (const a of list) {
      for (const m of a.revenueByMonth.filter(
        (r) => inRange(r.month, r.year)
      )) {
        const k = `${m.year}-${m.month}`;
        const ex = revMap.get(k);
        if (ex) ex.revenue += m.revenue;
        else revMap.set(k, { ...m });
      }
      for (const m of a.occupancyByMonth.filter(
        (o) => inRange(o.month, o.year)
      )) {
        const k = `${m.year}-${m.month}`;
        const ex = occMap.get(k);
        if (ex) {
          const occ = Number(ex.occupiedRooms) + Number(m.occupiedRooms);
          const tot = Number(ex.totalRooms) + Number(m.totalRooms);
          ex.occupiedRooms = BigInt(occ);
          ex.totalRooms = BigInt(tot);
          ex.occupancyPercent = tot > 0 ? occ / tot * 100 : 0;
        } else {
          occMap.set(k, { ...m });
        }
      }
      for (const rt of a.revenueByRoomType) {
        const key = rt.roomType;
        const ex = roomMap.get(key);
        if (ex) {
          ex.revenue += rt.revenue;
          ex.bookingCount += rt.bookingCount;
        } else {
          roomMap.set(key, {
            revenue: rt.revenue,
            bookingCount: rt.bookingCount
          });
        }
      }
    }
    const revenueByMonth = Array.from(revMap.values());
    const occupancyByMonth = Array.from(occMap.values());
    const revenueByRoomType = Array.from(
      roomMap.entries()
    ).map(([key, val]) => ({
      roomType: key,
      ...val
    }));
    const totalRevenue = revenueByMonth.reduce((s, m) => s + m.revenue, 0);
    const avgOccupancy = occupancyByMonth.length > 0 ? occupancyByMonth.reduce((s, m) => s + m.occupancyPercent, 0) / occupancyByMonth.length : 0;
    const totalOccNights = occupancyByMonth.reduce(
      (s, m) => s + Number(m.occupiedRooms) * 30,
      0
    );
    const totalAvailNights = occupancyByMonth.reduce(
      (s, m) => s + Number(m.totalRooms) * 30,
      0
    );
    return {
      hotelId: list[0].hotelId,
      totalRevenue,
      adr: totalOccNights > 0 ? totalRevenue / totalOccNights : 0,
      revpar: totalAvailNights > 0 ? totalRevenue / totalAvailNights : 0,
      overallOccupancyPercent: avgOccupancy,
      revenueByMonth,
      occupancyByMonth,
      revenueByRoomType
    };
  }, [analyticsData, applied]);
  const donutTotal = (merged == null ? void 0 : merged.revenueByRoomType.reduce((s, r) => s + r.revenue, 0)) ?? 0;
  const years = [2025, 2026];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 p-6", "data-ocid": "reports.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "Reports & Analytics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Track revenue, occupancy and performance metrics" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "gap-2",
          "data-ocid": "reports.export_button",
          onClick: () => ue.info("Export feature coming soon"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
            "Export Report"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", "data-ocid": "reports.filters.panel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 min-w-[180px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "reports-property",
            className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
            children: "Property"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            id: "reports-property",
            className: "bg-input border border-border text-foreground text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring",
            value: filterHotelId,
            onChange: (e) => setFilterHotelId(e.target.value),
            "data-ocid": "reports.property.select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Properties" }),
              hotels.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: h.id.toString(), children: h.name }, h.id.toString()))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "reports-start-month",
            className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
            children: "From Month"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MonthYearSelect,
          {
            monthId: "reports-start-month",
            yearId: "reports-start-year",
            month: startMonth,
            year: startYear,
            onMonthChange: setStartMonth,
            onYearChange: setStartYear,
            years
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "reports-end-month",
            className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
            children: "To Month"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MonthYearSelect,
          {
            monthId: "reports-end-month",
            yearId: "reports-end-year",
            month: endMonth,
            year: endYear,
            onMonthChange: setEndMonth,
            onYearChange: setEndYear,
            years
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-primary text-primary-foreground hover:bg-primary/90",
          onClick: applyFilters,
          "data-ocid": "reports.apply_filters.button",
          children: "Apply Filters"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
        "data-ocid": "reports.kpi.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Total Revenue",
              value: fmtLargeRupees((merged == null ? void 0 : merged.totalRevenue) ?? 0),
              change: "+6.2%",
              positive: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Occupancy %",
              value: `${((merged == null ? void 0 : merged.overallOccupancyPercent) ?? 0).toFixed(1)}%`,
              change: "+3.8%",
              positive: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "ADR",
              value: fmtLargeRupees(Math.round((merged == null ? void 0 : merged.adr) ?? 0)),
              change: "-1.4%",
              positive: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "RevPAR",
              value: fmtLargeRupees(Math.round((merged == null ? void 0 : merged.revpar) ?? 0)),
              change: "+4.2%",
              positive: true
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "bg-card border-border",
        "data-ocid": "reports.occupancy_chart.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold text-foreground", children: "Occupancy Trend" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-primary border-primary/40 text-xs",
                children: "Occupancy %"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: merged && merged.occupancyByMonth.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(OccupancyLineChart, { data: merged.occupancyByMonth }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-36 flex items-center justify-center text-muted-foreground text-sm",
              "data-ocid": "reports.occupancy_chart.empty_state",
              children: "No data for the selected range"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "bg-card border-border",
          "data-ocid": "reports.revenue_chart.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold text-foreground", children: "Revenue by Month" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: merged && merged.revenueByMonth.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueBarChart, { data: merged.revenueByMonth }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-36 flex items-center justify-center text-muted-foreground text-sm",
                "data-ocid": "reports.revenue_chart.empty_state",
                children: "No data for the selected range"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "bg-card border-border",
          "data-ocid": "reports.roomtype_chart.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold text-foreground", children: "Revenue by Room Type" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0 flex justify-center", children: merged && merged.revenueByRoomType.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(DonutChart, { data: merged.revenueByRoomType, total: donutTotal }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-36 flex items-center justify-center text-muted-foreground text-sm",
                "data-ocid": "reports.roomtype_chart.empty_state",
                children: "No data for the selected range"
              }
            ) })
          ]
        }
      )
    ] })
  ] });
}
export {
  ReportsPage as default
};
