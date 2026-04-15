import List "mo:core/List";
import HotelTypes "../types/hotel";
import Common "../types/common";
import HotelLib "../lib/hotel";

mixin (
  hotels : List.List<HotelTypes.Hotel>,
  idCounter : Common.Counter,
) {
  public query func getHotels() : async [HotelTypes.HotelView] {
    HotelLib.getAll(hotels);
  };

  public query func getHotel(id : Common.EntityId) : async ?HotelTypes.HotelView {
    HotelLib.getById(hotels, id);
  };

  public func createHotel(args : HotelTypes.CreateHotelArgs) : async HotelTypes.HotelView {
    let hotel = HotelLib.create(idCounter.value, args);
    idCounter.value += 1;
    hotels.add(hotel);
    HotelLib.toView(hotel);
  };

  public func updateHotel(args : HotelTypes.UpdateHotelArgs) : async Bool {
    HotelLib.update(hotels, args);
  };

  public func deleteHotel(id : Common.EntityId) : async Bool {
    HotelLib.delete(hotels, id);
  };
};
