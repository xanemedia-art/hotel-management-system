import List "mo:core/List";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Common "../types/common";
import BookingTypes "../types/booking";
import RoomTypes "../types/room";
import AnalyticsTypes "../types/analytics";

module {
  // nanoseconds per day
  let NS_PER_DAY : Int = 86_400_000_000_000;

  func nightsBetween(checkIn : Common.Timestamp, checkOut : Common.Timestamp) : Float {
    let diff = checkOut - checkIn;
    if (diff <= 0) return 0.0;
    Int.abs(diff).toFloat() / NS_PER_DAY.toFloat();
  };

  func timestampToYearMonth(ts : Common.Timestamp) : (Nat, Nat) {
    // Approximate: seconds since epoch / (days per month * seconds per day)
    let secs = Int.abs(ts) / 1_000_000_000;
    let days = secs / 86400;
    // epoch = Jan 1 1970
    let year400 = days / 146097;
    var rem = days - year400 * 146097;
    let year100 = Nat.min(rem / 36524, 3);
    rem -= year100 * 36524;
    let year4 = rem / 1461;
    rem -= year4 * 1461;
    let year1 = Nat.min(rem / 365, 3);
    rem -= year1 * 365;
    let year = year400 * 400 + year100 * 100 + year4 * 4 + year1 + 1970;
    // Month from day of year
    let leapYear = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0);
    let monthDays : [Nat] = if (leapYear)
      [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    else
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month = 1;
    var remaining = rem;
    label monthLoop for (md in monthDays.values()) {
      if (remaining < md) break monthLoop;
      remaining -= md;
      month += 1;
    };
    (year, month);
  };

  public func compute(
    hotelId : Common.EntityId,
    bookings : List.List<BookingTypes.Booking>,
    rooms : List.List<RoomTypes.Room>,
    fromMonth : Nat,
    fromYear : Nat,
    toMonth : Nat,
    toYear : Nat,
  ) : AnalyticsTypes.AnalyticsData {
    let hotelRooms = rooms.filter(func(r : RoomTypes.Room) : Bool {
      r.hotelId == hotelId and r.isActive
    });
    let totalRoomCount = hotelRooms.size();

    let hotelBookings = bookings.filter(func(b : BookingTypes.Booking) : Bool {
      b.hotelId == hotelId and
      b.status != #Cancelled and b.status != #NoShow
    });

    // Build month range
    var months : List.List<(Nat, Nat)> = List.empty();
    var y = fromYear;
    var m = fromMonth;
    label rangeLoop loop {
      months.add((y, m));
      if (y == toYear and m == toMonth) break rangeLoop;
      m += 1;
      if (m > 12) { m := 1; y += 1 };
    };

    // Occupancy by month
    let occupancyByMonth = months.map<(Nat, Nat), AnalyticsTypes.MonthlyOccupancy>(
      func((yr, mo)) {
        let occupied = hotelBookings.filter(func(b : BookingTypes.Booking) : Bool {
          let (by, bm) = timestampToYearMonth(b.checkIn);
          by == yr and bm == mo
        }).size();
        let pct = if (totalRoomCount == 0) 0.0
          else occupied.toFloat() / totalRoomCount.toFloat() * 100.0;
        { month = mo; year = yr; occupancyPercent = pct; totalRooms = totalRoomCount; occupiedRooms = occupied };
      }
    ).toArray();

    // Revenue by month
    let revenueByMonth = months.map<(Nat, Nat), AnalyticsTypes.MonthlyRevenue>(
      func((yr, mo)) {
        let rev = hotelBookings.foldLeft(0.0 : Float, func(acc : Float, b : BookingTypes.Booking) : Float {
          let (by, bm) = timestampToYearMonth(b.checkIn);
          if (by == yr and bm == mo) {
            let room = rooms.find(func(r : RoomTypes.Room) : Bool { r.id == b.roomId });
            let price = switch room { case (?r) r.pricePerNight; case null 0.0 };
            let nights = nightsBetween(b.checkIn, b.checkOut);
            acc + price * nights;
          } else acc;
        });
        { month = mo; year = yr; revenue = rev };
      }
    ).toArray();

    // Revenue by room type
    let roomTypes : [Common.RoomType] = [#Standard, #Deluxe, #Suite, #Presidential];
    let revenueByRoomType = roomTypes.map(
      func(rt : Common.RoomType) : AnalyticsTypes.RevenueByRoomType {
        var rev = 0.0;
        var count = 0;
        hotelBookings.forEach(func(b : BookingTypes.Booking) {
          let room = rooms.find(func(r : RoomTypes.Room) : Bool {
            r.id == b.roomId and r.roomType == rt
          });
          switch room {
            case (?r) {
              rev += r.pricePerNight * nightsBetween(b.checkIn, b.checkOut);
              count += 1;
            };
            case null {};
          };
        });
        { roomType = rt; revenue = rev; bookingCount = count };
      }
    );

    let totalRevenue = revenueByMonth.foldLeft(0.0 : Float, func(acc : Float, entry : AnalyticsTypes.MonthlyRevenue) : Float { acc + entry.revenue });
    let totalOccupied = hotelBookings.size();
    let totalDays = months.size() * (if (totalRoomCount > 0) totalRoomCount else 1);
    let overallOcc = if (totalDays == 0) 0.0
      else totalOccupied.toFloat() / totalDays.toFloat() * 100.0;

    // ADR = total revenue / total bookings
    let adr = if (totalOccupied == 0) 0.0
      else totalRevenue / totalOccupied.toFloat();

    // RevPAR = total revenue / (total rooms * days in range)
    let totalRoomNights = totalRoomCount * (months.size() * 30);
    let revpar = if (totalRoomNights == 0) 0.0
      else totalRevenue / totalRoomNights.toFloat();

    {
      hotelId;
      occupancyByMonth;
      revenueByMonth;
      revenueByRoomType;
      totalRevenue;
      adr;
      revpar;
      overallOccupancyPercent = overallOcc;
    };
  };
};
