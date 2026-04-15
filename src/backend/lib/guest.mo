import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/guest";

module {
  public func toView(g : Types.Guest) : Types.GuestView {
    {
      id = g.id;
      name = g.name;
      email = g.email;
      phone = g.phone;
      address = g.address;
      country = g.country;
      tags = g.tags;
      loyaltyPoints = g.loyaltyPoints;
      notes = g.notes;
      preferences = g.preferences;
      createdAt = g.createdAt;
    };
  };

  public func create(nextId : Nat, args : Types.CreateGuestArgs) : Types.Guest {
    {
      id = nextId;
      var name = args.name;
      var email = args.email;
      var phone = args.phone;
      var address = args.address;
      var country = args.country;
      var tags = args.tags;
      var loyaltyPoints = 0;
      var notes = args.notes;
      var preferences = args.preferences;
      createdAt = Time.now();
    };
  };

  public func getAll(guests : List.List<Types.Guest>) : [Types.GuestView] {
    guests.map<Types.Guest, Types.GuestView>(toView).toArray();
  };

  public func getById(guests : List.List<Types.Guest>, id : Common.EntityId) : ?Types.GuestView {
    switch (guests.find(func(g : Types.Guest) : Bool { g.id == id })) {
      case (?g) ?toView(g);
      case null null;
    };
  };

  public func search(guests : List.List<Types.Guest>, term : Text) : [Types.GuestView] {
    let lower = term.toLower();
    guests.filter(func(g : Types.Guest) : Bool {
      g.name.toLower().contains(#text lower) or
      g.email.toLower().contains(#text lower) or
      g.phone.contains(#text term)
    }).map<Types.Guest, Types.GuestView>(toView).toArray();
  };

  public func update(guests : List.List<Types.Guest>, args : Types.UpdateGuestArgs) : Bool {
    switch (guests.find(func(g : Types.Guest) : Bool { g.id == args.id })) {
      case null false;
      case (?g) {
        g.name := args.name;
        g.email := args.email;
        g.phone := args.phone;
        g.address := args.address;
        g.country := args.country;
        g.tags := args.tags;
        g.loyaltyPoints := args.loyaltyPoints;
        g.notes := args.notes;
        g.preferences := args.preferences;
        true;
      };
    };
  };

  public func delete(guests : List.List<Types.Guest>, id : Common.EntityId) : Bool {
    let before = guests.size();
    let kept = guests.filter(func(g : Types.Guest) : Bool { g.id != id });
    guests.clear();
    guests.addAll(kept.values());
    guests.size() < before;
  };
};
