import List "mo:core/List";
import RoomTypes "../types/room";
import Common "../types/common";
import RoomLib "../lib/room";

mixin (
  rooms : List.List<RoomTypes.Room>,
  idCounter : Common.Counter,
) {
  public query func getRooms() : async [RoomTypes.RoomView] {
    RoomLib.getAll(rooms);
  };

  public query func getRoom(id : Common.EntityId) : async ?RoomTypes.RoomView {
    RoomLib.getById(rooms, id);
  };

  public query func getRoomsByHotel(hotelId : Common.EntityId) : async [RoomTypes.RoomView] {
    RoomLib.getByHotel(rooms, hotelId);
  };

  public func createRoom(args : RoomTypes.CreateRoomArgs) : async RoomTypes.RoomView {
    let room = RoomLib.create(idCounter.value, args);
    idCounter.value += 1;
    rooms.add(room);
    RoomLib.toView(room);
  };

  public func updateRoom(args : RoomTypes.UpdateRoomArgs) : async Bool {
    RoomLib.update(rooms, args);
  };

  public func updateRoomStatus(id : Common.EntityId, status : Common.RoomStatus) : async Bool {
    RoomLib.updateStatus(rooms, id, status);
  };

  public func deleteRoom(id : Common.EntityId) : async Bool {
    RoomLib.delete(rooms, id);
  };
};
