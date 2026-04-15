import { j as jsxRuntimeExports, a as cn, F as FolioStatus, E as StaffStatus, y as SyncStatus, T as TaskStatus, R as RoomStatus, B as BookingStatus } from "./index-CBcYPlz6.js";
const statusConfig = {
  // Booking
  [BookingStatus.Confirmed]: {
    label: "Confirmed",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
  },
  [BookingStatus.Cancelled]: {
    label: "Cancelled",
    classes: "bg-red-500/15 text-red-400 border-red-500/25"
  },
  [BookingStatus.NoShow]: {
    label: "No Show",
    classes: "bg-zinc-500/15 text-zinc-400 border-zinc-500/25"
  },
  [BookingStatus.CheckedIn]: {
    label: "Checked In",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/25"
  },
  [BookingStatus.CheckedOut]: {
    label: "Checked Out",
    classes: "bg-violet-500/15 text-violet-400 border-violet-500/25"
  },
  // Room
  [RoomStatus.Clean]: {
    label: "Clean",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
  },
  [RoomStatus.Dirty]: {
    label: "Dirty",
    classes: "bg-red-500/15 text-red-400 border-red-500/25"
  },
  [RoomStatus.Occupied]: {
    label: "Occupied",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/25"
  },
  [RoomStatus.OutOfOrder]: {
    label: "Out of Order",
    classes: "bg-orange-500/15 text-orange-400 border-orange-500/25"
  },
  [RoomStatus.Maintenance]: {
    label: "Maintenance",
    classes: "bg-purple-500/15 text-purple-400 border-purple-500/25"
  },
  // Task
  [TaskStatus.InProgress]: {
    label: "In Progress",
    classes: "bg-sky-500/15 text-sky-400 border-sky-500/25"
  },
  [TaskStatus.Done]: {
    label: "Done",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
  },
  // Pending shared across BookingStatus and TaskStatus — both are "Pending"
  Pending: {
    label: "Pending",
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/25"
  },
  // Sync
  [SyncStatus.Synced]: {
    label: "Synced",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
  },
  [SyncStatus.OutOfSync]: {
    label: "Out of Sync",
    classes: "bg-orange-500/15 text-orange-400 border-orange-500/25"
  },
  // Staff
  [StaffStatus.Active]: {
    label: "Active",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
  },
  [StaffStatus.Inactive]: {
    label: "Inactive",
    classes: "bg-zinc-500/15 text-zinc-400 border-zinc-500/25"
  },
  // Folio
  [FolioStatus.Open]: {
    label: "Open",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/25"
  },
  [FolioStatus.Settled]: {
    label: "Settled",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
  }
};
function StatusBadge({ status, className }) {
  const config = statusConfig[status] ?? {
    label: String(status),
    classes: "bg-muted text-muted-foreground border-border"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.classes,
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current opacity-80" }),
        config.label
      ]
    }
  );
}
export {
  StatusBadge as S
};
