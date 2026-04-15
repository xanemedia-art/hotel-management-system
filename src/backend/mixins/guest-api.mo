import List "mo:core/List";
import GuestTypes "../types/guest";
import Common "../types/common";
import GuestLib "../lib/guest";

mixin (
  guests : List.List<GuestTypes.Guest>,
  idCounter : Common.Counter,
) {
  public query func getGuests() : async [GuestTypes.GuestView] {
    GuestLib.getAll(guests);
  };

  public query func getGuest(id : Common.EntityId) : async ?GuestTypes.GuestView {
    GuestLib.getById(guests, id);
  };

  public query func searchGuests(term : Text) : async [GuestTypes.GuestView] {
    GuestLib.search(guests, term);
  };

  public func createGuest(args : GuestTypes.CreateGuestArgs) : async GuestTypes.GuestView {
    let guest = GuestLib.create(idCounter.value, args);
    idCounter.value += 1;
    guests.add(guest);
    GuestLib.toView(guest);
  };

  public func updateGuest(args : GuestTypes.UpdateGuestArgs) : async Bool {
    GuestLib.update(guests, args);
  };

  public func deleteGuest(id : Common.EntityId) : async Bool {
    GuestLib.delete(guests, id);
  };
};
