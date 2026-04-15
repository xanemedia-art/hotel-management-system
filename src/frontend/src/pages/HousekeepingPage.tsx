import { RoomStatus, StaffRole, TaskStatus } from "@/backend";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRoomStatusPolling } from "@/hooks/useRoomStatusPolling";
import { cn } from "@/lib/utils";
import { useHotelStore } from "@/store/useHotelStore";
import type { HousekeepingTask, Room, Staff } from "@/types/index";
import { CheckCircle2, PlayCircle, Plus, User, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Helpers ────────────────────────────────────────────────────────────────

const ROOM_STATUS_STYLES: Record<RoomStatus, { card: string; label: string }> =
  {
    [RoomStatus.Clean]: {
      card: "bg-green-900/30 border-green-500/60 hover:border-green-400",
      label: "Clean",
    },
    [RoomStatus.Dirty]: {
      card: "bg-red-900/30 border-red-500/60 hover:border-red-400",
      label: "Dirty",
    },
    [RoomStatus.Occupied]: {
      card: "bg-blue-900/30 border-blue-500/60 hover:border-blue-400",
      label: "Occupied",
    },
    [RoomStatus.OutOfOrder]: {
      card: "bg-orange-900/30 border-orange-500/60 hover:border-orange-400",
      label: "Out of Order",
    },
    [RoomStatus.Maintenance]: {
      card: "bg-purple-900/30 border-purple-500/60 hover:border-purple-400",
      label: "Maintenance",
    },
  };

const STATUS_ORDER: RoomStatus[] = [
  RoomStatus.Clean,
  RoomStatus.Dirty,
  RoomStatus.Occupied,
  RoomStatus.OutOfOrder,
  RoomStatus.Maintenance,
];

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Room Card ───────────────────────────────────────────────────────────────

interface RoomCardProps {
  room: Room;
  assignedStaff?: Staff;
  onClick: (room: Room) => void;
  index: number;
}

function RoomCard({ room, assignedStaff, onClick, index }: RoomCardProps) {
  const styles = ROOM_STATUS_STYLES[room.status];
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(room)}
      data-ocid={`room_card.item.${index + 1}`}
      className={cn(
        "relative flex flex-col items-start gap-1 p-3 rounded-lg border cursor-pointer",
        "transition-colors duration-150 text-left w-full",
        styles.card,
      )}
    >
      <span className="text-lg font-bold text-foreground leading-tight">
        {room.number}
      </span>
      <StatusBadge status={room.status} className="text-[10px] py-0 px-1.5" />
      <span className="text-[11px] text-muted-foreground capitalize">
        {room.roomType}
      </span>
      {assignedStaff && (
        <span className="text-[10px] italic text-muted-foreground flex items-center gap-1">
          <User className="w-2.5 h-2.5" />
          {assignedStaff.name.split(" ")[0]}
        </span>
      )}
    </motion.button>
  );
}

// ─── Status Update Modal ──────────────────────────────────────────────────────

interface StatusUpdateModalProps {
  room: Room;
  hkStaff: Staff[];
  onClose: () => void;
  onUpdate: (roomId: bigint, status: RoomStatus, staffId?: bigint) => void;
}

