import List "mo:core/List";
import Common "../types/common";
import Types "../types/staff";

module {
  public func toView(s : Types.Staff) : Types.StaffView {
    {
      id = s.id;
      hotelId = s.hotelId;
      name = s.name;
      role = s.role;
      email = s.email;
      phone = s.phone;
      status = s.status;
    };
  };

  public func create(nextId : Nat, args : Types.CreateStaffArgs) : Types.Staff {
    {
      id = nextId;
      hotelId = args.hotelId;
      var name = args.name;
      var role = args.role;
      var email = args.email;
      var phone = args.phone;
      var status = #Active;
    };
  };

  public func getAll(staff : List.List<Types.Staff>) : [Types.StaffView] {
    staff.map<Types.Staff, Types.StaffView>(toView).toArray();
  };

  public func getById(staff : List.List<Types.Staff>, id : Common.EntityId) : ?Types.StaffView {
    switch (staff.find(func(s : Types.Staff) : Bool { s.id == id })) {
      case (?s) ?toView(s);
      case null null;
    };
  };

  public func getByHotel(staff : List.List<Types.Staff>, hotelId : Common.EntityId) : [Types.StaffView] {
    staff.filter(func(s : Types.Staff) : Bool { s.hotelId == hotelId })
      .map<Types.Staff, Types.StaffView>(toView).toArray();
  };

  public func update(staff : List.List<Types.Staff>, args : Types.UpdateStaffArgs) : Bool {
    switch (staff.find(func(s : Types.Staff) : Bool { s.id == args.id })) {
      case null false;
      case (?s) {
        s.name := args.name;
        s.role := args.role;
        s.email := args.email;
        s.phone := args.phone;
        s.status := args.status;
        true;
      };
    };
  };

  public func delete(staff : List.List<Types.Staff>, id : Common.EntityId) : Bool {
    let before = staff.size();
    let kept = staff.filter(func(s : Types.Staff) : Bool { s.id != id });
    staff.clear();
    staff.addAll(kept.values());
    staff.size() < before;
  };
};
