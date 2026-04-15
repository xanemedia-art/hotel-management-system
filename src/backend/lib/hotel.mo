import List "mo:core/List";
import Types "../types/hotel";
import Common "../types/common";

module {
  public func toView(h : Types.Hotel) : Types.HotelView {
    {
      id = h.id;
      name = h.name;
      address = h.address;
      city = h.city;
      phone = h.phone;
      email = h.email;
      checkInTime = h.checkInTime;
      checkOutTime = h.checkOutTime;
      currency = h.currency;
      totalRooms = h.totalRooms;
    };
  };

  public func create(nextId : Nat, args : Types.CreateHotelArgs) : Types.Hotel {
    {
      id = nextId;
      var name = args.name;
      var address = args.address;
      var city = args.city;
      var phone = args.phone;
      var email = args.email;
      var checkInTime = args.checkInTime;
      var checkOutTime = args.checkOutTime;
      var currency = args.currency;
      var totalRooms = args.totalRooms;
    };
  };

  public func getAll(hotels : List.List<Types.Hotel>) : [Types.HotelView] {
    hotels.map<Types.Hotel, Types.HotelView>(toView).toArray();
  };

  public func getById(hotels : List.List<Types.Hotel>, id : Common.EntityId) : ?Types.HotelView {
    switch (hotels.find(func(h : Types.Hotel) : Bool { h.id == id })) {
      case (?h) ?toView(h);
      case null null;
    };
  };

  public func update(hotels : List.List<Types.Hotel>, args : Types.UpdateHotelArgs) : Bool {
    switch (hotels.find(func(h : Types.Hotel) : Bool { h.id == args.id })) {
      case null false;
      case (?h) {
        h.name := args.name;
        h.address := args.address;
        h.city := args.city;
        h.phone := args.phone;
        h.email := args.email;
        h.checkInTime := args.checkInTime;
        h.checkOutTime := args.checkOutTime;
        h.currency := args.currency;
        h.totalRooms := args.totalRooms;
        true;
      };
    };
  };

  public func delete(hotels : List.List<Types.Hotel>, id : Common.EntityId) : Bool {
    let before = hotels.size();
    let kept = hotels.filter(func(h : Types.Hotel) : Bool { h.id != id });
    hotels.clear();
    hotels.addAll(kept.values());
    hotels.size() < before;
  };
};
