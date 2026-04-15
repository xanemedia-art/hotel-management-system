import Common "common";

module {
  public type Room = {
    id : Common.EntityId;
    hotelId : Common.EntityId;
    var number : Text;
    var floor : Nat;
    var roomType : Common.RoomType;
    var status : Common.RoomStatus;
    var pricePerNight : Float;
    var capacity : Nat;
    var amenities : [Text];
    var isActive : Bool;
  };

  public type RoomView = {
    id : Common.EntityId;
    hotelId : Common.EntityId;
    number : Text;
    floor : Nat;
    roomType : Common.RoomType;
    status : Common.RoomStatus;
    pricePerNight : Float;
    capacity : Nat;
    amenities : [Text];
    isActive : Bool;
  };

  public type CreateRoomArgs = {
    hotelId : Common.EntityId;
    number : Text;
    floor : Nat;
    roomType : Common.RoomType;
    pricePerNight : Float;
    capacity : Nat;
    amenities : [Text];
  };

  public type UpdateRoomArgs = {
    id : Common.EntityId;
    number : Text;
    floor : Nat;
    roomType : Common.RoomType;
    status : Common.RoomStatus;
    pricePerNight : Float;
    capacity : Nat;
    amenities : [Text];
    isActive : Bool;
  };
};
