import List "mo:core/List";
import StaffTypes "../types/staff";
import Common "../types/common";
import StaffLib "../lib/staff";

mixin (
  staff : List.List<StaffTypes.Staff>,
  idCounter : Common.Counter,
) {
  public query func getStaff() : async [StaffTypes.StaffView] {
    StaffLib.getAll(staff);
  };

  public query func getStaffMember(id : Common.EntityId) : async ?StaffTypes.StaffView {
    StaffLib.getById(staff, id);
  };

  public query func getStaffByHotel(hotelId : Common.EntityId) : async [StaffTypes.StaffView] {
    StaffLib.getByHotel(staff, hotelId);
  };

  public func createStaff(args : StaffTypes.CreateStaffArgs) : async StaffTypes.StaffView {
    let member = StaffLib.create(idCounter.value, args);
    idCounter.value += 1;
    staff.add(member);
    StaffLib.toView(member);
  };

  public func updateStaff(args : StaffTypes.UpdateStaffArgs) : async Bool {
    StaffLib.update(staff, args);
  };

  public func deleteStaff(id : Common.EntityId) : async Bool {
    StaffLib.delete(staff, id);
  };
};
