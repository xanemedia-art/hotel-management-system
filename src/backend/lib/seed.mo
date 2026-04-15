import List "mo:core/List";
import Time "mo:core/Time";
import HotelTypes "../types/hotel";
import RoomTypes "../types/room";
import GuestTypes "../types/guest";
import BookingTypes "../types/booking";
import StaffTypes "../types/staff";
import HousekeepingTypes "../types/housekeeping";
import BillingTypes "../types/billing";
import ChannelTypes "../types/channel";
import Common "../types/common";

module {
  let NS_PER_DAY : Int = 86_400_000_000_000;

  func daysAgo(n : Int) : Common.Timestamp {
    Time.now() - n * NS_PER_DAY;
  };

  func roomCapacity(rt : Common.RoomType) : Nat {
    switch rt {
      case (#Standard) 2;
      case (#Deluxe) 2;
      case (#Suite) 4;
      case (#Presidential) 6;
    };
  };

  func roomAmenities(rt : Common.RoomType) : [Text] {
    switch rt {
      case (#Standard) ["WiFi", "AC", "TV"];
      case (#Deluxe) ["WiFi", "AC", "TV", "Mini Bar", "City View"];
      case (#Suite) ["WiFi", "AC", "TV", "Mini Bar", "Sea View", "Jacuzzi", "Living Room"];
      case (#Presidential) ["WiFi", "AC", "TV", "Mini Bar", "Panoramic View", "Jacuzzi", "Butler Service", "Private Pool"];
    };
  };

  func beachCapacity(rt : Common.RoomType) : Nat {
    switch rt {
      case (#Standard) 2;
      case (#Deluxe) 3;
      case (#Suite) 5;
      case (#Presidential) 6;
    };
  };

  func beachAmenities(rt : Common.RoomType) : [Text] {
    switch rt {
      case (#Standard) ["WiFi", "AC", "TV", "Beach Access"];
      case (#Deluxe) ["WiFi", "AC", "TV", "Beach View", "Mini Bar"];
      case (#Suite) ["WiFi", "AC", "TV", "Private Balcony", "Beach View", "Jacuzzi"];
      case (#Presidential) ["WiFi", "AC", "TV", "Private Beach", "Pool", "Butler", "Jacuzzi"];
    };
  };

  func mountainCapacity(rt : Common.RoomType) : Nat {
    switch rt {
      case (#Standard) 2;
      case (#Deluxe) 2;
      case (#Suite) 4;
      case (#Presidential) 6;
    };
  };

  func mountainAmenities(rt : Common.RoomType) : [Text] {
    switch rt {
      case (#Standard) ["WiFi", "Heater", "TV", "Mountain View"];
      case (#Deluxe) ["WiFi", "Heater", "TV", "Valley View", "Mini Bar", "Fireplace"];
      case (#Suite) ["WiFi", "Heater", "TV", "Panoramic View", "Fireplace", "Private Terrace"];
      case (#Presidential) ["WiFi", "Heater", "TV", "360 View", "Fireplace", "Hot Tub", "Butler Service"];
    };
  };

  func addRoom(
    rooms : List.List<RoomTypes.Room>,
    roomId : Nat,
    hotelId : Nat,
    num : Text,
    floorNum : Nat,
    rt : Common.RoomType,
    price : Float,
    roomStatus : Common.RoomStatus,
  ) {
    rooms.add({
      id = roomId;
      hotelId = hotelId;
      var number = num;
      var floor = floorNum;
      var roomType = rt;
      var status = roomStatus;
      var pricePerNight = price;
      var capacity = roomCapacity(rt);
      var amenities = roomAmenities(rt);
      var isActive = true;
    });
  };

  func addRoomBeach(
    rooms : List.List<RoomTypes.Room>,
    roomId : Nat,
    hotelId : Nat,
    num : Text,
    floorNum : Nat,
    rt : Common.RoomType,
    price : Float,
    roomStatus : Common.RoomStatus,
  ) {
    rooms.add({
      id = roomId;
      hotelId = hotelId;
      var number = num;
      var floor = floorNum;
      var roomType = rt;
      var status = roomStatus;
      var pricePerNight = price;
      var capacity = beachCapacity(rt);
      var amenities = beachAmenities(rt);
      var isActive = true;
    });
  };

  func addRoomMountain(
    rooms : List.List<RoomTypes.Room>,
    roomId : Nat,
    hotelId : Nat,
    num : Text,
    floorNum : Nat,
    rt : Common.RoomType,
    price : Float,
    roomStatus : Common.RoomStatus,
  ) {
    rooms.add({
      id = roomId;
      hotelId = hotelId;
      var number = num;
      var floor = floorNum;
      var roomType = rt;
      var status = roomStatus;
      var pricePerNight = price;
      var capacity = mountainCapacity(rt);
      var amenities = mountainAmenities(rt);
      var isActive = true;
    });
  };

  func addBooking(
    bookings : List.List<BookingTypes.Booking>,
    guests : List.List<GuestTypes.Guest>,
    bId : Nat,
    hotelId : Nat,
    guestId : Nat,
    roomId : Nat,
    ciDaysOffset : Int,
    coDaysOffset : Int,
    numG : Nat,
    src : Common.BookingSource,
    bookingStatus : Common.BookingStatus,
  ) {
    let cIn = daysAgo(ciDaysOffset);
    let cOut = daysAgo(coDaysOffset);
    let gName = switch (guests.find(func (g : GuestTypes.Guest) : Bool { g.id == guestId })) {
      case (?g) g.name;
      case null "Guest";
    };
    let actualCIn : ?Common.Timestamp = switch bookingStatus {
      case (#CheckedIn) ?cIn;
      case (#CheckedOut) ?cIn;
      case _ null;
    };
    let actualCOut : ?Common.Timestamp = switch bookingStatus {
      case (#CheckedOut) ?cOut;
      case _ null;
    };
    bookings.add({
      id = bId;
      hotelId = hotelId;
      guestId = guestId;
      var roomId = roomId;
      var guestName = gName;
      var guestPhone = "";
      var guestEmail = "";
      var checkIn = cIn;
      var checkOut = cOut;
      var numGuests = numG;
      var source = src;
      var status = bookingStatus;
      var earlyCheckIn = false;
      var lateCheckOut = false;
      var notes = "";
      createdAt = daysAgo(30);
      var actualCheckIn = actualCIn;
      var actualCheckOut = actualCOut;
    });
  };

  func addGuest(
    guests : List.List<GuestTypes.Guest>,
    gId : Nat,
    name : Text,
    email : Text,
    phone : Text,
    country : Text,
    tags : [Common.GuestTag],
    loyaltyPoints : Nat,
    notes : Text,
    preferences : Text,
    createdDaysAgo : Int,
  ) {
    guests.add({
      id = gId;
      var name = name;
      var email = email;
      var phone = phone;
      var address = "";
      var country = country;
      var tags = tags;
      var loyaltyPoints = loyaltyPoints;
      var notes = notes;
      var preferences = preferences;
      createdAt = daysAgo(createdDaysAgo);
    });
  };

  func addStaff(
    staff : List.List<StaffTypes.Staff>,
    sId : Nat,
    hotelId : Nat,
    name : Text,
    role : Common.StaffRole,
    email : Text,
    phone : Text,
  ) {
    staff.add({
      id = sId;
      hotelId = hotelId;
      var name = name;
      var role = role;
      var email = email;
      var phone = phone;
      var status = (#Active : Common.StaffStatus);
    });
  };

  func addTask(
    tasks : List.List<HousekeepingTypes.HousekeepingTask>,
    tId : Nat,
    hotelId : Nat,
    roomId : Nat,
    assignedStaffId : ?Common.EntityId,
    status : Common.TaskStatus,
    priority : Nat,
    createdDaysAgo : Int,
    completedAt : ?Common.Timestamp,
    notes : Text,
  ) {
    tasks.add({
      id = tId;
      hotelId = hotelId;
      var roomId = roomId;
      var assignedStaffId = assignedStaffId;
      var status = status;
      var priority = priority;
      createdAt = daysAgo(createdDaysAgo);
      var completedAt = completedAt;
      var notes = notes;
    });
  };

  func addChannel(
    channels : List.List<ChannelTypes.ChannelConfig>,
    cId : Nat,
    hotelId : Nat,
    channel : Common.OTAChannel,
    baseRate : Float,
    rateOverride : ?Float,
    syncStatus : Common.SyncStatus,
    lastSyncDaysAgo : Int,
    overbookingProtection : Bool,
  ) {
    channels.add({
      id = cId;
      hotelId = hotelId;
      var channel = channel;
      var isActive = true;
      var baseRate = baseRate;
      var rateOverride = rateOverride;
      var lastSync = ?(daysAgo(lastSyncDaysAgo));
      var syncStatus = syncStatus;
      var overbookingProtection = overbookingProtection;
    });
  };

  public func populate(
    hotels : List.List<HotelTypes.Hotel>,
    rooms : List.List<RoomTypes.Room>,
    guests : List.List<GuestTypes.Guest>,
    bookings : List.List<BookingTypes.Booking>,
    staff : List.List<StaffTypes.Staff>,
    tasks : List.List<HousekeepingTypes.HousekeepingTask>,
    _folios : List.List<BillingTypes.Folio>,
    channels : List.List<ChannelTypes.ChannelConfig>,
    startId : Nat,
  ) : Nat {
    var id = startId;

    // --- Hotels ---
    let hotel1Id = id; id += 1;
    hotels.add({ id = hotel1Id; var name = "The Grand Meridian Mumbai"; var address = "Marine Drive, Nariman Point"; var city = "Mumbai"; var phone = "+91-22-6600-0000"; var email = "reservations@grandmeridian.com"; var checkInTime = "14:00"; var checkOutTime = "12:00"; var currency = "INR"; var totalRooms = 20 });

    let hotel2Id = id; id += 1;
    hotels.add({ id = hotel2Id; var name = "Azure Beach Resort Goa"; var address = "Calangute Beach Road, North Goa"; var city = "Goa"; var phone = "+91-832-2200-000"; var email = "info@azurebeachgoa.com"; var checkInTime = "13:00"; var checkOutTime = "11:00"; var currency = "INR"; var totalRooms = 20 });

    let hotel3Id = id; id += 1;
    hotels.add({ id = hotel3Id; var name = "Highland Retreat Shimla"; var address = "The Mall Road, Shimla Heights"; var city = "Shimla"; var phone = "+91-177-2800-000"; var email = "stay@highlandretreat.com"; var checkInTime = "14:00"; var checkOutTime = "11:00"; var currency = "INR"; var totalRooms = 20 });

    // --- Rooms Hotel 1 (Mumbai) ---
    let r1_0 = id; id += 1; addRoom(rooms, r1_0, hotel1Id, "101", 1, #Standard, 4500.0, #Clean);
    let r1_1 = id; id += 1; addRoom(rooms, r1_1, hotel1Id, "102", 1, #Standard, 4500.0, #Occupied);
    let r1_2 = id; id += 1; addRoom(rooms, r1_2, hotel1Id, "103", 1, #Standard, 4500.0, #Dirty);
    let r1_3 = id; id += 1; addRoom(rooms, r1_3, hotel1Id, "104", 1, #Deluxe, 7500.0, #Clean);
    let r1_4 = id; id += 1; addRoom(rooms, r1_4, hotel1Id, "105", 1, #Deluxe, 7500.0, #Occupied);
    let r1_5 = id; id += 1; addRoom(rooms, r1_5, hotel1Id, "106", 1, #Deluxe, 7500.0, #Clean);
    let r1_6 = id; id += 1; addRoom(rooms, r1_6, hotel1Id, "107", 1, #Deluxe, 7500.0, #Maintenance);
    let r1_7 = id; id += 1; addRoom(rooms, r1_7, hotel1Id, "201", 2, #Standard, 4500.0, #Clean);
    let r1_8 = id; id += 1; addRoom(rooms, r1_8, hotel1Id, "202", 2, #Standard, 4500.0, #Occupied);
    let r1_9 = id; id += 1; addRoom(rooms, r1_9, hotel1Id, "203", 2, #Deluxe, 7500.0, #Clean);
    let r1_10 = id; id += 1; addRoom(rooms, r1_10, hotel1Id, "204", 2, #Deluxe, 7500.0, #Dirty);
    let r1_11 = id; id += 1; addRoom(rooms, r1_11, hotel1Id, "205", 2, #Suite, 15000.0, #Clean);
    let r1_12 = id; id += 1; addRoom(rooms, r1_12, hotel1Id, "206", 2, #Suite, 15000.0, #Occupied);
    let r1_13 = id; id += 1; addRoom(rooms, r1_13, hotel1Id, "301", 3, #Suite, 15000.0, #Clean);
    let r1_14 = id; id += 1; addRoom(rooms, r1_14, hotel1Id, "302", 3, #Suite, 15000.0, #OutOfOrder);
    let r1_15 = id; id += 1; addRoom(rooms, r1_15, hotel1Id, "303", 3, #Presidential, 35000.0, #Clean);
    let r1_16 = id; id += 1; addRoom(rooms, r1_16, hotel1Id, "304", 3, #Presidential, 35000.0, #Occupied);
    let r1_17 = id; id += 1; addRoom(rooms, r1_17, hotel1Id, "401", 4, #Standard, 4500.0, #Clean);
    let r1_18 = id; id += 1; addRoom(rooms, r1_18, hotel1Id, "402", 4, #Deluxe, 7500.0, #Clean);
    let r1_19 = id; id += 1; addRoom(rooms, r1_19, hotel1Id, "403", 4, #Suite, 15000.0, #Clean);

    // --- Rooms Hotel 2 (Goa) ---
    let r2_0 = id; id += 1; addRoomBeach(rooms, r2_0, hotel2Id, "101", 1, #Standard, 5500.0, #Clean);
    let r2_1 = id; id += 1; addRoomBeach(rooms, r2_1, hotel2Id, "102", 1, #Standard, 5500.0, #Occupied);
    let r2_2 = id; id += 1; addRoomBeach(rooms, r2_2, hotel2Id, "103", 1, #Deluxe, 9000.0, #Clean);
    let r2_3 = id; id += 1; addRoomBeach(rooms, r2_3, hotel2Id, "104", 1, #Deluxe, 9000.0, #Clean);
    let r2_4 = id; id += 1; addRoomBeach(rooms, r2_4, hotel2Id, "105", 1, #Deluxe, 9000.0, #Dirty);
    let r2_5 = id; id += 1; addRoomBeach(rooms, r2_5, hotel2Id, "106", 1, #Suite, 18000.0, #Clean);
    let r2_6 = id; id += 1; addRoomBeach(rooms, r2_6, hotel2Id, "107", 1, #Suite, 18000.0, #Occupied);
    let r2_7 = id; id += 1; addRoomBeach(rooms, r2_7, hotel2Id, "201", 2, #Standard, 5500.0, #Clean);
    let r2_8 = id; id += 1; addRoomBeach(rooms, r2_8, hotel2Id, "202", 2, #Standard, 5500.0, #Clean);
    let r2_9 = id; id += 1; addRoomBeach(rooms, r2_9, hotel2Id, "203", 2, #Deluxe, 9000.0, #Occupied);
    let r2_10 = id; id += 1; addRoomBeach(rooms, r2_10, hotel2Id, "204", 2, #Deluxe, 9000.0, #Clean);
    let r2_11 = id; id += 1; addRoomBeach(rooms, r2_11, hotel2Id, "205", 2, #Suite, 18000.0, #Maintenance);
    let r2_12 = id; id += 1; addRoomBeach(rooms, r2_12, hotel2Id, "206", 2, #Suite, 18000.0, #Clean);
    let r2_13 = id; id += 1; addRoomBeach(rooms, r2_13, hotel2Id, "301", 3, #Presidential, 42000.0, #Clean);
    let r2_14 = id; id += 1; addRoomBeach(rooms, r2_14, hotel2Id, "302", 3, #Presidential, 42000.0, #Occupied);
    let r2_15 = id; id += 1; addRoomBeach(rooms, r2_15, hotel2Id, "303", 3, #Suite, 18000.0, #Clean);
    let r2_16 = id; id += 1; addRoomBeach(rooms, r2_16, hotel2Id, "304", 3, #Suite, 18000.0, #Dirty);
    let r2_17 = id; id += 1; addRoomBeach(rooms, r2_17, hotel2Id, "401", 4, #Standard, 5500.0, #Clean);
    let r2_18 = id; id += 1; addRoomBeach(rooms, r2_18, hotel2Id, "402", 4, #Deluxe, 9000.0, #Clean);
    let r2_19 = id; id += 1; addRoomBeach(rooms, r2_19, hotel2Id, "403", 4, #Suite, 18000.0, #Clean);

    // --- Rooms Hotel 3 (Shimla) ---
    let r3_0 = id; id += 1; addRoomMountain(rooms, r3_0, hotel3Id, "101", 1, #Standard, 3800.0, #Clean);
    let r3_1 = id; id += 1; addRoomMountain(rooms, r3_1, hotel3Id, "102", 1, #Standard, 3800.0, #Occupied);
    let r3_2 = id; id += 1; addRoomMountain(rooms, r3_2, hotel3Id, "103", 1, #Standard, 3800.0, #Clean);
    let r3_3 = id; id += 1; addRoomMountain(rooms, r3_3, hotel3Id, "104", 1, #Deluxe, 6500.0, #Dirty);
    let r3_4 = id; id += 1; addRoomMountain(rooms, r3_4, hotel3Id, "105", 1, #Deluxe, 6500.0, #Clean);
    let r3_5 = id; id += 1; addRoomMountain(rooms, r3_5, hotel3Id, "106", 1, #Deluxe, 6500.0, #Occupied);
    let r3_6 = id; id += 1; addRoomMountain(rooms, r3_6, hotel3Id, "107", 1, #Suite, 13000.0, #Clean);
    let r3_7 = id; id += 1; addRoomMountain(rooms, r3_7, hotel3Id, "201", 2, #Standard, 3800.0, #Clean);
    let r3_8 = id; id += 1; addRoomMountain(rooms, r3_8, hotel3Id, "202", 2, #Standard, 3800.0, #Clean);
    let r3_9 = id; id += 1; addRoomMountain(rooms, r3_9, hotel3Id, "203", 2, #Deluxe, 6500.0, #Clean);
    let r3_10 = id; id += 1; addRoomMountain(rooms, r3_10, hotel3Id, "204", 2, #Deluxe, 6500.0, #OutOfOrder);
    let r3_11 = id; id += 1; addRoomMountain(rooms, r3_11, hotel3Id, "205", 2, #Suite, 13000.0, #Clean);
    let r3_12 = id; id += 1; addRoomMountain(rooms, r3_12, hotel3Id, "206", 2, #Suite, 13000.0, #Occupied);
    let r3_13 = id; id += 1; addRoomMountain(rooms, r3_13, hotel3Id, "301", 3, #Suite, 13000.0, #Clean);
    let r3_14 = id; id += 1; addRoomMountain(rooms, r3_14, hotel3Id, "302", 3, #Presidential, 30000.0, #Clean);
    let r3_15 = id; id += 1; addRoomMountain(rooms, r3_15, hotel3Id, "303", 3, #Presidential, 30000.0, #Occupied);
    let r3_16 = id; id += 1; addRoomMountain(rooms, r3_16, hotel3Id, "304", 3, #Deluxe, 6500.0, #Clean);
    let r3_17 = id; id += 1; addRoomMountain(rooms, r3_17, hotel3Id, "401", 4, #Standard, 3800.0, #Clean);
    let r3_18 = id; id += 1; addRoomMountain(rooms, r3_18, hotel3Id, "402", 4, #Deluxe, 6500.0, #Maintenance);
    let r3_19 = id; id += 1; addRoomMountain(rooms, r3_19, hotel3Id, "403", 4, #Suite, 13000.0, #Clean);

    // --- Guests (30) ---
    let g0 = id; id += 1; addGuest(guests, g0, "Arjun Mehta", "arjun.mehta@email.com", "+91-9876543210", "India", [#VIP, #Regular], 1200, "", "High floor, non-smoking", 180);
    let g1 = id; id += 1; addGuest(guests, g1, "Priya Sharma", "priya.sharma@corp.in", "+91-9988776655", "India", [#Corporate], 800, "", "Corporate billing required", 160);
    let g2 = id; id += 1; addGuest(guests, g2, "Rahul Gupta", "rahul.g@gmail.com", "+91-9123456789", "India", [#Regular], 300, "", "", 150);
    let g3 = id; id += 1; addGuest(guests, g3, "Sunita Patel", "sunita.p@email.com", "+91-9765432100", "India", [#VIP], 2500, "Repeat guest", "Suite preferred, welcome fruit basket", 365);
    let g4 = id; id += 1; addGuest(guests, g4, "Vikram Singh", "vikram.singh@biz.com", "+91-9234567890", "India", [#Corporate], 600, "", "Late check-out if possible", 120);
    let g5 = id; id += 1; addGuest(guests, g5, "Anjali Nair", "anjali.nair@email.com", "+91-9345678901", "India", [#New], 0, "", "", 10);
    let g6 = id; id += 1; addGuest(guests, g6, "Deepak Joshi", "deepak.j@email.com", "+91-9456789012", "India", [#Regular], 450, "", "Extra pillows", 200);
    let g7 = id; id += 1; addGuest(guests, g7, "Kavita Rao", "kavita.rao@corp.in", "+91-9567890123", "India", [#Corporate, #VIP], 1800, "", "Vegetarian meals", 300);
    let g8 = id; id += 1; addGuest(guests, g8, "Rohit Kumar", "rohit.k@gmail.com", "+91-9678901234", "India", [#Regular], 200, "", "", 90);
    let g9 = id; id += 1; addGuest(guests, g9, "Meena Das", "meena.das@email.com", "+91-9789012345", "India", [#New], 50, "", "", 20);
    let g10 = id; id += 1; addGuest(guests, g10, "James Wilson", "james.wilson@uk.com", "+44-7700900123", "United Kingdom", [#VIP], 3000, "Preferred guest", "King bed, bath tub", 400);
    let g11 = id; id += 1; addGuest(guests, g11, "Sarah Chen", "sarah.chen@us.com", "+1-6505551234", "United States", [#VIP, #Corporate], 2100, "", "Airport transfer needed", 250);
    let g12 = id; id += 1; addGuest(guests, g12, "Mohammed Al-Rashid", "m.rashid@ae.com", "+971-501234567", "UAE", [#VIP], 4000, "Presidential suite only", "Halal food, prayer mat", 180);
    let g13 = id; id += 1; addGuest(guests, g13, "Yuki Tanaka", "yuki.t@jp.com", "+81-9012345678", "Japan", [#Regular], 350, "", "", 100);
    let g14 = id; id += 1; addGuest(guests, g14, "Lisa Anderson", "lisa.a@au.com", "+61-412345678", "Australia", [#Corporate], 700, "", "", 140);
    let g15 = id; id += 1; addGuest(guests, g15, "Carlos Mendez", "carlos.m@mx.com", "+52-5512345678", "Mexico", [#New], 0, "", "", 5);
    let g16 = id; id += 1; addGuest(guests, g16, "Fatima Hassan", "fatima.h@eg.com", "+20-1012345678", "Egypt", [#Regular], 250, "", "", 80);
    let g17 = id; id += 1; addGuest(guests, g17, "Ravi Krishnan", "ravi.k@email.com", "+91-9890123456", "India", [#Regular, #VIP], 1600, "", "Sea view room", 280);
    let g18 = id; id += 1; addGuest(guests, g18, "Nisha Verma", "nisha.v@corp.in", "+91-9901234567", "India", [#Corporate], 500, "", "", 60);
    let g19 = id; id += 1; addGuest(guests, g19, "Arun Bose", "arun.b@email.com", "+91-9012345678", "India", [#New], 0, "", "", 3);
    let g20 = id; id += 1; addGuest(guests, g20, "Pooja Iyer", "pooja.i@email.com", "+91-9111222333", "India", [#VIP], 2200, "", "Quiet room, high floor", 320);
    let g21 = id; id += 1; addGuest(guests, g21, "Sanjay Malhotra", "sanjay.m@biz.com", "+91-9222333444", "India", [#Corporate], 900, "", "Early check-in often needed", 220);
    let g22 = id; id += 1; addGuest(guests, g22, "Divya Reddy", "divya.r@email.com", "+91-9333444555", "India", [#Regular], 150, "", "", 45);
    let g23 = id; id += 1; addGuest(guests, g23, "Kiran Jain", "kiran.j@email.com", "+91-9444555666", "India", [#New], 25, "", "", 15);
    let g24 = id; id += 1; addGuest(guests, g24, "Amit Shah", "amit.s@corp.in", "+91-9555666777", "India", [#Corporate, #VIP], 3200, "Frequent flyer", "Premium suite, butler service", 500);
    let g25 = id; id += 1; addGuest(guests, g25, "Rekha Pillai", "rekha.p@email.com", "+91-9666777888", "India", [#Regular], 400, "", "", 110);
    let g26 = id; id += 1; addGuest(guests, g26, "Suresh Naidu", "suresh.n@email.com", "+91-9777888999", "India", [#New], 0, "", "", 8);
    let g27 = id; id += 1; addGuest(guests, g27, "Geeta Bhatia", "geeta.b@email.com", "+91-9888999000", "India", [#VIP], 1900, "", "Spa access, veg meals", 240);
    let g28 = id; id += 1; addGuest(guests, g28, "Manish Tiwari", "manish.t@biz.com", "+91-9000111222", "India", [#Corporate], 750, "", "", 130);
    let g29 = id; id += 1; addGuest(guests, g29, "Anita Chopra", "anita.c@email.com", "+91-9111333555", "India", [#Regular], 320, "", "", 70);

    // --- Staff Hotel 1 ---
    let s1_0 = id; id += 1; addStaff(staff, s1_0, hotel1Id, "Rajan Kapoor", #Admin, "rajan.k@grandmeridian.com", "+91-9100000001");
    let s1_1 = id; id += 1; addStaff(staff, s1_1, hotel1Id, "Sneha Agarwal", #Manager, "sneha.a@grandmeridian.com", "+91-9100000002");
    let s1_2 = id; id += 1; addStaff(staff, s1_2, hotel1Id, "Dev Malhotra", #FrontDesk, "dev.m@grandmeridian.com", "+91-9100000003");
    let s1_3 = id; id += 1; addStaff(staff, s1_3, hotel1Id, "Priti Sinha", #FrontDesk, "priti.s@grandmeridian.com", "+91-9100000004");
    let s1_4 = id; id += 1; addStaff(staff, s1_4, hotel1Id, "Ramesh Yadav", #Housekeeping, "ramesh.y@grandmeridian.com", "+91-9100000005");
    let s1_5 = id; id += 1; addStaff(staff, s1_5, hotel1Id, "Sundar Lal", #Housekeeping, "sundar.l@grandmeridian.com", "+91-9100000006");
    let s1_6 = id; id += 1; addStaff(staff, s1_6, hotel1Id, "Meera Jha", #Housekeeping, "meera.j@grandmeridian.com", "+91-9100000007");

    // --- Staff Hotel 2 ---
    let s2_0 = id; id += 1; addStaff(staff, s2_0, hotel2Id, "Fernandes Costa", #Admin, "fernandes@azurebeach.com", "+91-9200000001");
    let s2_1 = id; id += 1; addStaff(staff, s2_1, hotel2Id, "Angela D'Souza", #Manager, "angela@azurebeach.com", "+91-9200000002");
    let s2_2 = id; id += 1; addStaff(staff, s2_2, hotel2Id, "Mario Pereira", #FrontDesk, "mario@azurebeach.com", "+91-9200000003");
    let s2_3 = id; id += 1; addStaff(staff, s2_3, hotel2Id, "Tina Rodrigues", #FrontDesk, "tina@azurebeach.com", "+91-9200000004");
    let s2_4 = id; id += 1; addStaff(staff, s2_4, hotel2Id, "Balu Naik", #Housekeeping, "balu@azurebeach.com", "+91-9200000005");
    let s2_5 = id; id += 1; addStaff(staff, s2_5, hotel2Id, "Sangita Gaonkar", #Housekeeping, "sangita@azurebeach.com", "+91-9200000006");

    // --- Staff Hotel 3 ---
    let s3_0 = id; id += 1; addStaff(staff, s3_0, hotel3Id, "Harbhajan Thakur", #Admin, "harbhajan@highland.com", "+91-9300000001");
    let s3_1 = id; id += 1; addStaff(staff, s3_1, hotel3Id, "Kamla Verma", #Manager, "kamla@highland.com", "+91-9300000002");
    let s3_2 = id; id += 1; addStaff(staff, s3_2, hotel3Id, "Sukhdev Rana", #FrontDesk, "sukhdev@highland.com", "+91-9300000003");
    let s3_3 = id; id += 1; addStaff(staff, s3_3, hotel3Id, "Parveen Kumari", #FrontDesk, "parveen@highland.com", "+91-9300000004");
    let s3_4 = id; id += 1; addStaff(staff, s3_4, hotel3Id, "Dinesh Chauhan", #Housekeeping, "dinesh@highland.com", "+91-9300000005");
    let s3_5 = id; id += 1; addStaff(staff, s3_5, hotel3Id, "Rita Sharma", #Housekeeping, "rita@highland.com", "+91-9300000006");
    let s3_6 = id; id += 1; addStaff(staff, s3_6, hotel3Id, "Mohan Lal", #Housekeeping, "mohan@highland.com", "+91-9300000007");
    let s3_7 = id; id += 1; addStaff(staff, s3_7, hotel3Id, "Sita Devi", #Housekeeping, "sita@highland.com", "+91-9300000008");

    // --- Bookings Hotel 1 (Mumbai) ---
    // ciDaysOffset: positive = days ago, negative = days in future
    let b = id;
    addBooking(bookings, guests, b+0,  hotel1Id, g0,  r1_1,  5,  -2,  2, #Direct, #CheckedIn);
    addBooking(bookings, guests, b+1,  hotel1Id, g1,  r1_4,  2,  -3,  1, #OTA, #CheckedIn);
    addBooking(bookings, guests, b+2,  hotel1Id, g2,  r1_0,  -1, -3,  2, #Direct, #Confirmed);
    addBooking(bookings, guests, b+3,  hotel1Id, g3,  r1_3,  0,  -2,  2, #WalkIn, #CheckedIn);
    addBooking(bookings, guests, b+4,  hotel1Id, g4,  r1_5,  -3, -5,  3, #OTA, #Confirmed);
    addBooking(bookings, guests, b+5,  hotel1Id, g5,  r1_6,  10, 7,   1, #Direct, #CheckedOut);
    addBooking(bookings, guests, b+6,  hotel1Id, g6,  r1_7,  8,  5,   2, #OTA, #CheckedOut);
    addBooking(bookings, guests, b+7,  hotel1Id, g7,  r1_9,  -7, -10, 2, #Direct, #Confirmed);
    addBooking(bookings, guests, b+8,  hotel1Id, g8,  r1_8,  3,  -1,  1, #OTA, #CheckedIn);
    addBooking(bookings, guests, b+9,  hotel1Id, g9,  r1_2,  1,  -2,  3, #WalkIn, #CheckedIn);
    addBooking(bookings, guests, b+10, hotel1Id, g10, r1_11, -5, -8,  2, #Direct, #Confirmed);
    addBooking(bookings, guests, b+11, hotel1Id, g11, r1_13, 15, 12,  4, #OTA, #CheckedOut);
    addBooking(bookings, guests, b+12, hotel1Id, g12, r1_15, -10, -14, 2, #Direct, #Confirmed);
    addBooking(bookings, guests, b+13, hotel1Id, g13, r1_8,  4,  1,   1, #WalkIn, #CheckedOut);
    addBooking(bookings, guests, b+14, hotel1Id, g14, r1_16, -15, -17, 2, #OTA, #Pending);
    addBooking(bookings, guests, b+15, hotel1Id, g15, r1_12, 20, 18,  2, #Direct, #CheckedOut);
    addBooking(bookings, guests, b+16, hotel1Id, g16, r1_14, -20, -23, 3, #OTA, #Confirmed);
    addBooking(bookings, guests, b+17, hotel1Id, g17, r1_17, 7,  4,   1, #Direct, #Cancelled);
    addBooking(bookings, guests, b+18, hotel1Id, g18, r1_18, 25, 22,  2, #OTA, #CheckedOut);
    addBooking(bookings, guests, b+19, hotel1Id, g19, r1_19, -25, -28, 2, #Direct, #Confirmed);
    id += 20;

    // --- Bookings Hotel 2 (Goa) ---
    let b2 = id;
    addBooking(bookings, guests, b2+0,  hotel2Id, g3,  r2_1,  3,  -4,  2, #OTA, #CheckedIn);
    addBooking(bookings, guests, b2+1,  hotel2Id, g4,  r2_2,  -2, -5,  1, #Direct, #Confirmed);
    addBooking(bookings, guests, b2+2,  hotel2Id, g5,  r2_6,  6,  3,   3, #OTA, #CheckedOut);
    addBooking(bookings, guests, b2+3,  hotel2Id, g6,  r2_9,  -1, -4,  2, #WalkIn, #Confirmed);
    addBooking(bookings, guests, b2+4,  hotel2Id, g7,  r2_13, 1,  -3,  2, #Direct, #CheckedIn);
    addBooking(bookings, guests, b2+5,  hotel2Id, g8,  r2_0,  -8, -11, 1, #OTA, #Confirmed);
    addBooking(bookings, guests, b2+6,  hotel2Id, g9,  r2_3,  8,  5,   2, #Direct, #CheckedOut);
    addBooking(bookings, guests, b2+7,  hotel2Id, g10, r2_5,  -12, -15, 3, #OTA, #Confirmed);
    addBooking(bookings, guests, b2+8,  hotel2Id, g11, r2_7,  12, 9,   4, #Direct, #CheckedOut);
    addBooking(bookings, guests, b2+9,  hotel2Id, g12, r2_10, -18, -21, 2, #WalkIn, #Confirmed);
    addBooking(bookings, guests, b2+10, hotel2Id, g13, r2_12, 2,  -1,  1, #OTA, #CheckedIn);
    addBooking(bookings, guests, b2+11, hotel2Id, g14, r2_14, -22, -25, 2, #Direct, #Pending);
    addBooking(bookings, guests, b2+12, hotel2Id, g15, r2_15, 18, 15,  3, #OTA, #CheckedOut);
    addBooking(bookings, guests, b2+13, hotel2Id, g16, r2_16, -28, -31, 2, #Direct, #Confirmed);
    addBooking(bookings, guests, b2+14, hotel2Id, g17, r2_17, 4,  1,   2, #WalkIn, #CheckedOut);
    addBooking(bookings, guests, b2+15, hotel2Id, g18, r2_18, -35, -37, 1, #OTA, #Confirmed);
    id += 16;

    // --- Bookings Hotel 3 (Shimla) ---
    let b3 = id;
    addBooking(bookings, guests, b3+0,  hotel3Id, g6,  r3_1,  4,  -2,  2, #Direct, #CheckedIn);
    addBooking(bookings, guests, b3+1,  hotel3Id, g7,  r3_3,  -1, -4,  1, #OTA, #Confirmed);
    addBooking(bookings, guests, b3+2,  hotel3Id, g8,  r3_5,  7,  4,   2, #Direct, #CheckedOut);
    addBooking(bookings, guests, b3+3,  hotel3Id, g9,  r3_7,  -3, -6,  3, #WalkIn, #Confirmed);
    addBooking(bookings, guests, b3+4,  hotel3Id, g10, r3_9,  2,  -2,  2, #OTA, #CheckedIn);
    addBooking(bookings, guests, b3+5,  hotel3Id, g11, r3_11, -8, -11, 1, #Direct, #Confirmed);
    addBooking(bookings, guests, b3+6,  hotel3Id, g12, r3_14, 10, 7,   4, #OTA, #CheckedOut);
    addBooking(bookings, guests, b3+7,  hotel3Id, g13, r3_15, -15, -18, 2, #Direct, #Confirmed);
    addBooking(bookings, guests, b3+8,  hotel3Id, g14, r3_0,  1,  -3,  1, #OTA, #CheckedIn);
    addBooking(bookings, guests, b3+9,  hotel3Id, g15, r3_2,  -20, -23, 2, #WalkIn, #Confirmed);
    addBooking(bookings, guests, b3+10, hotel3Id, g16, r3_4,  14, 11,  3, #Direct, #CheckedOut);
    addBooking(bookings, guests, b3+11, hotel3Id, g17, r3_6,  -25, -28, 2, #OTA, #Confirmed);
    addBooking(bookings, guests, b3+12, hotel3Id, g18, r3_8,  5,  2,   2, #Direct, #CheckedOut);
    addBooking(bookings, guests, b3+13, hotel3Id, g19, r3_10, -30, -33, 1, #OTA, #Pending);
    addBooking(bookings, guests, b3+14, hotel3Id, g20, r3_12, 19, 16,  2, #WalkIn, #CheckedOut);
    id += 15;

    // --- Housekeeping tasks ---
    addTask(tasks, id, hotel1Id, r1_2, ?s1_4, #Pending, 3, 1, null, "Deep clean after checkout"); id += 1;
    addTask(tasks, id, hotel1Id, r1_4, ?s1_5, #InProgress, 3, 1, null, "Turndown service"); id += 1;
    addTask(tasks, id, hotel2Id, r2_4, ?s2_4, #Pending, 2, 0, null, ""); id += 1;
    addTask(tasks, id, hotel2Id, r2_9, ?s2_5, #Done, 2, 1, ?daysAgo(0), "Completed on time"); id += 1;
    addTask(tasks, id, hotel3Id, r3_3, ?s3_4, #InProgress, 3, 0, null, ""); id += 1;
    addTask(tasks, id, hotel3Id, r3_12, null, #Pending, 2, 0, null, "Assign staff"); id += 1;

    // --- Channel configs (5 channels per hotel) ---
    for (hId in [hotel1Id, hotel2Id, hotel3Id].values()) {
      let baseR : Float = if (hId == hotel1Id) 4500.0 else if (hId == hotel2Id) 5500.0 else 3800.0;
      addChannel(channels, id, hId, #BookingCom, baseR, null, #Synced, 1, true); id += 1;
      addChannel(channels, id, hId, #Airbnb, baseR, ?(baseR * 1.1), #Synced, 1, true); id += 1;
      addChannel(channels, id, hId, #MakeMyTrip, baseR, null, #Synced, 2, true); id += 1;
      addChannel(channels, id, hId, #Expedia, baseR, null, #OutOfSync, 3, false); id += 1;
      addChannel(channels, id, hId, #Direct, baseR * 0.95, null, #Synced, 0, true); id += 1;
    };

    id;
  };
};
