module {
  public type EntityId = Nat;
  public type Timestamp = Int; // nanoseconds from Time.now()
  public type Counter = { var value : Nat };

  public type RoomType = { #Standard; #Deluxe; #Suite; #Presidential };
  public type RoomStatus = { #Clean; #Dirty; #Occupied; #OutOfOrder; #Maintenance };
  public type BookingStatus = { #Confirmed; #Pending; #Cancelled; #NoShow; #CheckedIn; #CheckedOut };
  public type BookingSource = { #OTA; #Direct; #WalkIn };
  public type StaffRole = { #Admin; #Manager; #FrontDesk; #Housekeeping };
  public type StaffStatus = { #Active; #Inactive };
  public type GuestTag = { #VIP; #Regular; #Corporate; #New };
  public type TaskStatus = { #Pending; #InProgress; #Done };
  public type FolioStatus = { #Open; #Settled };
  public type ChargeCategory = { #Room; #Tax; #Extra; #Discount };
  public type PaymentMethod = { #Cash; #Card; #UPI; #BankTransfer };
  public type OTAChannel = { #BookingCom; #Airbnb; #MakeMyTrip; #Expedia; #Direct };
  public type SyncStatus = { #Synced; #OutOfSync };
};
