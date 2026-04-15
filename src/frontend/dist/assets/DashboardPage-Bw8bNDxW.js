import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, r as reactExports, u as useHotelStore, R as RoomStatus, B as BookingStatus, S as SkeletonKPI, L as Link, b as LogOut, d as Sparkles, C as Calendar, e as Building2 } from "./index-CBcYPlz6.js";
import { T as TrendingUp } from "./trending-up-Cl6YUfoP.js";
import { T as TrendingDown } from "./trending-down-BnViMsFb.js";
import { S as StatusBadge } from "./StatusBadge-C7ZHomM8.js";
import { B as BedDouble } from "./bed-double-DFIXwpvs.js";
import { C as CreditCard } from "./credit-card-DIOLeYAl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m9 16 2 2 4-4", key: "19s6y9" }]
];
const CalendarCheck = createLucideIcon("calendar-check", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M11 20H2", key: "nlcfvz" }],
  [
    "path",
    {
      d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z",
      key: "au4z13"
    }
  ],
  ["path", { d: "M11 4H8a2 2 0 0 0-2 2v14", key: "74r1mk" }],
  ["path", { d: "M14 12h.01", key: "1jfl7z" }],
  ["path", { d: "M22 20h-3", key: "vhrsz" }]
];
const DoorOpen = createLucideIcon("door-open", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M10 22v-6.57", key: "1wmca3" }],
  ["path", { d: "M12 11h.01", key: "z322tv" }],
  ["path", { d: "M12 7h.01", key: "1ivr5q" }],
  ["path", { d: "M14 15.43V22", key: "1q2vjd" }],
  ["path", { d: "M15 16a5 5 0 0 0-6 0", key: "o9wqvi" }],
  ["path", { d: "M16 11h.01", key: "xkw8gn" }],
  ["path", { d: "M16 7h.01", key: "1kdx03" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 7h.01", key: "1vti4s" }],
  ["rect", { x: "4", y: "2", width: "16", height: "20", rx: "2", key: "1uxh74" }]
];
const Hotel = createLucideIcon("hotel", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5", key: "4mh3h7" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5", key: "1mdrzq" }]
];
const Percent = createLucideIcon("percent", __iconNode);
function KPICard({
  icon,
  label,
  value,
  change,
  changeLabel,
  className,
  iconClassName
}) {
  const isPositive = change !== void 0 && change >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("kpi-card", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "p-2 rounded-lg",
            iconClassName ?? "bg-primary/10 text-primary"
          ),
          children: icon
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground font-display tracking-tight", children: value }),
      change !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1.5", children: [
        isPositive ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3.5 h-3.5 text-red-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: cn(
              "text-xs font-medium",
              isPositive ? "text-emerald-400" : "text-red-400"
            ),
            children: [
              isPositive ? "+" : "",
              change,
              "%"
            ]
          }
        ),
        changeLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: changeLabel })
      ] })
    ] })
  ] });
}
function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
function relativeTime(date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
function isSameDay(tsMs, refMs) {
  const a = new Date(Number(tsMs));
  const b = new Date(refMs);
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
const activityConfig = {
  booking: {
    Icon: Calendar,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10"
  },
  checkin: { Icon: LogIn, color: "text-blue-400", bg: "bg-blue-500/10" },
  checkout: { Icon: LogOut, color: "text-violet-400", bg: "bg-violet-500/10" },
  housekeeping: {
    Icon: Sparkles,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10"
  },
  payment: { Icon: CreditCard, color: "text-amber-400", bg: "bg-amber-500/10" },
  guest: { Icon: Hotel, color: "text-sky-400", bg: "bg-sky-500/10" }
};
const ACTIVITY_POOL = [
  {
    type: "checkin",
    message: "Arjun Mehta checked in",
    detail: "Room 209 · Deluxe"
  },
  {
    type: "booking",
    message: "New booking: Priya Sharma",
    detail: "Suite 301 · 3 nights"
  },
  {
    type: "payment",
    message: "Invoice settled: ₹32,400",
    detail: "Booking #1042 · Card"
  },
  {
    type: "housekeeping",
    message: "Room 115 cleaned & ready",
    detail: "Suresh Babu"
  },
  {
    type: "checkout",
    message: "Sarah Johnson checked out",
    detail: "Room 319 · Settled"
  },
  {
    type: "booking",
    message: "Walk-in: Rajesh Kumar",
    detail: "Room 106 · Standard"
  }
];
function ActivityItem({ item }) {
  const cfg = activityConfig[item.type];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-1.5 rounded-lg flex-shrink-0 ${cfg.bg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(cfg.Icon, { className: `w-3.5 h-3.5 ${cfg.color}` }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.message }),
      item.detail && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: item.detail })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap flex-shrink-0", children: relativeTime(item.timestamp) })
  ] });
}
function RevenueSparkbar({ months }) {
  const max = Math.max(...months);
  const labels = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1.5 h-16", children: months.map((val, i) => {
    const pct = max > 0 ? val / max * 100 : 0;
    const isLast = i === months.length - 1;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-1 flex flex-col items-center gap-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full relative flex items-end",
              style: { height: "48px" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-full rounded-t transition-all duration-500 ${isLast ? "bg-primary" : "bg-muted-foreground/30"}`,
                  style: { height: `${pct}%` }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: labels[i] })
        ]
      },
      labels[i]
    );
  }) });
}
function HotelSummaryCard({
  hotel,
  allRooms,
  allBookings,
  isSelected,
  onSelect
}) {
  const hotelRooms = allRooms.filter((r) => r.hotelId === hotel.id);
  const occupied = hotelRooms.filter(
    (r) => r.status === RoomStatus.Occupied
  ).length;
  const clean = hotelRooms.filter((r) => r.status === RoomStatus.Clean).length;
  const occupancyPct = hotelRooms.length > 0 ? Math.round(occupied / hotelRooms.length * 100) : 0;
  const todayMs = Date.now();
  const todayRevenue = allBookings.filter(
    (b) => b.hotelId === hotel.id && b.status === BookingStatus.CheckedIn && isSameDay(b.checkIn, todayMs)
  ).reduce((sum, b) => {
    const room = allRooms.find((r) => r.id === b.roomId);
    return sum + ((room == null ? void 0 : room.pricePerNight) ?? 0);
  }, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": "dashboard.hotel.card",
      onClick: onSelect,
      className: `w-full text-left rounded-xl border p-4 transition-smooth card-hover ${isSelected ? "border-primary/60 bg-primary/5" : "border-border bg-card hover:border-primary/30"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `p-2 rounded-lg ${isSelected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-tight truncate max-w-[160px]", children: hotel.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: hotel.city })
            ] })
          ] }),
          isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full", children: "Active" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-primary", children: [
              occupancyPct,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Occupancy" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground", children: clean }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Available" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground", children: todayRevenue > 0 ? `₹${Math.round(todayRevenue / 1e3)}k` : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Revenue" })
          ] })
        ] })
      ]
    }
  );
}
function DashboardPage() {
  var _a;
  const [loading, setLoading] = reactExports.useState(true);
  const [feed, setFeed] = reactExports.useState([]);
  const hotels = useHotelStore((s) => s.hotels);
  const allRooms = useHotelStore((s) => s.rooms);
  const allBookings = useHotelStore((s) => s.bookings);
  const allTasks = useHotelStore((s) => s.housekeepingTasks);
  const allAnalyticsData = useHotelStore((s) => s.analyticsData);
  const activityFeed = useHotelStore((s) => s.activityFeed);
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const setSelectedHotel = useHotelStore((s) => s.setSelectedHotel);
  const currentHotel = reactExports.useMemo(
    () => hotels.find((h) => h.id === selectedHotelId),
    [hotels, selectedHotelId]
  );
  const currentRooms = reactExports.useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId]
  );
  const currentBookings = reactExports.useMemo(
    () => allBookings.filter((b) => b.hotelId === selectedHotelId),
    [allBookings, selectedHotelId]
  );
  const currentAnalytics = reactExports.useMemo(
    () => allAnalyticsData.find((a) => a.hotelId === selectedHotelId),
    [allAnalyticsData, selectedHotelId]
  );
  const currentTasks = reactExports.useMemo(
    () => allTasks.filter((t) => t.hotelId === selectedHotelId),
    [allTasks, selectedHotelId]
  );
  reactExports.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);
  reactExports.useEffect(() => {
    setFeed(
      [...activityFeed].filter((a) => a.hotelId === String(selectedHotelId)).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 15)
    );
  }, [activityFeed, selectedHotelId]);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      const template = ACTIVITY_POOL[Math.floor(Math.random() * ACTIVITY_POOL.length)];
      const newItem = {
        id: `auto-${Date.now()}`,
        hotelId: String(selectedHotelId),
        timestamp: /* @__PURE__ */ new Date(),
        ...template
      };
      setFeed((prev) => [newItem, ...prev].slice(0, 15));
    }, 3e4);
    return () => clearInterval(interval);
  }, [selectedHotelId]);
  const todayMs = Date.now();
  const totalRooms = currentRooms.length;
  const occupiedRooms = currentRooms.filter(
    (r) => r.status === RoomStatus.Occupied
  ).length;
  const occupancyRate = totalRooms > 0 ? Math.round(occupiedRooms / totalRooms * 100) : 0;
  const revenueToday = currentBookings.filter(
    (b) => b.status === BookingStatus.CheckedIn && isSameDay(b.checkIn, todayMs)
  ).reduce((sum, b) => {
    const room = currentRooms.find((r) => r.id === b.roomId);
    return sum + ((room == null ? void 0 : room.pricePerNight) ?? 0);
  }, 0);
  const checkInsToday = currentBookings.filter(
    (b) => b.status === BookingStatus.CheckedIn && isSameDay(b.checkIn, todayMs)
  ).length;
  const checkOutsToday = currentBookings.filter(
    (b) => b.status === BookingStatus.CheckedOut && isSameDay(b.checkOut, todayMs)
  ).length;
  const availableRooms = currentRooms.filter(
    (r) => r.status === RoomStatus.Clean
  ).length;
  const recentBookings = [...currentBookings].sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).slice(0, 5);
  const revenueMonths = ((_a = currentAnalytics == null ? void 0 : currentAnalytics.revenueByMonth) == null ? void 0 : _a.slice(-6).map((m) => Number(m.revenue))) ?? [
    32e4,
    41e4,
    375e3,
    49e4,
    455e3,
    52e4
  ];
  const roomStats = {
    occupied: currentRooms.filter((r) => r.status === RoomStatus.Occupied).length,
    clean: currentRooms.filter((r) => r.status === RoomStatus.Clean).length,
    dirty: currentRooms.filter((r) => r.status === RoomStatus.Dirty).length,
    maintenance: currentRooms.filter(
      (r) => r.status === RoomStatus.Maintenance || r.status === RoomStatus.OutOfOrder
    ).length
  };
  const taskPending = currentTasks.filter((t) => t.status === "Pending").length;
  const taskInProgress = currentTasks.filter(
    (t) => t.status === "InProgress"
  ).length;
  const taskDone = currentTasks.filter((t) => t.status === "Done").length;
  const taskTotal = taskPending + taskInProgress + taskDone;
  function fmtDate(ts) {
    return new Date(Number(ts)).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short"
    });
  }
  function getRoomNumber(roomId) {
    var _a2;
    return ((_a2 = allRooms.find((r) => r.id === roomId)) == null ? void 0 : _a2.number) ?? "—";
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-32 bg-muted rounded animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-56 bg-muted rounded animate-pulse mt-2" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonKPI, { count: 5 })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 page-enter", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          (currentHotel == null ? void 0 : currentHotel.name) ?? "All Properties",
          " ·",
          " ",
          (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/reservations",
          "data-ocid": "dashboard.new_booking_header_button",
          className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-smooth hover:opacity-90 hover:-translate-y-0.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
            "New Booking"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-2 xl:grid-cols-5 gap-4",
        "data-ocid": "dashboard.kpi.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Occupancy Rate",
              value: `${occupancyRate}%`,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "w-4 h-4" }),
              change: occupancyRate > 60 ? 3.2 : -2.1,
              changeLabel: "vs yesterday",
              iconClassName: "bg-amber-500/10 text-amber-400"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Revenue Today",
              value: formatINR(revenueToday),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
              change: revenueToday > 0 ? 5.4 : 0,
              changeLabel: "vs yesterday",
              iconClassName: "bg-emerald-500/10 text-emerald-400"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Check-ins Today",
              value: checkInsToday,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
              iconClassName: "bg-blue-500/10 text-blue-400"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Check-outs Today",
              value: checkOutsToday,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
              iconClassName: "bg-violet-500/10 text-violet-400"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Available Rooms",
              value: availableRooms,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "w-4 h-4" }),
              iconClassName: "bg-sky-500/10 text-sky-400"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "xl:col-span-2 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-5",
              "data-ocid": "dashboard.revenue.chart",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Revenue Trend" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Last 6 months" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium", children: "+14.3%" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueSparkbar, { months: revenueMonths })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-5",
              "data-ocid": "dashboard.quick_actions.section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-4", children: "Quick Actions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/reservations",
                      "data-ocid": "dashboard.new_booking_button",
                      className: "flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary text-sm font-medium transition-smooth",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4 flex-shrink-0" }),
                        "New Booking"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/front-desk",
                      "data-ocid": "dashboard.checkin_button",
                      className: "flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20 text-blue-400 text-sm font-medium transition-smooth",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(DoorOpen, { className: "w-4 h-4 flex-shrink-0" }),
                        "Check In Guest"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/housekeeping",
                      "data-ocid": "dashboard.housekeeping_button",
                      className: "flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/15 border border-yellow-500/20 text-yellow-400 text-sm font-medium transition-smooth",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 flex-shrink-0" }),
                        "Housekeeping"
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            "data-ocid": "dashboard.recent_bookings.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Recent Bookings" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/reservations",
                    "data-ocid": "dashboard.view_all_bookings_link",
                    className: "text-xs text-primary hover:text-primary/80 font-medium transition-colors",
                    children: "View all →"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: ["Guest", "Room", "Check-in", "Check-out", "Status"].map(
                  (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide",
                      children: h
                    },
                    h
                  )
                ) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    colSpan: 5,
                    className: "px-5 py-8 text-center text-sm text-muted-foreground",
                    "data-ocid": "dashboard.recent_bookings.empty_state",
                    children: "No bookings yet for this property."
                  }
                ) }) : recentBookings.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    "data-ocid": `dashboard.booking.item.${idx + 1}`,
                    className: "border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary", children: booking.guestName.charAt(0) }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-[120px]", children: booking.guestName }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                            "#",
                            String(booking.id).padStart(4, "0")
                          ] })
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground", children: getRoomNumber(booking.roomId) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-xs text-muted-foreground", children: fmtDate(booking.checkIn) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-xs text-muted-foreground", children: fmtDate(booking.checkOut) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.status }) })
                    ]
                  },
                  String(booking.id)
                )) })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5",
            "data-ocid": "dashboard.room_status.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-4", children: "Room Status Overview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-0.5 rounded-full overflow-hidden h-2.5 mb-4", children: [
                roomStats.occupied > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "bg-blue-500 transition-all",
                    style: {
                      width: `${roomStats.occupied / totalRooms * 100}%`
                    }
                  }
                ),
                roomStats.clean > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "bg-emerald-500 transition-all",
                    style: { width: `${roomStats.clean / totalRooms * 100}%` }
                  }
                ),
                roomStats.dirty > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "bg-red-500 transition-all",
                    style: { width: `${roomStats.dirty / totalRooms * 100}%` }
                  }
                ),
                roomStats.maintenance > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "bg-orange-500 transition-all",
                    style: {
                      width: `${roomStats.maintenance / totalRooms * 100}%`
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
                {
                  label: "Occupied",
                  count: roomStats.occupied,
                  dot: "bg-blue-500"
                },
                {
                  label: "Available",
                  count: roomStats.clean,
                  dot: "bg-emerald-500"
                },
                { label: "Dirty", count: roomStats.dirty, dot: "bg-red-500" },
                {
                  label: "Maintenance",
                  count: roomStats.maintenance,
                  dot: "bg-orange-500"
                }
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: s.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground ml-auto", children: s.count })
              ] }, s.label)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            "data-ocid": "dashboard.activity_feed.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-5 py-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Live Activity" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 max-h-[420px] overflow-y-auto", children: feed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-muted-foreground py-6 text-center",
                  "data-ocid": "dashboard.activity_feed.empty_state",
                  children: "No recent activity."
                }
              ) : feed.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityItem, { item }, item.id)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5",
            "data-ocid": "dashboard.housekeeping_summary.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Housekeeping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/housekeeping",
                    "data-ocid": "dashboard.housekeeping_view_link",
                    className: "text-xs text-primary hover:text-primary/80 font-medium transition-colors",
                    children: "View tasks →"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: [
                {
                  label: "Pending",
                  count: taskPending,
                  bar: "bg-amber-500",
                  text: "text-amber-400"
                },
                {
                  label: "In Progress",
                  count: taskInProgress,
                  bar: "bg-sky-500",
                  text: "text-sky-400"
                },
                {
                  label: "Completed",
                  count: taskDone,
                  bar: "bg-emerald-500",
                  text: "text-emerald-400"
                }
              ].map((s) => {
                const pct = taskTotal > 0 ? s.count / taskTotal * 100 : 0;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: s.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-semibold ${s.text}`, children: s.count })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `h-full rounded-full ${s.bar} transition-all duration-500`,
                      style: { width: `${pct}%` }
                    }
                  ) })
                ] }, s.label);
              }) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.properties.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "All Properties" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/management",
            "data-ocid": "dashboard.manage_properties_link",
            className: "text-xs text-primary hover:text-primary/80 font-medium transition-colors",
            children: "Manage →"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: hotels.map((hotel) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        HotelSummaryCard,
        {
          hotel,
          allRooms,
          allBookings,
          isSelected: hotel.id === selectedHotelId,
          onSelect: () => setSelectedHotel(hotel.id)
        },
        String(hotel.id)
      )) })
    ] })
  ] });
}
export {
  DashboardPage as default
};
