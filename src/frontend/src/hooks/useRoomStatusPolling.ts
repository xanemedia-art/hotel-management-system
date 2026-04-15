import { RoomStatus } from "@/backend";
import { useHotelStore } from "@/store/useHotelStore";
import type { Room } from "@/types/index";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

// Realistic one-step transitions per status
const VALID_TRANSITIONS: Partial<Record<RoomStatus, RoomStatus[]>> = {
  [RoomStatus.Dirty]: [RoomStatus.Maintenance, RoomStatus.Clean],
  [RoomStatus.Occupied]: [RoomStatus.Dirty],
  [RoomStatus.Clean]: [RoomStatus.Occupied],
  [RoomStatus.Maintenance]: [RoomStatus.OutOfOrder, RoomStatus.Clean],
  [RoomStatus.OutOfOrder]: [RoomStatus.Maintenance],
};

const STATUS_LABELS: Record<RoomStatus, string> = {
  [RoomStatus.Clean]: "Clean",
  [RoomStatus.Dirty]: "Dirty",
  [RoomStatus.Occupied]: "Occupied",
  [RoomStatus.OutOfOrder]: "Out of Order",
  [RoomStatus.Maintenance]: "Maintenance",
};

const STATUS_ICONS: Record<RoomStatus, string> = {
  [RoomStatus.Clean]: "✅",
  [RoomStatus.Dirty]: "🧹",
  [RoomStatus.Occupied]: "🛏️",
  [RoomStatus.OutOfOrder]: "⚠️",
  [RoomStatus.Maintenance]: "🔧",
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface UseRoomStatusPollingOptions {
  /** Polling interval in ms. Default: 6000 */
  intervalMs?: number;
  /** Pause polling when false. Default: true */
  enabled?: boolean;
}

/**
 * Simulates realistic real-time room status transitions.
 * Picks 1–2 rooms per interval tick and advances each through valid state transitions.
 * Shows a Sonner toast for each updated room.
 */
export function useRoomStatusPolling({
  intervalMs = 6000,
  enabled = true,
}: UseRoomStatusPollingOptions = {}) {
  const updateRoom = useHotelStore((s) => s.updateRoom);
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);

  // Keep a stable ref to the latest rooms so the interval callback never goes stale
  const roomsRef = useRef<Room[]>([]);

  // Subscribe to rooms reactively, store in ref so callback stays stable
  const allRooms = useHotelStore((s) => s.rooms);
  useEffect(() => {
    roomsRef.current = allRooms.filter((r) => r.hotelId === selectedHotelId);
  }, [allRooms, selectedHotelId]);

  const tick = useCallback(() => {
    const rooms = roomsRef.current;
    if (rooms.length === 0) return;

    // Only consider rooms that have valid transitions available
    const eligible = rooms.filter(
      (r) => (VALID_TRANSITIONS[r.status]?.length ?? 0) > 0,
    );
    if (eligible.length === 0) return;

    const count = Math.min(eligible.length, Math.floor(Math.random() * 2) + 1);
    const shuffled = [...eligible].sort(() => Math.random() - 0.5);
    const targets = shuffled.slice(0, count);

    for (const room of targets) {
      const transitions = VALID_TRANSITIONS[room.status];
      if (!transitions || transitions.length === 0) continue;
      const nextStatus = pickRandom(transitions);
      updateRoom({ ...room, status: nextStatus });
      toast.info(
        `${STATUS_ICONS[nextStatus]} Room ${room.number} → ${STATUS_LABELS[nextStatus]}`,
        {
          description: `Floor ${room.floor} · ${room.roomType}`,
          duration: 4000,
        },
      );
    }
  }, [updateRoom]);

  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [enabled, intervalMs, tick]);
}
