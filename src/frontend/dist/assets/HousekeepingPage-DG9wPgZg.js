import { c as createLucideIcon, u as useHotelStore, r as reactExports, w as StaffRole, T as TaskStatus, R as RoomStatus, j as jsxRuntimeExports, a as cn, f as ue, X } from "./index-CBcYPlz6.js";
import { S as StatusBadge } from "./StatusBadge-C7ZHomM8.js";
import { B as Badge } from "./badge-Ca613t8w.js";
import { B as Button } from "./button-Db-hK2sn.js";
import { L as Label } from "./label-CXZjKKoG.js";
import { S as Switch } from "./switch-C5pUhbL7.js";
import { u as useRoomStatusPolling } from "./useRoomStatusPolling-8ahMps0G.js";
import { A as AnimatePresence } from "./index-CDAIX88k.js";
import { m as motion } from "./proxy-DDZWRdmp.js";
import { P as Plus } from "./plus-uqfn8bA2.js";
import { U as User } from "./user-DdoRQTNO.js";
import { C as CircleCheck } from "./circle-check-BtbRRnsg.js";
import { Z as Zap } from "./zap-D3YE792w.js";
import "./index-Dma1JNTM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polygon", { points: "10 8 16 12 10 16 10 8", key: "1cimsy" }]
];
const CirclePlay = createLucideIcon("circle-play", __iconNode);
const ROOM_STATUS_STYLES = {
  [RoomStatus.Clean]: {
    card: "bg-green-900/30 border-green-500/60 hover:border-green-400",
    label: "Clean"
  },
  [RoomStatus.Dirty]: {
    card: "bg-red-900/30 border-red-500/60 hover:border-red-400",
    label: "Dirty"
  },
  [RoomStatus.Occupied]: {
    card: "bg-blue-900/30 border-blue-500/60 hover:border-blue-400",
    label: "Occupied"
  },
  [RoomStatus.OutOfOrder]: {
    card: "bg-orange-900/30 border-orange-500/60 hover:border-orange-400",
    label: "Out of Order"
  },
  [RoomStatus.Maintenance]: {
    card: "bg-purple-900/30 border-purple-500/60 hover:border-purple-400",
    label: "Maintenance"
  }
};
const STATUS_ORDER = [
  RoomStatus.Clean,
  RoomStatus.Dirty,
  RoomStatus.Occupied,
  RoomStatus.OutOfOrder,
  RoomStatus.Maintenance
];
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function RoomCard({ room, assignedStaff, onClick, index }) {
  const styles = ROOM_STATUS_STYLES[room.status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      initial: { opacity: 0, scale: 0.92 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: index * 0.03, duration: 0.2 },
      whileHover: { scale: 1.04 },
      whileTap: { scale: 0.97 },
      onClick: () => onClick(room),
      "data-ocid": `room_card.item.${index + 1}`,
      className: cn(
        "relative flex flex-col items-start gap-1 p-3 rounded-lg border cursor-pointer",
        "transition-colors duration-150 text-left w-full",
        styles.card
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-foreground leading-tight", children: room.number }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: room.status, className: "text-[10px] py-0 px-1.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground capitalize", children: room.roomType }),
        assignedStaff && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] italic text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-2.5 h-2.5" }),
          assignedStaff.name.split(" ")[0]
        ] })
      ]
    }
  );
}
function StatusUpdateModal({
  room,
  hkStaff,
  onClose,
  onUpdate
}) {
  const [selectedStatus, setSelectedStatus] = reactExports.useState(room.status);
  const [selectedStaffId, setSelectedStaffId] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95, y: 16 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 16 },
      transition: { duration: 0.18 },
      "data-ocid": "room_status.dialog",
      className: "w-full max-w-md bg-card border border-border rounded-xl shadow-2xl overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base", children: "Update Room Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Room ",
              room.number,
              " · Floor ",
              room.floor.toString(),
              " ·",
              " ",
              room.roomType
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "room_status.close_button",
              onClick: onClose,
              className: "text-muted-foreground hover:text-foreground transition-colors p-1 rounded",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wide mb-2 block", children: "Room Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2", children: STATUS_ORDER.map((status) => {
              const styles = ROOM_STATUS_STYLES[status];
              const isSelected = selectedStatus === status;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  className: cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all duration-150",
                    isSelected ? `${styles.card} ring-1 ring-amber-500/40` : "bg-muted/20 border-border hover:bg-muted/40"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "radio",
                        name: "roomStatus",
                        value: status,
                        checked: isSelected,
                        onChange: () => setSelectedStatus(status),
                        className: "accent-amber-500"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: styles.label })
                  ]
                },
                status
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "staff-select",
                className: "text-xs text-muted-foreground uppercase tracking-wide mb-2 block",
                children: "Assign Staff"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "staff-select",
                "data-ocid": "room_status.select",
                value: selectedStaffId,
                onChange: (e) => setSelectedStaffId(e.target.value),
                className: "w-full px-3 py-2 bg-muted/40 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Unassigned —" }),
                  hkStaff.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.id.toString(), children: s.name }, s.id.toString()))
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 px-5 py-4 border-t border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "room_status.cancel_button",
              onClick: onClose,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              "data-ocid": "room_status.confirm_button",
              className: "bg-amber-500 hover:bg-amber-400 text-black font-medium",
              onClick: () => {
                onUpdate(
                  room.id,
                  selectedStatus,
                  selectedStaffId ? BigInt(selectedStaffId) : void 0
                );
                onClose();
              },
              children: "Update Status"
            }
          )
        ] })
      ]
    }
  ) });
}
function AddTaskModal({ rooms, hkStaff, onClose, onAdd }) {
  var _a;
  const [roomId, setRoomId] = reactExports.useState(((_a = rooms[0]) == null ? void 0 : _a.id.toString()) ?? "");
  const [staffId, setStaffId] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [priority, setPriority] = reactExports.useState("1");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95, y: 16 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 16 },
      transition: { duration: 0.18 },
      "data-ocid": "add_task.dialog",
      className: "w-full max-w-md bg-card border border-border rounded-xl shadow-2xl overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base", children: "Add Housekeeping Task" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "add_task.close_button",
              onClick: onClose,
              className: "text-muted-foreground hover:text-foreground transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block", children: "Room" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                "data-ocid": "add_task.select",
                value: roomId,
                onChange: (e) => setRoomId(e.target.value),
                className: "w-full px-3 py-2 bg-muted/40 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/50",
                children: rooms.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: r.id.toString(), children: [
                  "Room ",
                  r.number,
                  " — Floor ",
                  r.floor.toString(),
                  " (",
                  r.roomType,
                  ")"
                ] }, r.id.toString()))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block", children: "Assign Staff" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: staffId,
                onChange: (e) => setStaffId(e.target.value),
                className: "w-full px-3 py-2 bg-muted/40 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Unassigned —" }),
                  hkStaff.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.id.toString(), children: s.name }, s.id.toString()))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block", children: "Priority" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: priority,
                onChange: (e) => setPriority(e.target.value),
                className: "w-full px-3 py-2 bg-muted/40 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "High (1)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2", children: "Medium (2)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "3", children: "Low (3)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block", children: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                "data-ocid": "add_task.textarea",
                value: notes,
                onChange: (e) => setNotes(e.target.value),
                placeholder: "Task description...",
                rows: 3,
                className: "w-full px-3 py-2 bg-muted/40 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-none"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 px-5 py-4 border-t border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "add_task.cancel_button",
              onClick: onClose,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              "data-ocid": "add_task.submit_button",
              disabled: !roomId,
              className: "bg-amber-500 hover:bg-amber-400 text-black font-medium disabled:opacity-50",
              onClick: () => {
                onAdd(
                  BigInt(roomId),
                  staffId ? BigInt(staffId) : void 0,
                  notes,
                  BigInt(priority)
                );
                onClose();
              },
              children: "Add Task"
            }
          )
        ] })
      ]
    }
  ) });
}
function HousekeepingPage() {
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allRooms = useHotelStore((s) => s.rooms);
  const allTasks = useHotelStore((s) => s.housekeepingTasks);
  const allStaff = useHotelStore((s) => s.staff);
  const updateRoom = useHotelStore((s) => s.updateRoom);
  const addTask = useHotelStore((s) => s.addTask);
  const updateTask = useHotelStore((s) => s.updateTask);
  const rooms = reactExports.useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId]
  );
  const tasks = reactExports.useMemo(
    () => allTasks.filter((t) => t.hotelId === selectedHotelId),
    [allTasks, selectedHotelId]
  );
  const staff = reactExports.useMemo(
    () => allStaff.filter((s) => s.hotelId === selectedHotelId),
    [allStaff, selectedHotelId]
  );
  const hkStaff = reactExports.useMemo(
    () => staff.filter((s) => s.role === StaffRole.Housekeeping),
    [staff]
  );
  const [statusFilter, setStatusFilter] = reactExports.useState("All");
  const [showCompleted, setShowCompleted] = reactExports.useState(false);
  const [selectedRoom, setSelectedRoom] = reactExports.useState(null);
  const [showAddTask, setShowAddTask] = reactExports.useState(false);
  const [liveEnabled, setLiveEnabled] = reactExports.useState(true);
  useRoomStatusPolling({ enabled: liveEnabled, intervalMs: 6e3 });
  const filteredRooms = reactExports.useMemo(
    () => statusFilter === "All" ? rooms : rooms.filter((r) => r.status === statusFilter),
    [rooms, statusFilter]
  );
  const floorGroups = reactExports.useMemo(() => {
    const groups = {};
    for (const room of filteredRooms) {
      const f = Number(room.floor);
      if (!groups[f]) groups[f] = [];
      groups[f].push(room);
    }
    return Object.entries(groups).sort(([a], [b]) => Number(a) - Number(b)).map(([floor, floorRooms]) => ({
      floor: Number(floor),
      rooms: floorRooms
    }));
  }, [filteredRooms]);
  const staffMap = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const s of staff) m.set(s.id, s);
    return m;
  }, [staff]);
  const roomMap = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const r of rooms) m.set(r.id, r);
    return m;
  }, [rooms]);
  const visibleTasks = reactExports.useMemo(() => {
    return tasks.filter(
      (t) => showCompleted ? true : t.status !== TaskStatus.Done
    );
  }, [tasks, showCompleted]);
  const staffSummary = reactExports.useMemo(() => {
    return hkStaff.map((s) => {
      const assigned = tasks.filter((t) => t.assignedStaffId === s.id);
      const completedToday = assigned.filter(
        (t) => t.status === TaskStatus.Done
      ).length;
      const pending = assigned.filter(
        (t) => t.status === TaskStatus.Pending || t.status === TaskStatus.InProgress
      ).length;
      return { staff: s, assigned: assigned.length, pending, completedToday };
    });
  }, [hkStaff, tasks]);
  function handleStatusUpdate(roomId, status, staffId) {
    const room = rooms.find((r) => r.id === roomId);
    if (!room) return;
    updateRoom({ ...room, status });
    if (staffId) {
      const relatedTasks = tasks.filter(
        (t) => t.roomId === roomId && t.status !== TaskStatus.Done
      );
      for (const t of relatedTasks) {
        updateTask({ ...t, assignedStaffId: staffId });
      }
    }
    ue.success(
      `Room ${room.number} updated to ${ROOM_STATUS_STYLES[status].label}`
    );
  }
  function handleAddTask(roomId, staffId, notes, priority) {
    var _a;
    const hotelId = ((_a = rooms[0]) == null ? void 0 : _a.hotelId) ?? 1n;
    const newTask = {
      id: BigInt(Date.now()),
      hotelId,
      roomId,
      assignedStaffId: staffId,
      status: TaskStatus.Pending,
      priority,
      notes,
      createdAt: BigInt(Date.now()),
      completedAt: void 0
    };
    addTask(newTask);
    ue.success("Task added successfully");
  }
  function handleTaskProgress(task) {
    if (task.status === TaskStatus.Pending) {
      updateTask({ ...task, status: TaskStatus.InProgress });
      ue.info("Task started");
    } else if (task.status === TaskStatus.InProgress) {
      updateTask({
        ...task,
        status: TaskStatus.Done,
        completedAt: BigInt(Date.now())
      });
      ue.success("Task completed!");
    }
  }
  const FILTER_BUTTONS = [
    { label: "All", value: "All" },
    { label: "Clean", value: RoomStatus.Clean },
    { label: "Dirty", value: RoomStatus.Dirty },
    { label: "Occupied", value: RoomStatus.Occupied },
    { label: "Out of Order", value: RoomStatus.OutOfOrder },
    { label: "Maintenance", value: RoomStatus.Maintenance }
  ];
  const statusCounts = reactExports.useMemo(() => {
    const counts = {
      All: rooms.length
    };
    for (const r of rooms) {
      counts[r.status] = (counts[r.status] ?? 0) + 1;
    }
    return counts;
  }, [rooms]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "room_status.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Room Status Board" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: liveEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.span,
            {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.8 },
              "data-ocid": "room_status.live_badge",
              className: "flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })
                ] }),
                "Live"
              ]
            },
            "live-badge"
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "live-toggle",
              className: "text-sm text-muted-foreground cursor-pointer select-none",
              children: "Real-time Updates"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "live-toggle",
              "data-ocid": "room_status.toggle",
              checked: liveEnabled,
              onCheckedChange: setLiveEnabled,
              className: "data-[state=checked]:bg-emerald-500"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 px-6 py-3 bg-muted/20 border-b border-border", children: FILTER_BUTTONS.map(({ label, value }) => {
        const count = statusCounts[value] ?? 0;
        const isActive = statusFilter === value;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "room_status.filter.tab",
            onClick: () => setStatusFilter(value),
            className: cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150",
              isActive ? "bg-amber-500/20 border-amber-500/50 text-amber-400" : "bg-muted/30 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
            ),
            children: [
              label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                    isActive ? "bg-amber-500/30 text-amber-300" : "bg-muted text-muted-foreground"
                  ),
                  children: count
                }
              )
            ]
          },
          value
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-6", children: floorGroups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "room_status.empty_state",
          className: "text-center py-12 text-muted-foreground text-sm",
          children: "No rooms match the selected filter."
        }
      ) : floorGroups.map(({ floor, rooms: floorRooms }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: [
            "Floor ",
            floor
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            floorRooms.length,
            " rooms"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2", children: floorRooms.map((room, i) => {
          const assignedTask = tasks.find(
            (t) => t.roomId === room.id && t.status !== TaskStatus.Done
          );
          const assignedStaff = (assignedTask == null ? void 0 : assignedTask.assignedStaffId) ? staffMap.get(assignedTask.assignedStaffId) : void 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            RoomCard,
            {
              room,
              assignedStaff,
              onClick: setSelectedRoom,
              index: i
            },
            room.id.toString()
          );
        }) })
      ] }, floor)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4 px-6 py-3 border-t border-border bg-muted/10", children: STATUS_ORDER.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-2.5 h-2.5 rounded-sm border",
              ROOM_STATUS_STYLES[status].card
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: ROOM_STATUS_STYLES[status].label })
      ] }, status)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "tasks.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Housekeeping Tasks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "show-completed-toggle",
              className: "flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: "show-completed-toggle",
                    "data-ocid": "tasks.toggle",
                    checked: showCompleted,
                    onCheckedChange: setShowCompleted,
                    className: "data-[state=checked]:bg-emerald-500 scale-90"
                  }
                ),
                "Show Completed"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              "data-ocid": "tasks.add_button",
              onClick: () => setShowAddTask(true),
              className: "bg-amber-500 hover:bg-amber-400 text-black font-medium gap-1.5 h-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                "Add Task"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/20", children: [
          "Room #",
          "Floor",
          "Current Status",
          "Assigned Staff",
          "Task Status",
          "Created",
          "Actions"
        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground whitespace-nowrap",
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: visibleTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 7,
            "data-ocid": "tasks.empty_state",
            className: "text-center py-12 text-muted-foreground",
            children: showCompleted ? "No tasks found." : "No active tasks. All done!"
          }
        ) }) : visibleTasks.map((task, i) => {
          const room = roomMap.get(task.roomId);
          const assignedStaff = task.assignedStaffId ? staffMap.get(task.assignedStaffId) : void 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.tr,
            {
              initial: { opacity: 0, x: -8 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: i * 0.04 },
              "data-ocid": `tasks.item.${i + 1}`,
              className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-foreground", children: room ? room.number : `#${task.roomId}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: room ? `Floor ${room.floor}` : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: room ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: room.status }) : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: assignedStaff ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 text-amber-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: assignedStaff.name })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic text-xs", children: "Unassigned" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: task.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs whitespace-nowrap", children: formatDate(task.createdAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                  task.status === TaskStatus.Pending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      "data-ocid": `tasks.start_button.${i + 1}`,
                      onClick: () => handleTaskProgress(task),
                      className: "h-7 gap-1.5 text-xs border-sky-500/40 text-sky-400 hover:bg-sky-500/10 hover:text-sky-300",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-3 h-3" }),
                        "Start"
                      ]
                    }
                  ),
                  task.status === TaskStatus.InProgress && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      "data-ocid": `tasks.complete_button.${i + 1}`,
                      onClick: () => handleTaskProgress(task),
                      className: "h-7 gap-1.5 text-xs border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                        "Complete"
                      ]
                    }
                  ),
                  task.status === TaskStatus.Done && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-emerald-400", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                    "Done"
                  ] })
                ] })
              ]
            },
            task.id.toString()
          );
        }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "staff_summary.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Staff Summary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: hkStaff.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          "data-ocid": "staff_summary.empty_state",
          className: "text-center text-muted-foreground text-sm py-6",
          children: "No housekeeping staff found for this property."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: staffSummary.map(
        ({ staff: s, assigned, pending, completedToday }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.07 },
            "data-ocid": `staff_summary.item.${i + 1}`,
            className: "bg-muted/30 border border-border rounded-lg p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-amber-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate", children: s.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Housekeeping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground", children: pending }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight", children: "Active" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px bg-border" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-emerald-400", children: completedToday }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight", children: "Done" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px bg-border" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-muted-foreground", children: assigned }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight", children: "Total" })
                  ] })
                ] })
              ] }),
              pending > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px] border-amber-500/30 text-amber-400 bg-amber-500/10 px-1.5 py-0.5 shrink-0",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-2.5 h-2.5 mr-0.5" }),
                    pending
                  ]
                }
              )
            ]
          },
          s.id.toString()
        )
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
      selectedRoom && /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatusUpdateModal,
        {
          room: selectedRoom,
          hkStaff,
          onClose: () => setSelectedRoom(null),
          onUpdate: handleStatusUpdate
        }
      ),
      showAddTask && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AddTaskModal,
        {
          rooms,
          hkStaff,
          onClose: () => setShowAddTask(false),
          onAdd: handleAddTask
        }
      )
    ] })
  ] });
}
export {
  HousekeepingPage as default
};
