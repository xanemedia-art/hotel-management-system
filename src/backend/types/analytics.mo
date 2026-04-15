import Common "common";

module {
  public type MonthlyOccupancy = {
    month : Nat; // 1-12
    year : Nat;
    occupancyPercent : Float;
    totalRooms : Nat;
    occupiedRooms : Nat;
  };

  public type MonthlyRevenue = {
    month : Nat;
    year : Nat;
    revenue : Float;
  };

  public type RevenueByRoomType = {
    roomType : Common.RoomType;
    revenue : Float;
    bookingCount : Nat;
  };

  public type AnalyticsData = {
    hotelId : Common.EntityId;
    occupancyByMonth : [MonthlyOccupancy];
    revenueByMonth : [MonthlyRevenue];
    revenueByRoomType : [RevenueByRoomType];
    totalRevenue : Float;
    adr : Float; // Average Daily Rate
    revpar : Float; // Revenue per Available Room
    overallOccupancyPercent : Float;
  };
};
