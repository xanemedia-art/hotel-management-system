import List "mo:core/List";
import Common "../types/common";
import Types "../types/room";

module {
  public func toView(r : Types.Room) : Types.RoomView {
    {
      id = r.id;
      hotelId = r.hotelId;
      number = r.number;
      floor = r.floor;
      roomType = r.roomType;
      status = r.status;
      pricePerNight = r.pricePerNight;
      capacity = r.capacity;
      amenities = r.amenities;
      isActive = r.isActive;
    };
  };

  public func create(nextId : Nat, args : Types.CreateRoomArgs) : Types.Room {
    {
      id = nextId;
      hotelId = args.hotelId;
      var number = args.number;
      var floor = args.floor;
      var roomType = args.roomType;
      var status = #Clean;
      var pricePerNight = args.pricePerNight;
      var capacity = args.capacity;
      var amenities = args.amenities;
      var isActive = true;
    };
  };

  public func getAll(rooms : List.List<Types.Room>) : [Types.RoomView] {
    rooms.map<Types.Room, Types.RoomView>(toView).toArray();
  };

  public func getById(rooms : List.List<Types.Room>, id : Common.EntityId) : ?Types.RoomView {
    switch (rooms.find(func(r : Types.Room) : Bool { r.id == id })) {
      case (?r) ?toView(r);
      case null null;
    };
  };

  public func getByHotel(rooms : List.List<Types.Room>, hotelId : Common.EntityId) : [Types.RoomView] {
    rooms.filter(func(r : Types.Room) : Bool { r.hotelId == hotelId })
      .map<Types.Room, Types.RoomView>(toView).toArray();
  };

  public func update(rooms : List.List<Types.Room>, args : Types.UpdateRoomArgs) : Bool {
    switch (rooms.find(func(r : Types.Room) : Bool { r.id == args.id })) {
      case null false;
      case (?r) {
        r.number := args.number;
        r.floor := args.floor;
        r.roomType := args.roomType;
        r.status := args.status;
        r.pricePerNight := args.pricePerNight;
        r.capacity := args.capacity;
        r.amenities := args.amenities;
        r.isActive := args.isActive;
        true;
      };
    };
  };

  public func updateStatus(rooms : List.List<Types.Room>, id : Common.EntityId, status : Common.RoomStatus) : Bool {
    switch (rooms.find(func(r : Types.Room) : Bool { r.id == id })) {
      case null false;
      case (?r) { r.status := status; true };
    };
  };

  public func delete(rooms : List.List<Types.Room>, id : Common.EntityId) : Bool {
    let before = rooms.size();
    let kept = rooms.filter(func(r : Types.Room) : Bool { r.id != id });
    rooms.clear();
    rooms.addAll(kept.values());
    rooms.size() < before;
  };
};
