import Common "common";

module {
  public type Hotel = {
    id : Common.EntityId;
    var name : Text;
    var address : Text;
    var city : Text;
    var phone : Text;
    var email : Text;
    var checkInTime : Text;
    var checkOutTime : Text;
    var currency : Text;
    var totalRooms : Nat;
  };

  public type HotelView = {
    id : Common.EntityId;
    name : Text;
    address : Text;
    city : Text;
    phone : Text;
    email : Text;
    checkInTime : Text;
    checkOutTime : Text;
    currency : Text;
    totalRooms : Nat;
  };

  public type CreateHotelArgs = {
    name : Text;
    address : Text;
    city : Text;
    phone : Text;
    email : Text;
    checkInTime : Text;
    checkOutTime : Text;
    currency : Text;
    totalRooms : Nat;
  };

  public type UpdateHotelArgs = {
    id : Common.EntityId;
    name : Text;
    address : Text;
    city : Text;
    phone : Text;
    email : Text;
    checkInTime : Text;
    checkOutTime : Text;
    currency : Text;
    totalRooms : Nat;
  };
};