function StatusUpdateModal({
  room,
  hkStaff,
  onClose,
  onUpdate,
}: StatusUpdateModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<RoomStatus>(room.status);
  const [selectedStaffId, setSelectedStaffId] = useState<string>("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.18 }}
        data-ocid="room_status.dialog"
        className="w-full max-w-md bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
          <div>
            <h3 className="font-semibold text-foreground text-base">
              Update Room Status
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Room {room.number} · Floor {room.floor.toString()} ·{" "}
              {room.roomType}
            </p>
          </div>
          <button
            type="button"
            data-ocid="room_status.close_button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Status selector */}
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
              Room Status
            </Label>
            <div className="grid grid-cols-1 gap-2">
              {STATUS_ORDER.map((status) => {
                const styles = ROOM_STATUS_STYLES[status];
                const isSelected = selectedStatus === status;
                return (
                  <label
                    key={status}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all duration-150",
                      isSelected
                        ? `${styles.card} ring-1 ring-amber-500/40`
                        : "bg-muted/20 border-border hover:bg-muted/40",
                    )}
                  >
                    <input
                      type="radio"
                      name="roomStatus"
                      value={status}
                      checked={isSelected}
                      onChange={() => setSelectedStatus(status)}
                      className="accent-amber-500"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {styles.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Staff assignment */}
          <div>
            <Label
              htmlFor="staff-select"
              className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block"
            >
              Assign Staff
            </Label>
            <select
              id="staff-select"
              data-ocid="room_status.select"
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              className="w-full px-3 py-2 bg-muted/40 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            >
              <option value="">— Unassigned —</option>
              {hkStaff.map((s) => (
                <option key={s.id.toString()} value={s.id.toString()}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-border bg-muted/20">
          <Button
            variant="outline"
            size="sm"
            data-ocid="room_status.cancel_button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            data-ocid="room_status.confirm_button"
            className="bg-amber-500 hover:bg-amber-400 text-black font-medium"
            onClick={() => {
              onUpdate(
                room.id,
                selectedStatus,
                selectedStaffId ? BigInt(selectedStaffId) : undefined,
              );
              onClose();
            }}
          >
            Update Status
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Add Task Modal ───────────────────────────────────────────────────────────

interface AddTaskModalProps {
  rooms: Room[];
  hkStaff: Staff[];
  onClose: () => void;
  onAdd: (
    roomId: bigint,
    staffId: bigint | undefined,
    notes: string,
    priority: bigint,
  ) => void;
}

function AddTaskModal({ rooms, hkStaff, onClose, onAdd }: AddTaskModalProps) {
  const [roomId, setRoomId] = useState<string>(rooms[0]?.id.toString() ?? "");
  const [staffId, setStaffId] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("1");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.18 }}
        data-ocid="add_task.dialog"
        className="w-full max-w-md bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
          <h3 className="font-semibold text-foreground text-base">
            Add Housekeeping Task
          </h3>
          <button
            type="button"
            data-ocid="add_task.close_button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-4 space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block">
              Room
            </Label>
            <select
              data-ocid="add_task.select"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-3 py-2 bg-muted/40 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            >
              {rooms.map((r) => (
                <option key={r.id.toString()} value={r.id.toString()}>
                  Room {r.number} — Floor {r.floor.toString()} ({r.roomType})
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block">
              Assign Staff
            </Label>
            <select
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              className="w-full px-3 py-2 bg-muted/40 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            >
              <option value="">— Unassigned —</option>
              {hkStaff.map((s) => (
                <option key={s.id.toString()} value={s.id.toString()}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block">
              Priority
            </Label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 bg-muted/40 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            >
              <option value="1">High (1)</option>
              <option value="2">Medium (2)</option>
              <option value="3">Low (3)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block">
              Notes
            </Label>
            <textarea
              data-ocid="add_task.textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Task description..."
              rows={3}
              className="w-full px-3 py-2 bg-muted/40 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-border bg-muted/20">
          <Button
            variant="outline"
            size="sm"
            data-ocid="add_task.cancel_button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            data-ocid="add_task.submit_button"
            disabled={!roomId}
            className="bg-amber-500 hover:bg-amber-400 text-black font-medium disabled:opacity-50"
            onClick={() => {
              onAdd(
                BigInt(roomId),
                staffId ? BigInt(staffId) : undefined,
                notes,
                BigInt(priority),
              );
              onClose();
            }}
          >
            Add Task
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HousekeepingPage() {
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allRooms = useHotelStore((s) => s.rooms);
  const allTasks = useHotelStore((s) => s.housekeepingTasks);
  const allStaff = useHotelStore((s) => s.staff);
  const updateRoom = useHotelStore((s) => s.updateRoom);
  const addTask = useHotelStore((s) => s.addTask);
  const updateTask = useHotelStore((s) => s.updateTask);

  const rooms = useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId],
  );
  const tasks = useMemo(
    () => allTasks.filter((t) => t.hotelId === selectedHotelId),
    [allTasks, selectedHotelId],
  );
  const staff = useMemo(
    () => allStaff.filter((s) => s.hotelId === selectedHotelId),
    [allStaff, selectedHotelId],
  );

  const hkStaff = useMemo(
    () => staff.filter((s) => s.role === StaffRole.Housekeeping),
    [staff],
  );

  const [statusFilter, setStatusFilter] = useState<RoomStatus | "All">("All");
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [liveEnabled, setLiveEnabled] = useState(true);

  // Real-time room status polling
  useRoomStatusPolling({ enabled: liveEnabled, intervalMs: 6000 });

  const filteredRooms = useMemo(
    () =>
      statusFilter === "All"
        ? rooms
        : rooms.filter((r) => r.status === statusFilter),
    [rooms, statusFilter],
  );

  const floorGroups = useMemo(() => {
    const groups: Record<number, Room[]> = {};
    for (const room of filteredRooms) {
      const f = Number(room.floor);
      if (!groups[f]) groups[f] = [];
      groups[f].push(room);
    }
    return Object.entries(groups)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([floor, floorRooms]) => ({
        floor: Number(floor),
        rooms: floorRooms,
      }));
  }, [filteredRooms]);

  const staffMap = useMemo(() => {
    const m = new Map<bigint, Staff>();
    for (const s of staff) m.set(s.id, s);
    return m;
  }, [staff]);

  const roomMap = useMemo(() => {
    const m = new Map<bigint, Room>();
    for (const r of rooms) m.set(r.id, r);
    return m;
  }, [rooms]);

  const visibleTasks = useMemo(() => {
    return tasks.filter((t) =>
      showCompleted ? true : t.status !== TaskStatus.Done,
    );
  }, [tasks, showCompleted]);

  const staffSummary = useMemo(() => {
    return hkStaff.map((s) => {
      const assigned = tasks.filter((t) => t.assignedStaffId === s.id);
      const completedToday = assigned.filter(
        (t) => t.status === TaskStatus.Done,
      ).length;
      const pending = assigned.filter(
        (t) =>
          t.status === TaskStatus.Pending || t.status === TaskStatus.InProgress,
      ).length;
      return { staff: s, assigned: assigned.length, pending, completedToday };
    });
  }, [hkStaff, tasks]);

  function handleStatusUpdate(
    roomId: bigint,
    status: RoomStatus,
    staffId?: bigint,
  ) {
    const room = rooms.find((r) => r.id === roomId);
    if (!room) return;
    updateRoom({ ...room, status });
    if (staffId) {
      const relatedTasks = tasks.filter(
        (t) => t.roomId === roomId && t.status !== TaskStatus.Done,
      );
      for (const t of relatedTasks) {
        updateTask({ ...t, assignedStaffId: staffId });
      }
    }
    toast.success(
      `Room ${room.number} updated to ${ROOM_STATUS_STYLES[status].label}`,
    );
  }

  function handleAddTask(
    roomId: bigint,
    staffId: bigint | undefined,
    notes: string,
    priority: bigint,
  ) {
    const hotelId = rooms[0]?.hotelId ?? 1n;
    const newTask: HousekeepingTask = {
      id: BigInt(Date.now()),
      hotelId,
      roomId,
      assignedStaffId: staffId,
      status: TaskStatus.Pending,
      priority,
      notes,
      createdAt: BigInt(Date.now()),
      completedAt: undefined,
    };
    addTask(newTask);
    toast.success("Task added successfully");
  }

  function handleTaskProgress(task: HousekeepingTask) {
    if (task.status === TaskStatus.Pending) {
      updateTask({ ...task, status: TaskStatus.InProgress });
      toast.info("Task started");
    } else if (task.status === TaskStatus.InProgress) {
      updateTask({
        ...task,
        status: TaskStatus.Done,
        completedAt: BigInt(Date.now()),
      });
      toast.success("Task completed!");
    }
  }

  const FILTER_BUTTONS: { label: string; value: RoomStatus | "All" }[] = [
    { label: "All", value: "All" },
    { label: "Clean", value: RoomStatus.Clean },
    { label: "Dirty", value: RoomStatus.Dirty },
    { label: "Occupied", value: RoomStatus.Occupied },
    { label: "Out of Order", value: RoomStatus.OutOfOrder },
    { label: "Maintenance", value: RoomStatus.Maintenance },
  ];

  const statusCounts = useMemo(() => {
    const counts: Partial<Record<RoomStatus | "All", number>> = {
      All: rooms.length,
    };
    for (const r of rooms) {
      counts[r.status] = (counts[r.status] ?? 0) + 1;
    }
    return counts;
  }, [rooms]);

  return (
    <div className="space-y-8 pb-10">
      {/* ─── Section 1: Room Status Board ─────────────────────────────────── */}
      <section data-ocid="room_status.section">
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          {/* Section Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Room Status Board
              </h2>
              <AnimatePresence>
                {liveEnabled && (
                  <motion.span
                    key="live-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    data-ocid="room_status.live_badge"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Live
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-2">
              <Label
                htmlFor="live-toggle"
                className="text-sm text-muted-foreground cursor-pointer select-none"
              >
                Real-time Updates
              </Label>
              <Switch
                id="live-toggle"
                data-ocid="room_status.toggle"
                checked={liveEnabled}
                onCheckedChange={setLiveEnabled}
                className="data-[state=checked]:bg-emerald-500"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 px-6 py-3 bg-muted/20 border-b border-border">
            {FILTER_BUTTONS.map(({ label, value }) => {
              const count = statusCounts[value] ?? 0;
              const isActive = statusFilter === value;
              return (
                <button
                  type="button"
                  key={value}
                  data-ocid="room_status.filter.tab"
                  onClick={() => setStatusFilter(value)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150",
                    isActive
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                      : "bg-muted/30 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                      isActive
                        ? "bg-amber-500/30 text-amber-300"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Floor Groups */}
          <div className="p-6 space-y-6">
            {floorGroups.length === 0 ? (
              <div
                data-ocid="room_status.empty_state"
                className="text-center py-12 text-muted-foreground text-sm"
              >
                No rooms match the selected filter.
              </div>
            ) : (
              floorGroups.map(({ floor, rooms: floorRooms }) => (
                <div key={floor}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Floor {floor}
                    </span>
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground">
                      {floorRooms.length} rooms
                    </span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {floorRooms.map((room, i) => {
                      const assignedTask = tasks.find(
                        (t) =>
                          t.roomId === room.id && t.status !== TaskStatus.Done,
                      );
                      const assignedStaff = assignedTask?.assignedStaffId
                        ? staffMap.get(assignedTask.assignedStaffId)
                        : undefined;
                      return (
                        <RoomCard
                          key={room.id.toString()}
                          room={room}
                          assignedStaff={assignedStaff}
                          onClick={setSelectedRoom}
                          index={i}
                        />
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 px-6 py-3 border-t border-border bg-muted/10">
            {STATUS_ORDER.map((status) => (
              <div key={status} className="flex items-center gap-1.5">
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-sm border",
                    ROOM_STATUS_STYLES[status].card,
                  )}
                />
                <span className="text-[11px] text-muted-foreground">
                  {ROOM_STATUS_STYLES[status].label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 2: Task List ──────────────────────────────────────────── */}
      <section data-ocid="tasks.section">
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">
              Housekeeping Tasks
            </h2>
            <div className="flex items-center gap-3">
              <label
                htmlFor="show-completed-toggle"
                className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none"
              >
                <Switch
                  id="show-completed-toggle"
                  data-ocid="tasks.toggle"
                  checked={showCompleted}
                  onCheckedChange={setShowCompleted}
                  className="data-[state=checked]:bg-emerald-500 scale-90"
                />
                Show Completed
              </label>
              <Button
                size="sm"
                data-ocid="tasks.add_button"
                onClick={() => setShowAddTask(true)}
                className="bg-amber-500 hover:bg-amber-400 text-black font-medium gap-1.5 h-8"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Task
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  {[
                    "Room #",
                    "Floor",
                    "Current Status",
                    "Assigned Staff",
                    "Task Status",
                    "Created",
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
                {visibleTasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      data-ocid="tasks.empty_state"
                      className="text-center py-12 text-muted-foreground"
                    >
                      {showCompleted
                        ? "No tasks found."
                        : "No active tasks. All done!"}
                    </td>
                  </tr>
                ) : (
                  visibleTasks.map((task, i) => {
                    const room = roomMap.get(task.roomId);
                    const assignedStaff = task.assignedStaffId
                      ? staffMap.get(task.assignedStaffId)
                      : undefined;
                    return (
                      <motion.tr
                        key={task.id.toString()}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        data-ocid={`tasks.item.${i + 1}`}
                        className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-4 py-3 font-semibold text-foreground">
                          {room ? room.number : `#${task.roomId}`}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {room ? `Floor ${room.floor}` : "—"}
                        </td>
                        <td className="px-4 py-3">
                          {room ? <StatusBadge status={room.status} /> : "—"}
                        </td>
                        <td className="px-4 py-3">
                          {assignedStaff ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                                <User className="w-3 h-3 text-amber-400" />
                              </div>
                              <span className="text-foreground">
                                {assignedStaff.name}
                              </span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground italic text-xs">
                              Unassigned
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={task.status} />
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                          {formatDate(task.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          {task.status === TaskStatus.Pending && (
                            <Button
                              size="sm"
                              variant="outline"
                              data-ocid={`tasks.start_button.${i + 1}`}
                              onClick={() => handleTaskProgress(task)}
                              className="h-7 gap-1.5 text-xs border-sky-500/40 text-sky-400 hover:bg-sky-500/10 hover:text-sky-300"
                            >
                              <PlayCircle className="w-3 h-3" />
                              Start
                            </Button>
                          )}
                          {task.status === TaskStatus.InProgress && (
                            <Button
                              size="sm"
                              variant="outline"
                              data-ocid={`tasks.complete_button.${i + 1}`}
                              onClick={() => handleTaskProgress(task)}
                              className="h-7 gap-1.5 text-xs border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              Complete
                            </Button>
                          )}
                          {task.status === TaskStatus.Done && (
                            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Done
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Staff Summary ─────────────────────────────────────── */}
      <section data-ocid="staff_summary.section">
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">
              Staff Summary
            </h2>
          </div>
          <div className="p-6">
            {hkStaff.length === 0 ? (
              <p
                data-ocid="staff_summary.empty_state"
                className="text-center text-muted-foreground text-sm py-6"
              >
                No housekeeping staff found for this property.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {staffSummary.map(
                  ({ staff: s, assigned, pending, completedToday }, i) => (
                    <motion.div
                      key={s.id.toString()}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      data-ocid={`staff_summary.item.${i + 1}`}
                      className="bg-muted/30 border border-border rounded-lg p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {s.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Housekeeping
                        </p>
                        <div className="flex gap-3 mt-2">
                          <div className="text-center">
                            <p className="text-base font-bold text-foreground">
                              {pending}
                            </p>
                            <p className="text-[10px] text-muted-foreground leading-tight">
                              Active
                            </p>
                          </div>
                          <div className="w-px bg-border" />
                          <div className="text-center">
                            <p className="text-base font-bold text-emerald-400">
                              {completedToday}
                            </p>
                            <p className="text-[10px] text-muted-foreground leading-tight">
                              Done
                            </p>
                          </div>
                          <div className="w-px bg-border" />
                          <div className="text-center">
                            <p className="text-base font-bold text-muted-foreground">
                              {assigned}
                            </p>
                            <p className="text-[10px] text-muted-foreground leading-tight">
                              Total
                            </p>
                          </div>
                        </div>
                      </div>
                      {pending > 0 && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-amber-500/30 text-amber-400 bg-amber-500/10 px-1.5 py-0.5 shrink-0"
                        >
                          <Zap className="w-2.5 h-2.5 mr-0.5" />
                          {pending}
                        </Badge>
                      )}
                    </motion.div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Modals ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedRoom && (
          <StatusUpdateModal
            room={selectedRoom}
            hkStaff={hkStaff}
            onClose={() => setSelectedRoom(null)}
            onUpdate={handleStatusUpdate}
          />
        )}
        {showAddTask && (
          <AddTaskModal
            rooms={rooms}
            hkStaff={hkStaff}
            onClose={() => setShowAddTask(false)}
            onAdd={handleAddTask}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
