import {
  BookingStatus,
  FolioStatus,
  RoomStatus,
  StaffStatus,
  SyncStatus,
  TaskStatus,
} from "@/backend";
import { cn } from "@/lib/utils";

type StatusValue =
  | BookingStatus
  | RoomStatus
  | TaskStatus
  | SyncStatus
  | StaffStatus
  | FolioStatus
  | string;

interface StatusBadgeProps {
  status: StatusValue;
  className?: string;
}

// Each unique string value from all enums
const statusConfig: Record<string, { label: string; classes: string }> = {
  // Booking
  [BookingStatus.Confirmed]: {
    label: "Confirmed",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  },
  [BookingStatus.Cancelled]: {
    label: "Cancelled",
    classes: "bg-red-500/15 text-red-400 border-red-500/25",
  },
  [BookingStatus.NoShow]: {
    label: "No Show",
    classes: "bg-zinc-500/15 text-zinc-400 border-zinc-500/25",
  },
  [BookingStatus.CheckedIn]: {
    label: "Checked In",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  },
  [BookingStatus.CheckedOut]: {
    label: "Checked Out",
    classes: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  },
  // Room
  [RoomStatus.Clean]: {
    label: "Clean",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  },
  [RoomStatus.Dirty]: {
    label: "Dirty",
    classes: "bg-red-500/15 text-red-400 border-red-500/25",
  },
  [RoomStatus.Occupied]: {
    label: "Occupied",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  },
  [RoomStatus.OutOfOrder]: {
    label: "Out of Order",
    classes: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  },
  [RoomStatus.Maintenance]: {
    label: "Maintenance",
    classes: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  },
  // Task
  [TaskStatus.InProgress]: {
    label: "In Progress",
    classes: "bg-sky-500/15 text-sky-400 border-sky-500/25",
  },
  [TaskStatus.Done]: {
    label: "Done",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  },
  // Pending shared across BookingStatus and TaskStatus — both are "Pending"
  Pending: {
    label: "Pending",
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  },
  // Sync
  [SyncStatus.Synced]: {
    label: "Synced",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  },
  [SyncStatus.OutOfSync]: {
    label: "Out of Sync",
    classes: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  },
  // Staff
  [StaffStatus.Active]: {
    label: "Active",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  },
  [StaffStatus.Inactive]: {
    label: "Inactive",
    classes: "bg-zinc-500/15 text-zinc-400 border-zinc-500/25",
  },
  // Folio
  [FolioStatus.Open]: {
    label: "Open",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  },
  [FolioStatus.Settled]: {
    label: "Settled",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status as string] ?? {
    label: String(status),
    classes: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.classes,
        className,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {config.label}
    </span>
  );
}
