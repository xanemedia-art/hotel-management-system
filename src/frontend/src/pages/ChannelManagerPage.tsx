import { OTAChannel, RoomType, SyncStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useHotelStore } from "@/store/useHotelStore";
import type { ChannelConfig } from "@/types/index";
import {
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Shield,
  TrendingUp,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Constants ───────────────────────────────────────────────────────────────

const CHANNEL_META: Record<
  OTAChannel,
  { label: string; emoji: string; color: string }
> = {
  [OTAChannel.BookingCom]: {
    label: "Booking.com",
    emoji: "🏨",
    color: "text-blue-400",
  },
  [OTAChannel.Airbnb]: {
    label: "Airbnb",
    emoji: "🏡",
    color: "text-rose-400",
  },
  [OTAChannel.MakeMyTrip]: {
    label: "MakeMyTrip",
    emoji: "✈️",
    color: "text-red-400",
  },
  [OTAChannel.Expedia]: {
    label: "Expedia",
    emoji: "🌐",
    color: "text-cyan-400",
  },
  [OTAChannel.Direct]: {
    label: "Direct",
    emoji: "🔗",
    color: "text-amber-400",
  },
};

const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  [RoomType.Standard]: "Standard",
  [RoomType.Deluxe]: "Deluxe",
  [RoomType.Suite]: "Suite",
  [RoomType.Presidential]: "Presidential",
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: boolean;
  index: number;
}

function StatCard({ label, value, icon, accent, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className={cn(
        "kpi-card flex items-start justify-between gap-3",
        accent && "border-amber-500/30",
      )}
    >
      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
      <div
        className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
          accent
            ? "bg-amber-500/15 text-amber-400"
            : "bg-muted text-muted-foreground",
        )}
      >
        {icon}
      </div>
    </motion.div>
  );
}

// ─── Sync Status Badge ────────────────────────────────────────────────────────

function SyncBadge({ status }: { status: SyncStatus }) {
  return status === SyncStatus.Synced ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
      <CheckCircle2 className="w-3 h-3" />
      Synced
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/25">
      <AlertTriangle className="w-3 h-3" />
      Out of Sync
    </span>
  );
}

// ─── Channel Row ──────────────────────────────────────────────────────────────

interface ChannelRowProps {
  config: ChannelConfig;
  index: number;
  onToggleActive: (config: ChannelConfig) => void;
  onSyncNow: (config: ChannelConfig) => void;
  onApplyRate: (config: ChannelConfig, override: number | undefined) => void;
}

