import { u as useHotelStore, r as reactExports, R as RoomStatus, f as ue } from "./index-CBcYPlz6.js";
const VALID_TRANSITIONS = {
  [RoomStatus.Dirty]: [RoomStatus.Maintenance, RoomStatus.Clean],
  [RoomStatus.Occupied]: [RoomStatus.Dirty],
  [RoomStatus.Clean]: [RoomStatus.Occupied],
  [RoomStatus.Maintenance]: [RoomStatus.OutOfOrder, RoomStatus.Clean],
  [RoomStatus.OutOfOrder]: [RoomStatus.Maintenance]
};
const STATUS_LABELS = {
  [RoomStatus.Clean]: "Clean",
  [RoomStatus.Dirty]: "Dirty",
  [RoomStatus.Occupied]: "Occupied",
  [RoomStatus.OutOfOrder]: "Out of Order",
  [RoomStatus.Maintenance]: "Maintenance"
};
const STATUS_ICONS = {
  [RoomStatus.Clean]: "✅",
  [RoomStatus.Dirty]: "🧹",
  [RoomStatus.Occupied]: "🛏️",
  [RoomStatus.OutOfOrder]: "⚠️",
  [RoomStatus.Maintenance]: "🔧"
};
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function useRoomStatusPolling({
  intervalMs = 6e3,
  enabled = true
} = {}) {
  const updateRoom = useHotelStore((s) => s.updateRoom);
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const roomsRef = reactExports.useRef([]);
  const allRooms = useHotelStore((s) => s.rooms);
  reactExports.useEffect(() => {
    roomsRef.current = allRooms.filter((r) => r.hotelId === selectedHotelId);
  }, [allRooms, selectedHotelId]);
  const tick = reactExports.useCallback(() => {
    const rooms = roomsRef.current;
    if (rooms.length === 0) return;
    const eligible = rooms.filter(
      (r) => {
        var _a;
        return (((_a = VALID_TRANSITIONS[r.status]) == null ? void 0 : _a.length) ?? 0) > 0;
      }
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
      ue.info(
        `${STATUS_ICONS[nextStatus]} Room ${room.number} → ${STATUS_LABELS[nextStatus]}`,
        {
          description: `Floor ${room.floor} · ${room.roomType}`,
          duration: 4e3
        }
      );
    }
  }, [updateRoom]);
  reactExports.useEffect(() => {
    if (!enabled) return;
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [enabled, intervalMs, tick]);
}
export {
  useRoomStatusPolling as u
};
