import { BookingStatus, RoomStatus } from "@/backend";
import { KPICard } from "@/components/ui/KPICard";
import { SkeletonKPI } from "@/components/ui/LoadingSkeleton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useHotelStore } from "@/store/useHotelStore";
import type { ActivityFeedItem, Booking, Hotel, Room } from "@/types/index";
import { Link } from "@tanstack/react-router";
import {
  BedDouble,
  Building2,
  Calendar,
  CalendarCheck,
  CreditCard,
  DoorOpen,
  Hotel as HotelIcon,
  LogIn,
  LogOut,
  Percent,
  PlusCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// ─── helpers ─────────────────────────────────────────────────────────────────

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function isSameDay(tsMs: bigint, refMs: number): boolean {
  const a = new Date(Number(tsMs));
  const b = new Date(refMs);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const activityConfig: Record<
  ActivityFeedItem["type"],
  {
    Icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
  }
> = {
  booking: {
    Icon: Calendar,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  checkin: { Icon: LogIn, color: "text-blue-400", bg: "bg-blue-500/10" },
  checkout: { Icon: LogOut, color: "text-violet-400", bg: "bg-violet-500/10" },
  housekeeping: {
    Icon: Sparkles,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  payment: { Icon: CreditCard, color: "text-amber-400", bg: "bg-amber-500/10" },
  guest: { Icon: HotelIcon, color: "text-sky-400", bg: "bg-sky-500/10" },
};

const ACTIVITY_POOL: Array<
  Omit<ActivityFeedItem, "id" | "timestamp" | "hotelId">
> = [
  {
    type: "checkin",
    message: "Arjun Mehta checked in",
    detail: "Room 209 · Deluxe",
  },
  {
    type: "booking",
    message: "New booking: Priya Sharma",
    detail: "Suite 301 · 3 nights",
  },
  {
    type: "payment",
    message: "Invoice settled: ₹32,400",
    detail: "Booking #1042 · Card",
  },
  {
    type: "housekeeping",
    message: "Room 115 cleaned & ready",
    detail: "Suresh Babu",
  },
  {
    type: "checkout",
    message: "Sarah Johnson checked out",
    detail: "Room 319 · Settled",
  },
  {
    type: "booking",
    message: "Walk-in: Rajesh Kumar",
    detail: "Room 106 · Standard",
  },
];

// ─── sub-components ───────────────────────────────────────────────────────────

function ActivityItem({ item }: { item: ActivityFeedItem }) {
  const cfg = activityConfig[item.type];
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0">
      <div className={`p-1.5 rounded-lg flex-shrink-0 ${cfg.bg}`}>
        <cfg.Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {item.message}
        </p>
        {item.detail && (
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {item.detail}
          </p>
        )}
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
        {relativeTime(item.timestamp)}
      </span>
    </div>
  );
}

function RevenueSparkbar({ months }: { months: number[] }) {
  const max = Math.max(...months);
  const labels = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  return (
    <div className="flex items-end gap-1.5 h-16">
      {months.map((val, i) => {
        const pct = max > 0 ? (val / max) * 100 : 0;
        const isLast = i === months.length - 1;
        return (
          <div
            key={labels[i]}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <div
              className="w-full relative flex items-end"
              style={{ height: "48px" }}
            >
              <div
                className={`w-full rounded-t transition-all duration-500 ${
                  isLast ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                style={{ height: `${pct}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">
              {labels[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

interface HotelSummaryCardProps {
  hotel: Hotel;
  allRooms: Room[];
  allBookings: Booking[];
  isSelected: boolean;
  onSelect: () => void;
}

function HotelSummaryCard({
  hotel,
  allRooms,
  allBookings,
  isSelected,
  onSelect,
}: HotelSummaryCardProps) {
  const hotelRooms = allRooms.filter((r) => r.hotelId === hotel.id);
  const occupied = hotelRooms.filter(
    (r) => r.status === RoomStatus.Occupied,
  ).length;
  const clean = hotelRooms.filter((r) => r.status === RoomStatus.Clean).length;
  const occupancyPct =
    hotelRooms.length > 0
      ? Math.round((occupied / hotelRooms.length) * 100)
      : 0;

  const todayMs = Date.now();
  const todayRevenue = allBookings
    .filter(
      (b) =>
        b.hotelId === hotel.id &&
        b.status === BookingStatus.CheckedIn &&
        isSameDay(b.checkIn, todayMs),
    )
    .reduce((sum, b) => {
      const room = allRooms.find((r) => r.id === b.roomId);
      return sum + (room?.pricePerNight ?? 0);
    }, 0);

  return (
    <button
      type="button"
      data-ocid="dashboard.hotel.card"
      onClick={onSelect}
      className={`w-full text-left rounded-xl border p-4 transition-smooth card-hover ${
        isSelected
          ? "border-primary/60 bg-primary/5"
          : "border-border bg-card hover:border-primary/30"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-lg ${
              isSelected
                ? "bg-primary/15 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight truncate max-w-[160px]">
              {hotel.name}
            </p>
            <p className="text-xs text-muted-foreground">{hotel.city}</p>
          </div>
        </div>
        {isSelected && (
          <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
            Active
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-lg font-bold text-primary">{occupancyPct}%</p>
          <p className="text-[10px] text-muted-foreground">Occupancy</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{clean}</p>
          <p className="text-[10px] text-muted-foreground">Available</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">
            {todayRevenue > 0 ? `₹${Math.round(todayRevenue / 1000)}k` : "—"}
          </p>
          <p className="text-[10px] text-muted-foreground">Revenue</p>
        </div>
      </div>
    </button>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState<ActivityFeedItem[]>([]);

  const hotels = useHotelStore((s) => s.hotels);
  const allRooms = useHotelStore((s) => s.rooms);
  const allBookings = useHotelStore((s) => s.bookings);
  const allTasks = useHotelStore((s) => s.housekeepingTasks);
  const allAnalyticsData = useHotelStore((s) => s.analyticsData);
  const activityFeed = useHotelStore((s) => s.activityFeed);
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const setSelectedHotel = useHotelStore((s) => s.setSelectedHotel);

  const currentHotel = useMemo(
    () => hotels.find((h) => h.id === selectedHotelId),
    [hotels, selectedHotelId],
  );
  const currentRooms = useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId],
  );
  const currentBookings = useMemo(
    () => allBookings.filter((b) => b.hotelId === selectedHotelId),
    [allBookings, selectedHotelId],
  );
  const currentAnalytics = useMemo(
    () => allAnalyticsData.find((a) => a.hotelId === selectedHotelId),
    [allAnalyticsData, selectedHotelId],
  );
  const currentTasks = useMemo(
    () => allTasks.filter((t) => t.hotelId === selectedHotelId),
    [allTasks, selectedHotelId],
  );

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setFeed(
      [...activityFeed]
        .filter((a) => a.hotelId === String(selectedHotelId))
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 15),
    );
  }, [activityFeed, selectedHotelId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const template =
        ACTIVITY_POOL[Math.floor(Math.random() * ACTIVITY_POOL.length)];
      const newItem: ActivityFeedItem = {
        id: `auto-${Date.now()}`,
        hotelId: String(selectedHotelId),
        timestamp: new Date(),
        ...template,
      };
      setFeed((prev) => [newItem, ...prev].slice(0, 15));
    }, 30000);
    return () => clearInterval(interval);
  }, [selectedHotelId]);

  // ── KPI calculations ──────────────────────────────────────────────────────
  const todayMs = Date.now();
  const totalRooms = currentRooms.length;
  const occupiedRooms = currentRooms.filter(
    (r) => r.status === RoomStatus.Occupied,
  ).length;
  const occupancyRate =
    totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const revenueToday = currentBookings
    .filter(
      (b) =>
        b.status === BookingStatus.CheckedIn && isSameDay(b.checkIn, todayMs),
    )
    .reduce((sum, b) => {
      const room = currentRooms.find((r) => r.id === b.roomId);
      return sum + (room?.pricePerNight ?? 0);
    }, 0);

  const checkInsToday = currentBookings.filter(
    (b) =>
      b.status === BookingStatus.CheckedIn && isSameDay(b.checkIn, todayMs),
  ).length;

  const checkOutsToday = currentBookings.filter(
    (b) =>
      b.status === BookingStatus.CheckedOut && isSameDay(b.checkOut, todayMs),
  ).length;

  const availableRooms = currentRooms.filter(
    (r) => r.status === RoomStatus.Clean,
  ).length;

  // ── Recent bookings ───────────────────────────────────────────────────────
  const recentBookings = [...currentBookings]
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    .slice(0, 5);

  // ── Revenue sparkbar ──────────────────────────────────────────────────────
  const revenueMonths = currentAnalytics?.revenueByMonth
    ?.slice(-6)
    .map((m) => Number(m.revenue)) ?? [
    320000, 410000, 375000, 490000, 455000, 520000,
  ];

  // ── Room status breakdown ─────────────────────────────────────────────────
  const roomStats = {
    occupied: currentRooms.filter((r) => r.status === RoomStatus.Occupied)
      .length,
    clean: currentRooms.filter((r) => r.status === RoomStatus.Clean).length,
    dirty: currentRooms.filter((r) => r.status === RoomStatus.Dirty).length,
    maintenance: currentRooms.filter(
      (r) =>
        r.status === RoomStatus.Maintenance ||
        r.status === RoomStatus.OutOfOrder,
    ).length,
  };

  // ── Task breakdown ────────────────────────────────────────────────────────
  const taskPending = currentTasks.filter((t) => t.status === "Pending").length;
  const taskInProgress = currentTasks.filter(
    (t) => t.status === "InProgress",
  ).length;
  const taskDone = currentTasks.filter((t) => t.status === "Done").length;
  const taskTotal = taskPending + taskInProgress + taskDone;

  function fmtDate(ts: bigint) {
    return new Date(Number(ts)).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  }

  function getRoomNumber(roomId: bigint) {
    return allRooms.find((r) => r.id === roomId)?.number ?? "—";
  }

  if (loading) {
    return (
      <div className="space-y-6 p-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-7 w-32 bg-muted rounded animate-pulse" />
            <div className="h-4 w-56 bg-muted rounded animate-pulse mt-2" />
          </div>
        </div>
        <SkeletonKPI count={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6 page-enter" data-ocid="dashboard.page">
      {/* ── Page header ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {currentHotel?.name ?? "All Properties"} ·{" "}
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <Link
          to="/reservations"
          data-ocid="dashboard.new_booking_header_button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-smooth hover:opacity-90 hover:-translate-y-0.5"
        >
          <PlusCircle className="w-4 h-4" />
          New Booking
        </Link>
      </div>

      {/* ── KPI cards ────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 xl:grid-cols-5 gap-4"
        data-ocid="dashboard.kpi.section"
      >
        <KPICard
          label="Occupancy Rate"
          value={`${occupancyRate}%`}
          icon={<Percent className="w-4 h-4" />}
          change={occupancyRate > 60 ? 3.2 : -2.1}
          changeLabel="vs yesterday"
          iconClassName="bg-amber-500/10 text-amber-400"
        />
        <KPICard
          label="Revenue Today"
          value={formatINR(revenueToday)}
          icon={<TrendingUp className="w-4 h-4" />}
          change={revenueToday > 0 ? 5.4 : 0}
          changeLabel="vs yesterday"
          iconClassName="bg-emerald-500/10 text-emerald-400"
        />
        <KPICard
          label="Check-ins Today"
          value={checkInsToday}
          icon={<LogIn className="w-4 h-4" />}
          iconClassName="bg-blue-500/10 text-blue-400"
        />
        <KPICard
          label="Check-outs Today"
          value={checkOutsToday}
          icon={<LogOut className="w-4 h-4" />}
          iconClassName="bg-violet-500/10 text-violet-400"
        />
        <KPICard
          label="Available Rooms"
          value={availableRooms}
          icon={<BedDouble className="w-4 h-4" />}
          iconClassName="bg-sky-500/10 text-sky-400"
        />
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: revenue chart + recent bookings + room status */}
        <div className="xl:col-span-2 space-y-5">
          {/* Revenue sparkbar + quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="bg-card border border-border rounded-xl p-5"
              data-ocid="dashboard.revenue.chart"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Revenue Trend
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Last 6 months
                  </p>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">
                  +14.3%
                </span>
              </div>
              <RevenueSparkbar months={revenueMonths} />
            </div>

            <div
              className="bg-card border border-border rounded-xl p-5"
              data-ocid="dashboard.quick_actions.section"
            >
              <p className="text-sm font-semibold text-foreground mb-4">
                Quick Actions
              </p>
              <div className="space-y-2.5">
                <Link
                  to="/reservations"
                  data-ocid="dashboard.new_booking_button"
                  className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary text-sm font-medium transition-smooth"
                >
                  <CalendarCheck className="w-4 h-4 flex-shrink-0" />
                  New Booking
                </Link>
                <Link
                  to="/front-desk"
                  data-ocid="dashboard.checkin_button"
                  className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20 text-blue-400 text-sm font-medium transition-smooth"
                >
                  <DoorOpen className="w-4 h-4 flex-shrink-0" />
                  Check In Guest
                </Link>
                <Link
                  to="/housekeeping"
                  data-ocid="dashboard.housekeeping_button"
                  className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/15 border border-yellow-500/20 text-yellow-400 text-sm font-medium transition-smooth"
                >
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  Housekeeping
                </Link>
              </div>
            </div>
          </div>

          {/* Recent bookings table */}
          <div
            className="bg-card border border-border rounded-xl overflow-hidden"
            data-ocid="dashboard.recent_bookings.section"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <p className="text-sm font-semibold text-foreground">
                Recent Bookings
              </p>
              <Link
                to="/reservations"
                data-ocid="dashboard.view_all_bookings_link"
                className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {["Guest", "Room", "Check-in", "Check-out", "Status"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-8 text-center text-sm text-muted-foreground"
                        data-ocid="dashboard.recent_bookings.empty_state"
                      >
                        No bookings yet for this property.
                      </td>
                    </tr>
                  ) : (
                    recentBookings.map((booking, idx) => (
                      <tr
                        key={String(booking.id)}
                        data-ocid={`dashboard.booking.item.${idx + 1}`}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-semibold text-primary">
                                {booking.guestName.charAt(0)}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-foreground truncate max-w-[120px]">
                                {booking.guestName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                #{String(booking.id).padStart(4, "0")}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                            {getRoomNumber(booking.roomId)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-muted-foreground">
                          {fmtDate(booking.checkIn)}
                        </td>
                        <td className="px-5 py-3.5 text-xs text-muted-foreground">
                          {fmtDate(booking.checkOut)}
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={booking.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Room status overview */}
          <div
            className="bg-card border border-border rounded-xl p-5"
            data-ocid="dashboard.room_status.section"
          >
            <p className="text-sm font-semibold text-foreground mb-4">
              Room Status Overview
            </p>
            <div className="flex gap-0.5 rounded-full overflow-hidden h-2.5 mb-4">
              {roomStats.occupied > 0 && (
                <div
                  className="bg-blue-500 transition-all"
                  style={{
                    width: `${(roomStats.occupied / totalRooms) * 100}%`,
                  }}
                />
              )}
              {roomStats.clean > 0 && (
                <div
                  className="bg-emerald-500 transition-all"
                  style={{ width: `${(roomStats.clean / totalRooms) * 100}%` }}
                />
              )}
              {roomStats.dirty > 0 && (
                <div
                  className="bg-red-500 transition-all"
                  style={{ width: `${(roomStats.dirty / totalRooms) * 100}%` }}
                />
              )}
              {roomStats.maintenance > 0 && (
                <div
                  className="bg-orange-500 transition-all"
                  style={{
                    width: `${(roomStats.maintenance / totalRooms) * 100}%`,
                  }}
                />
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Occupied",
                  count: roomStats.occupied,
                  dot: "bg-blue-500",
                },
                {
                  label: "Available",
                  count: roomStats.clean,
                  dot: "bg-emerald-500",
                },
                { label: "Dirty", count: roomStats.dirty, dot: "bg-red-500" },
                {
                  label: "Maintenance",
                  count: roomStats.maintenance,
                  dot: "bg-orange-500",
                },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {s.label}
                  </span>
                  <span className="text-xs font-bold text-foreground ml-auto">
                    {s.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: activity feed + housekeeping summary */}
        <div className="space-y-5">
          <div
            className="bg-card border border-border rounded-xl overflow-hidden"
            data-ocid="dashboard.activity_feed.section"
          >
            <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-sm font-semibold text-foreground">
                Live Activity
              </p>
            </div>
            <div className="px-4 py-2 max-h-[420px] overflow-y-auto">
              {feed.length === 0 ? (
                <p
                  className="text-sm text-muted-foreground py-6 text-center"
                  data-ocid="dashboard.activity_feed.empty_state"
                >
                  No recent activity.
                </p>
              ) : (
                feed.map((item) => <ActivityItem key={item.id} item={item} />)
              )}
            </div>
          </div>

          <div
            className="bg-card border border-border rounded-xl p-5"
            data-ocid="dashboard.housekeeping_summary.section"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-foreground">
                Housekeeping
              </p>
              <Link
                to="/housekeeping"
                data-ocid="dashboard.housekeeping_view_link"
                className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
              >
                View tasks →
              </Link>
            </div>
            <div className="space-y-2.5">
              {[
                {
                  label: "Pending",
                  count: taskPending,
                  bar: "bg-amber-500",
                  text: "text-amber-400",
                },
                {
                  label: "In Progress",
                  count: taskInProgress,
                  bar: "bg-sky-500",
                  text: "text-sky-400",
                },
                {
                  label: "Completed",
                  count: taskDone,
                  bar: "bg-emerald-500",
                  text: "text-emerald-400",
                },
              ].map((s) => {
                const pct = taskTotal > 0 ? (s.count / taskTotal) * 100 : 0;
                return (
                  <div key={s.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-muted-foreground">
                        {s.label}
                      </span>
                      <span className={`text-xs font-semibold ${s.text}`}>
                        {s.count}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${s.bar} transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── All properties ───────────────────────────────────────── */}
      <div data-ocid="dashboard.properties.section">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-foreground">
            All Properties
          </p>
          <Link
            to="/management"
            data-ocid="dashboard.manage_properties_link"
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Manage →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <HotelSummaryCard
              key={String(hotel.id)}
              hotel={hotel}
              allRooms={allRooms}
              allBookings={allBookings}
              isSelected={hotel.id === selectedHotelId}
              onSelect={() => setSelectedHotel(hotel.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
