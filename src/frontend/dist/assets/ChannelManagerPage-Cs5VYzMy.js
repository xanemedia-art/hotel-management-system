import { c as createLucideIcon, u as useHotelStore, r as reactExports, y as SyncStatus, k as RoomType, j as jsxRuntimeExports, z as Shield, a as cn, f as ue, O as OTAChannel } from "./index-CBcYPlz6.js";
import { B as Badge } from "./badge-Ca613t8w.js";
import { B as Button } from "./button-Db-hK2sn.js";
import { I as Input } from "./input-CcvuTxso.js";
import { L as Label } from "./label-CXZjKKoG.js";
import { S as Switch } from "./switch-C5pUhbL7.js";
import { Z as Zap } from "./zap-D3YE792w.js";
import { C as CircleCheck } from "./circle-check-BtbRRnsg.js";
import { T as TrendingUp } from "./trending-up-Cl6YUfoP.js";
import { m as motion } from "./proxy-DDZWRdmp.js";
import { R as RefreshCw } from "./refresh-cw-DrE_i4KT.js";
import "./index-Dma1JNTM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const WifiOff = createLucideIcon("wifi-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
];
const Wifi = createLucideIcon("wifi", __iconNode);
const CHANNEL_META = {
  [OTAChannel.BookingCom]: {
    label: "Booking.com",
    emoji: "🏨",
    color: "text-blue-400"
  },
  [OTAChannel.Airbnb]: {
    label: "Airbnb",
    emoji: "🏡",
    color: "text-rose-400"
  },
  [OTAChannel.MakeMyTrip]: {
    label: "MakeMyTrip",
    emoji: "✈️",
    color: "text-red-400"
  },
  [OTAChannel.Expedia]: {
    label: "Expedia",
    emoji: "🌐",
    color: "text-cyan-400"
  },
  [OTAChannel.Direct]: {
    label: "Direct",
    emoji: "🔗",
    color: "text-amber-400"
  }
};
const ROOM_TYPE_LABELS = {
  [RoomType.Standard]: "Standard",
  [RoomType.Deluxe]: "Deluxe",
  [RoomType.Suite]: "Suite",
  [RoomType.Presidential]: "Presidential"
};
function StatCard({ label, value, icon, accent, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07 },
      className: cn(
        "kpi-card flex items-start justify-between gap-3",
        accent && "border-amber-500/30"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: value })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
              accent ? "bg-amber-500/15 text-amber-400" : "bg-muted text-muted-foreground"
            ),
            children: icon
          }
        )
      ]
    }
  );
}
function SyncBadge({ status }) {
  return status === SyncStatus.Synced ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
    "Synced"
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/25", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
    "Out of Sync"
  ] });
}
function ChannelRow({
  config,
  index,
  onToggleActive,
  onSyncNow,
  onApplyRate
}) {
  var _a;
  const meta = CHANNEL_META[config.channel];
  const [rateInput, setRateInput] = reactExports.useState(
    ((_a = config.rateOverride) == null ? void 0 : _a.toString()) ?? ""
  );
  const [syncing, setSyncing] = reactExports.useState(false);
  function handleSyncNow() {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      onSyncNow(config);
    }, 500);
  }
  function handleApplyRate() {
    const trimmed = rateInput.trim();
    const parsed = trimmed === "" ? void 0 : Number(trimmed);
    if (trimmed !== "" && (Number.isNaN(parsed) || parsed !== void 0 && parsed <= 0)) {
      ue.error("Please enter a valid rate.");
      return;
    }
    onApplyRate(config, parsed);
  }
  const lastSyncLabel = config.lastSync ? new Date(Number(config.lastSync)).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }) : "Never";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.tr,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.06 },
      "data-ocid": `channel.item.${index + 1}`,
      className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl leading-none", children: meta.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("font-semibold text-sm", meta.color), children: meta.label })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            "data-ocid": `channel.toggle.${index + 1}`,
            checked: config.isActive,
            onCheckedChange: () => onToggleActive(config),
            className: "data-[state=checked]:bg-amber-500"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SyncBadge, { status: config.syncStatus }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-foreground font-mono text-sm", children: [
          "₹",
          config.baseRate.toLocaleString("en-IN")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs pointer-events-none", children: "₹" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": `channel.input.${index + 1}`,
                type: "number",
                value: rateInput,
                onChange: (e) => setRateInput(e.target.value),
                placeholder: "Override",
                className: "pl-6 h-8 w-28 text-sm font-mono bg-muted/40 border-border focus:border-amber-500/50 focus:ring-amber-500/20"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              "data-ocid": `channel.save_button.${index + 1}`,
              onClick: handleApplyRate,
              className: "h-8 px-2.5 text-xs bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 hover:border-amber-500/50",
              children: "Apply"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: lastSyncLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            "data-ocid": `channel.sync_button.${index + 1}`,
            onClick: handleSyncNow,
            disabled: syncing,
            className: "h-8 gap-1.5 text-xs border-border text-muted-foreground hover:text-foreground hover:border-primary/40",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: cn("w-3 h-3", syncing && "animate-spin text-amber-400")
                }
              ),
              syncing ? "Syncing…" : "Sync Now"
            ]
          }
        ) })
      ]
    }
  );
}
function ChannelManagerPage() {
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allHotels = useHotelStore((s) => s.hotels);
  const allChannelConfigs = useHotelStore((s) => s.channelConfigs);
  const allRooms = useHotelStore((s) => s.rooms);
  const updateChannelConfig = useHotelStore((s) => s.updateChannelConfig);
  const currentHotel = reactExports.useMemo(
    () => allHotels.find((h) => h.id === selectedHotelId),
    [allHotels, selectedHotelId]
  );
  const channelConfigs = reactExports.useMemo(
    () => allChannelConfigs.filter((c) => c.hotelId === selectedHotelId),
    [allChannelConfigs, selectedHotelId]
  );
  const rooms = reactExports.useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId]
  );
  const [syncingAll, setSyncingAll] = reactExports.useState(false);
  const overbookingOn = channelConfigs.some((c) => c.overbookingProtection);
  const activeCount = channelConfigs.filter((c) => c.isActive).length;
  const syncedCount = channelConfigs.filter(
    (c) => c.syncStatus === SyncStatus.Synced
  ).length;
  const avgRate = reactExports.useMemo(() => {
    if (rooms.length === 0) return 0;
    const total = rooms.reduce((s, r) => s + r.pricePerNight, 0);
    return Math.round(total / rooms.length);
  }, [rooms]);
  const roomInventory = reactExports.useMemo(() => {
    const types = [
      RoomType.Standard,
      RoomType.Deluxe,
      RoomType.Suite,
      RoomType.Presidential
    ];
    return types.map((type) => {
      const typeRooms = rooms.filter((r) => r.roomType === type);
      const occupied = typeRooms.filter((r) => r.status === "Occupied").length;
      const avgTypeRate = typeRooms.length > 0 ? Math.round(
        typeRooms.reduce((s, r) => s + r.pricePerNight, 0) / typeRooms.length
      ) : 0;
      return {
        type,
        total: typeRooms.length,
        occupied,
        available: typeRooms.length - occupied,
        baseRate: avgTypeRate
      };
    });
  }, [rooms]);
  function handleToggleActive(config) {
    updateChannelConfig({ ...config, isActive: !config.isActive });
    ue.info(
      `${CHANNEL_META[config.channel].label} ${!config.isActive ? "activated" : "deactivated"}`
    );
  }
  function handleSyncNow(config) {
    updateChannelConfig({
      ...config,
      syncStatus: SyncStatus.Synced,
      lastSync: BigInt(Date.now())
    });
    ue.success(`${CHANNEL_META[config.channel].label} synced`, {
      description: "Inventory and rates are up to date."
    });
  }
  function handleApplyRate(config, override) {
    updateChannelConfig({ ...config, rateOverride: override });
    ue.success(
      override ? `Rate override ₹${override.toLocaleString("en-IN")} applied to ${CHANNEL_META[config.channel].label}` : `Rate override removed from ${CHANNEL_META[config.channel].label}`
    );
  }
  function handleToggleOverbooking() {
    const next = !overbookingOn;
    for (const c of channelConfigs) {
      updateChannelConfig({ ...c, overbookingProtection: next });
    }
    ue[next ? "success" : "info"](
      next ? "Overbooking protection enabled" : "Overbooking protection disabled"
    );
  }
  function handleSyncAll() {
    setSyncingAll(true);
    setTimeout(() => {
      for (const c of channelConfigs) {
        updateChannelConfig({
          ...c,
          syncStatus: SyncStatus.Synced,
          lastSync: BigInt(Date.now())
        });
      }
      setSyncingAll(false);
      ue.success("All channels synced", {
        description: "Inventory and rates pushed to all connected OTAs."
      });
    }, 1500);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-10 page-enter", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "channel_manager.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Channel Manager" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            (currentHotel == null ? void 0 : currentHotel.name) ?? "Select a property",
            " · OTA Distribution Hub"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "channel_manager.toggle",
            className: cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer",
              overbookingOn ? "bg-amber-500/10 border-amber-500/30" : "bg-muted/30 border-border"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Shield,
                {
                  className: cn(
                    "w-4 h-4 shrink-0",
                    overbookingOn ? "text-amber-400" : "text-muted-foreground"
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: cn(
                      "text-sm font-medium leading-tight",
                      overbookingOn ? "text-amber-400" : "text-foreground"
                    ),
                    children: "Overbooking Protection"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-tight", children: overbookingOn ? "Active — blocking overrides" : "Disabled" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: overbookingOn,
                  onCheckedChange: handleToggleOverbooking,
                  className: "data-[state=checked]:bg-amber-500 ml-1"
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            index: 0,
            label: "Total Channels",
            value: 5,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            index: 1,
            label: "Active Channels",
            value: activeCount,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
            accent: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            index: 2,
            label: "Channels In Sync",
            value: syncedCount,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            index: 3,
            label: "Avg Room Rate",
            value: `₹${avgRate.toLocaleString("en-IN")}`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
            accent: true
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "inventory.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Room Inventory Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Current availability breakdown by room category" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/20", children: [
          "Room Type",
          "Total Rooms",
          "Occupied",
          "Available",
          "Base Rate (INR/night)"
        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground whitespace-nowrap",
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          roomInventory.map((row, i) => {
            const pct = row.total > 0 ? Math.round(row.occupied / row.total * 100) : 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.tr,
              {
                initial: { opacity: 0, x: -8 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: i * 0.07 },
                "data-ocid": `inventory.item.${i + 1}`,
                className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium text-foreground", children: ROOM_TYPE_LABELS[row.type] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground font-mono", children: row.total }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: row.occupied }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 max-w-[80px] h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full bg-blue-500/70 rounded-full transition-all duration-500",
                        style: { width: `${pct}%` }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      pct,
                      "%"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: cn(
                        "font-mono text-xs",
                        row.available > 0 ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" : "border-red-500/30 text-red-400 bg-red-500/10"
                      ),
                      children: [
                        row.available,
                        " available"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-mono text-foreground", children: [
                    "₹",
                    row.baseRate.toLocaleString("en-IN")
                  ] })
                ]
              },
              row.type
            );
          }),
          rooms.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 5,
              "data-ocid": "inventory.empty_state",
              className: "text-center py-10 text-muted-foreground text-sm",
              children: "No rooms found for this property."
            }
          ) })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "channels.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Connected Channels" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Manage distribution, rates, and sync across all OTAs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          channelConfigs.some(
            (c) => c.syncStatus === SyncStatus.OutOfSync
          ) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "border-red-500/30 text-red-400 bg-red-500/10 text-xs gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-3 h-3" }),
                channelConfigs.filter(
                  (c) => c.syncStatus === SyncStatus.OutOfSync
                ).length,
                " ",
                "out of sync"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              "data-ocid": "channels.sync_all_button",
              onClick: handleSyncAll,
              disabled: syncingAll,
              className: "bg-amber-500 hover:bg-amber-400 text-black font-medium gap-1.5 h-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RefreshCw,
                  {
                    className: cn("w-3.5 h-3.5", syncingAll && "animate-spin")
                  }
                ),
                syncingAll ? "Syncing All…" : "Sync All Channels"
              ]
            }
          )
        ] })
      ] }),
      channelConfigs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "channels.empty_state",
          className: "py-14 text-center text-muted-foreground text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No channels configured" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "No OTA channel configs found for this property." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/20", children: [
          "Channel",
          "Status",
          "Sync Status",
          "Base Rate",
          "Rate Override",
          "Last Synced",
          "Actions"
        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground whitespace-nowrap",
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: channelConfigs.map((config, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChannelRow,
          {
            config,
            index: i,
            onToggleActive: handleToggleActive,
            onSyncNow: handleSyncNow,
            onApplyRate: handleApplyRate
          },
          config.id.toString()
        )) })
      ] }) }),
      channelConfigs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 border-t border-border bg-muted/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Active:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
            activeCount,
            " / ",
            channelConfigs.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Synced:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
            syncedCount,
            " / ",
            channelConfigs.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs ml-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "text-xs",
                overbookingOn ? "text-amber-400" : "text-muted-foreground"
              ),
              children: [
                "Overbooking protection",
                " ",
                overbookingOn ? "enabled" : "disabled"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ChannelManagerPage as default
};