function ChannelRow({
  config,
  index,
  onToggleActive,
  onSyncNow,
  onApplyRate,
}: ChannelRowProps) {
  const meta = CHANNEL_META[config.channel];
  const [rateInput, setRateInput] = useState(
    config.rateOverride?.toString() ?? "",
  );
  const [syncing, setSyncing] = useState(false);

  function handleSyncNow() {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      onSyncNow(config);
    }, 500);
  }

  function handleApplyRate() {
    const trimmed = rateInput.trim();
    const parsed = trimmed === "" ? undefined : Number(trimmed);
    if (
      trimmed !== "" &&
      (Number.isNaN(parsed) || (parsed !== undefined && parsed <= 0))
    ) {
      toast.error("Please enter a valid rate.");
      return;
    }
    onApplyRate(config, parsed);
  }

  const lastSyncLabel = config.lastSync
    ? new Date(Number(config.lastSync)).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never";

  return (
    <motion.tr
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      data-ocid={`channel.item.${index + 1}`}
      className="border-b border-border/50 hover:bg-muted/20 transition-colors"
    >
      {/* Channel */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none">{meta.emoji}</span>
          <span className={cn("font-semibold text-sm", meta.color)}>
            {meta.label}
          </span>
        </div>
      </td>

      {/* Active toggle */}
      <td className="px-4 py-3">
        <Switch
          data-ocid={`channel.toggle.${index + 1}`}
          checked={config.isActive}
          onCheckedChange={() => onToggleActive(config)}
          className="data-[state=checked]:bg-amber-500"
        />
      </td>

      {/* Sync Status */}
      <td className="px-4 py-3">
        <SyncBadge status={config.syncStatus} />
      </td>

      {/* Base Rate */}
      <td className="px-4 py-3 text-foreground font-mono text-sm">
        ₹{config.baseRate.toLocaleString("en-IN")}
      </td>

      {/* Rate Override */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs pointer-events-none">
              ₹
            </span>
            <Input
              data-ocid={`channel.input.${index + 1}`}
              type="number"
              value={rateInput}
              onChange={(e) => setRateInput(e.target.value)}
              placeholder="Override"
              className="pl-6 h-8 w-28 text-sm font-mono bg-muted/40 border-border focus:border-amber-500/50 focus:ring-amber-500/20"
            />
          </div>
          <Button
            type="button"
            size="sm"
            data-ocid={`channel.save_button.${index + 1}`}
            onClick={handleApplyRate}
            className="h-8 px-2.5 text-xs bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 hover:border-amber-500/50"
          >
            Apply
          </Button>
        </div>
      </td>

      {/* Last Synced */}
      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
        {lastSyncLabel}
      </td>

      {/* Sync Now */}
      <td className="px-4 py-3">
        <Button
          type="button"
          size="sm"
          variant="outline"
          data-ocid={`channel.sync_button.${index + 1}`}
          onClick={handleSyncNow}
          disabled={syncing}
          className="h-8 gap-1.5 text-xs border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
        >
          <RefreshCw
            className={cn("w-3 h-3", syncing && "animate-spin text-amber-400")}
          />
          {syncing ? "Syncing…" : "Sync Now"}
        </Button>
      </td>
    </motion.tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ChannelManagerPage() {
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allHotels = useHotelStore((s) => s.hotels);
  const allChannelConfigs = useHotelStore((s) => s.channelConfigs);
  const allRooms = useHotelStore((s) => s.rooms);
  const updateChannelConfig = useHotelStore((s) => s.updateChannelConfig);

  const currentHotel = useMemo(
    () => allHotels.find((h) => h.id === selectedHotelId),
    [allHotels, selectedHotelId],
  );
  const channelConfigs = useMemo(
    () => allChannelConfigs.filter((c) => c.hotelId === selectedHotelId),
    [allChannelConfigs, selectedHotelId],
  );
  const rooms = useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId],
  );

  const [syncingAll, setSyncingAll] = useState(false);

  // Overbooking protection: driven by channelConfigs consensus
  const overbookingOn = channelConfigs.some((c) => c.overbookingProtection);

  // ─── Stats ───────────────────────────────────────────────────────────────
  const activeCount = channelConfigs.filter((c) => c.isActive).length;
  const syncedCount = channelConfigs.filter(
    (c) => c.syncStatus === SyncStatus.Synced,
  ).length;

  const avgRate = useMemo(() => {
    if (rooms.length === 0) return 0;
    const total = rooms.reduce((s, r) => s + r.pricePerNight, 0);
    return Math.round(total / rooms.length);
  }, [rooms]);

  // ─── Room inventory by type ──────────────────────────────────────────────
  const roomInventory = useMemo(() => {
    const types: RoomType[] = [
      RoomType.Standard,
      RoomType.Deluxe,
      RoomType.Suite,
      RoomType.Presidential,
    ];
    return types.map((type) => {
      const typeRooms = rooms.filter((r) => r.roomType === type);
      const occupied = typeRooms.filter((r) => r.status === "Occupied").length;
      const avgTypeRate =
        typeRooms.length > 0
          ? Math.round(
              typeRooms.reduce((s, r) => s + r.pricePerNight, 0) /
                typeRooms.length,
            )
          : 0;
      return {
        type,
        total: typeRooms.length,
        occupied,
        available: typeRooms.length - occupied,
        baseRate: avgTypeRate,
      };
    });
  }, [rooms]);

  // ─── Actions ─────────────────────────────────────────────────────────────
  function handleToggleActive(config: ChannelConfig) {
    updateChannelConfig({ ...config, isActive: !config.isActive });
    toast.info(
      `${CHANNEL_META[config.channel].label} ${!config.isActive ? "activated" : "deactivated"}`,
    );
  }

  function handleSyncNow(config: ChannelConfig) {
    updateChannelConfig({
      ...config,
      syncStatus: SyncStatus.Synced,
      lastSync: BigInt(Date.now()),
    });
    toast.success(`${CHANNEL_META[config.channel].label} synced`, {
      description: "Inventory and rates are up to date.",
    });
  }

  function handleApplyRate(
    config: ChannelConfig,
    override: number | undefined,
  ) {
    updateChannelConfig({ ...config, rateOverride: override });
    toast.success(
      override
        ? `Rate override ₹${override.toLocaleString("en-IN")} applied to ${CHANNEL_META[config.channel].label}`
        : `Rate override removed from ${CHANNEL_META[config.channel].label}`,
    );
  }

  function handleToggleOverbooking() {
    const next = !overbookingOn;
    for (const c of channelConfigs) {
      updateChannelConfig({ ...c, overbookingProtection: next });
    }
    toast[next ? "success" : "info"](
      next
        ? "Overbooking protection enabled"
        : "Overbooking protection disabled",
    );
  }

  function handleSyncAll() {
    setSyncingAll(true);
    setTimeout(() => {
      for (const c of channelConfigs) {
        updateChannelConfig({
          ...c,
          syncStatus: SyncStatus.Synced,
          lastSync: BigInt(Date.now()),
        });
      }
      setSyncingAll(false);
      toast.success("All channels synced", {
        description: "Inventory and rates pushed to all connected OTAs.",
      });
    }, 1500);
  }

  return (
    <div className="space-y-8 pb-10 page-enter">
      {/* ─── Section 1: Header + Stats + Overbooking ───────────────────────── */}
      <section data-ocid="channel_manager.section">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Channel Manager
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {currentHotel?.name ?? "Select a property"} · OTA Distribution Hub
            </p>
          </div>

          {/* Overbooking protection toggle */}
          <div
            data-ocid="channel_manager.toggle"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer",
              overbookingOn
                ? "bg-amber-500/10 border-amber-500/30"
                : "bg-muted/30 border-border",
            )}
          >
            <Shield
              className={cn(
                "w-4 h-4 shrink-0",
                overbookingOn ? "text-amber-400" : "text-muted-foreground",
              )}
            />
            <div>
              <p
                className={cn(
                  "text-sm font-medium leading-tight",
                  overbookingOn ? "text-amber-400" : "text-foreground",
                )}
              >
                Overbooking Protection
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                {overbookingOn ? "Active — blocking overrides" : "Disabled"}
              </p>
            </div>
            <Switch
              checked={overbookingOn}
              onCheckedChange={handleToggleOverbooking}
              className="data-[state=checked]:bg-amber-500 ml-1"
            />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            index={0}
            label="Total Channels"
            value={5}
            icon={<Wifi className="w-4 h-4" />}
          />
          <StatCard
            index={1}
            label="Active Channels"
            value={activeCount}
            icon={<Zap className="w-4 h-4" />}
            accent
          />
          <StatCard
            index={2}
            label="Channels In Sync"
            value={syncedCount}
            icon={<CheckCircle2 className="w-4 h-4" />}
          />
          <StatCard
            index={3}
            label="Avg Room Rate"
            value={`₹${avgRate.toLocaleString("en-IN")}`}
            icon={<TrendingUp className="w-4 h-4" />}
            accent
          />
        </div>
      </section>

      {/* ─── Section 2: Room Inventory Table ──────────────────────────────── */}
      <section data-ocid="inventory.section">
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">
              Room Inventory Overview
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Current availability breakdown by room category
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  {[
                    "Room Type",
                    "Total Rooms",
                    "Occupied",
                    "Available",
                    "Base Rate (INR/night)",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roomInventory.map((row, i) => {
                  const pct =
                    row.total > 0
                      ? Math.round((row.occupied / row.total) * 100)
                      : 0;
                  return (
                    <motion.tr
                      key={row.type}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      data-ocid={`inventory.item.${i + 1}`}
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-foreground">
                        {ROOM_TYPE_LABELS[row.type]}
                      </td>
                      <td className="px-5 py-3 text-muted-foreground font-mono">
                        {row.total}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-foreground">
                            {row.occupied}
                          </span>
                          <div className="flex-1 max-w-[80px] h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500/70 rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {pct}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <Badge
                          variant="outline"
                          className={cn(
                            "font-mono text-xs",
                            row.available > 0
                              ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                              : "border-red-500/30 text-red-400 bg-red-500/10",
                          )}
                        >
                          {row.available} available
                        </Badge>
                      </td>
                      <td className="px-5 py-3 font-mono text-foreground">
                        ₹{row.baseRate.toLocaleString("en-IN")}
                      </td>
                    </motion.tr>
                  );
                })}
                {rooms.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      data-ocid="inventory.empty_state"
                      className="text-center py-10 text-muted-foreground text-sm"
                    >
                      No rooms found for this property.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Section 3: OTA Channels Table ───────────────────────────────── */}
      <section data-ocid="channels.section">
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Connected Channels
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage distribution, rates, and sync across all OTAs
              </p>
            </div>

            <div className="flex items-center gap-2">
              {channelConfigs.some(
                (c) => c.syncStatus === SyncStatus.OutOfSync,
              ) && (
                <Badge
                  variant="outline"
                  className="border-red-500/30 text-red-400 bg-red-500/10 text-xs gap-1.5"
                >
                  <WifiOff className="w-3 h-3" />
                  {
                    channelConfigs.filter(
                      (c) => c.syncStatus === SyncStatus.OutOfSync,
                    ).length
                  }{" "}
                  out of sync
                </Badge>
              )}
              <Button
                type="button"
                size="sm"
                data-ocid="channels.sync_all_button"
                onClick={handleSyncAll}
                disabled={syncingAll}
                className="bg-amber-500 hover:bg-amber-400 text-black font-medium gap-1.5 h-8"
              >
                <RefreshCw
                  className={cn("w-3.5 h-3.5", syncingAll && "animate-spin")}
                />
                {syncingAll ? "Syncing All…" : "Sync All Channels"}
              </Button>
            </div>
          </div>

          {channelConfigs.length === 0 ? (
            <div
              data-ocid="channels.empty_state"
              className="py-14 text-center text-muted-foreground text-sm"
            >
              <Wifi className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No channels configured</p>
              <p className="text-xs mt-1">
                No OTA channel configs found for this property.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    {[
                      "Channel",
                      "Status",
                      "Sync Status",
                      "Base Rate",
                      "Rate Override",
                      "Last Synced",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {channelConfigs.map((config, i) => (
                    <ChannelRow
                      key={config.id.toString()}
                      config={config}
                      index={i}
                      onToggleActive={handleToggleActive}
                      onSyncNow={handleSyncNow}
                      onApplyRate={handleApplyRate}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer Summary */}
          {channelConfigs.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 border-t border-border bg-muted/10">
              <div className="flex items-center gap-2 text-xs">
                <Label className="text-xs text-muted-foreground">Active:</Label>
                <span className="font-semibold text-foreground">
                  {activeCount} / {channelConfigs.length}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Label className="text-xs text-muted-foreground">Synced:</Label>
                <span className="font-semibold text-foreground">
                  {syncedCount} / {channelConfigs.length}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs ml-auto">
                <Shield className="w-3 h-3 text-amber-400" />
                <span
                  className={cn(
                    "text-xs",
                    overbookingOn ? "text-amber-400" : "text-muted-foreground",
                  )}
                >
                  Overbooking protection{" "}
                  {overbookingOn ? "enabled" : "disabled"}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
