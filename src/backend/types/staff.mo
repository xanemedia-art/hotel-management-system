import Common "common";

module {
  public type Staff = {
    id : Common.EntityId;
    hotelId : Common.EntityId;
    var name : Text;
    var role : Common.StaffRole;
    var email : Text;
    var phone : Text;
    var status : Common.StaffStatus;
  };

  public type StaffView = {
    id : Common.EntityId;
    hotelId : Common.EntityId;
    name : Text;
    role : Common.StaffRole;
    email : Text;
    phone : Text;
    status : Common.StaffStatus;
  };

  public type CreateStaffArgs = {
    hotelId : Common.EntityId;
    name : Text;
    role : Common.StaffRole;
    email : Text;
    phone : Text;
  };

  public type UpdateStaffArgs = {
    id : Common.EntityId;
    name : Text;
    role : Common.StaffRole;
    email : Text;
    phone : Text;
    status : Common.StaffStatus;
  };
};
