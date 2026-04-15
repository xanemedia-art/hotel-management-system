import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AnalyticsData {
    adr: number;
    revpar: number;
    revenueByRoomType: Array<RevenueByRoomType>;
    hotelId: EntityId;
    overallOccupancyPercent: number;
    revenueByMonth: Array<MonthlyRevenue>;
    occupancyByMonth: Array<MonthlyOccupancy>;
    totalRevenue: number;
}
export interface UpdateHousekeepingTaskArgs {
    id: EntityId;
    status: TaskStatus;
    completedAt?: Timestamp;
    assignedStaffId?: EntityId;
    notes: string;
    priority: bigint;
    roomId: EntityId;
}
export interface UpdateGuestArgs {
    id: EntityId;
    country: string;
    name: string;
    tags: Array<GuestTag>;
    email: string;
    loyaltyPoints: bigint;
    preferences: string;
    address: string;
    notes: string;
    phone: string;
}
export type Timestamp = bigint;
export interface UpdateRoomArgs {
    id: EntityId;
    floor: bigint;
    status: RoomStatus;
    pricePerNight: number;
    amenities: Array<string>;
    isActive: boolean;
    number: string;
    capacity: bigint;
    roomType: RoomType;
}
export interface MonthlyRevenue {
    month: bigint;
    revenue: number;
    year: bigint;
}
export type EntityId = bigint;
export interface CreateGuestArgs {
    country: string;
    name: string;
    tags: Array<GuestTag>;
    email: string;
    preferences: string;
    address: string;
    notes: string;
    phone: string;
}
export interface UpdateChannelConfigArgs {
    id: EntityId;
    isActive: boolean;
    overbookingProtection: boolean;
    rateOverride?: number;
    syncStatus: SyncStatus;
    baseRate: number;
}
export interface StaffView {
    id: EntityId;
    status: StaffStatus;
    name: string;
    role: StaffRole;
    hotelId: EntityId;
    email: string;
    phone: string;
}
export interface RevenueByRoomType {
    revenue: number;
    roomType: RoomType;
    bookingCount: bigint;
}
export interface ChannelConfigView {
    id: EntityId;
    hotelId: EntityId;
    isActive: boolean;
    overbookingProtection: boolean;
    rateOverride?: number;
    channel: OTAChannel;
    lastSync?: Timestamp;
    syncStatus: SyncStatus;
    baseRate: number;
}
export interface UpdateHotelArgs {
    id: EntityId;
    city: string;
    name: string;
    checkInTime: string;
    email: string;
    currency: string;
    address: string;
    checkOutTime: string;
    phone: string;
    totalRooms: bigint;
}
export interface MonthlyOccupancy {
    occupiedRooms: bigint;
    month: bigint;
    occupancyPercent: number;
    year: bigint;
    totalRooms: bigint;
}
export interface CreateBookingArgs {
    status: BookingStatus;
    checkIn: Timestamp;
    source: BookingSource;
    earlyCheckIn: boolean;
    hotelId: EntityId;
    guestName: string;
    guestEmail: string;
    lateCheckOut: boolean;
    numGuests: bigint;
    notes: string;
    checkOut: Timestamp;
    guestPhone: string;
    roomId: EntityId;
    guestId: EntityId;
}
export interface AddPaymentArgs {
    method: PaymentMethod;
    referenceId: string;
    folioId: EntityId;
    amount: number;
}
export interface AddChargeArgs {
    description: string;
    folioId: EntityId;
    category: ChargeCategory;
    amount: number;
}
export interface CreateHotelArgs {
    city: string;
    name: string;
    checkInTime: string;
    email: string;
    currency: string;
    address: string;
    checkOutTime: string;
    phone: string;
    totalRooms: bigint;
}
export interface CreateStaffArgs {
    name: string;
    role: StaffRole;
    hotelId: EntityId;
    email: string;
    phone: string;
}
export interface UpdateBookingArgs {
    id: EntityId;
    status: BookingStatus;
    actualCheckIn?: Timestamp;
    checkIn: Timestamp;
    source: BookingSource;
    earlyCheckIn: boolean;
    guestName: string;
    guestEmail: string;
    lateCheckOut: boolean;
    numGuests: bigint;
    notes: string;
    checkOut: Timestamp;
    guestPhone: string;
    roomId: EntityId;
    actualCheckOut?: Timestamp;
}
export interface CreateHousekeepingTaskArgs {
    assignedStaffId?: EntityId;
    hotelId: EntityId;
    notes: string;
    priority: bigint;
    roomId: EntityId;
}
export interface CreateRoomArgs {
    floor: bigint;
    pricePerNight: number;
    hotelId: EntityId;
    amenities: Array<string>;
    number: string;
    capacity: bigint;
    roomType: RoomType;
}
export interface Payment {
    id: EntityId;
    method: PaymentMethod;
    date: Timestamp;
    referenceId: string;
    amount: number;
}
export interface CreateFolioArgs {
    bookingId: EntityId;
    hotelId: EntityId;
    guestId: EntityId;
}
export interface HousekeepingTaskView {
    id: EntityId;
    status: TaskStatus;
    completedAt?: Timestamp;
    assignedStaffId?: EntityId;
    createdAt: Timestamp;
    hotelId: EntityId;
    notes: string;
    priority: bigint;
    roomId: EntityId;
}
export interface BookingView {
    id: EntityId;
    status: BookingStatus;
    actualCheckIn?: Timestamp;
    checkIn: Timestamp;
    source: BookingSource;
    createdAt: Timestamp;
    earlyCheckIn: boolean;
    hotelId: EntityId;
    guestName: string;
    guestEmail: string;
    lateCheckOut: boolean;
    numGuests: bigint;
    notes: string;
    checkOut: Timestamp;
    guestPhone: string;
    roomId: EntityId;
    actualCheckOut?: Timestamp;
    guestId: EntityId;
}
export interface GuestView {
    id: EntityId;
    country: string;
    name: string;
    createdAt: Timestamp;
    tags: Array<GuestTag>;
    email: string;
    loyaltyPoints: bigint;
    preferences: string;
    address: string;
    notes: string;
    phone: string;
}
export interface FolioCharge {
    id: EntityId;
    date: Timestamp;
    description: string;
    category: ChargeCategory;
    amount: number;
}
export interface HotelView {
    id: EntityId;
    city: string;
    name: string;
    checkInTime: string;
    email: string;
    currency: string;
    address: string;
    checkOutTime: string;
    phone: string;
    totalRooms: bigint;
}
export interface UpdateStaffArgs {
    id: EntityId;
    status: StaffStatus;
    name: string;
    role: StaffRole;
    email: string;
    phone: string;
}
export interface CreateChannelConfigArgs {
    hotelId: EntityId;
    overbookingProtection: boolean;
    rateOverride?: number;
    channel: OTAChannel;
    baseRate: number;
}
export interface RoomView {
    id: EntityId;
    floor: bigint;
    status: RoomStatus;
    pricePerNight: number;
    hotelId: EntityId;
    amenities: Array<string>;
    isActive: boolean;
    number: string;
    capacity: bigint;
    roomType: RoomType;
}
export interface FolioView {
    id: EntityId;
    status: FolioStatus;
    bookingId: EntityId;
    payments: Array<Payment>;
    hotelId: EntityId;
    charges: Array<FolioCharge>;
    guestId: EntityId;
}
export enum BookingSource {
    OTA = "OTA",
    WalkIn = "WalkIn",
    Direct = "Direct"
}
export enum BookingStatus {
    CheckedIn = "CheckedIn",
    NoShow = "NoShow",
    Confirmed = "Confirmed",
    Cancelled = "Cancelled",
    CheckedOut = "CheckedOut",
    Pending = "Pending"
}
export enum ChargeCategory {
    Tax = "Tax",
    Extra = "Extra",
    Room = "Room",
    Discount = "Discount"
}
export enum FolioStatus {
    Open = "Open",
    Settled = "Settled"
}
export enum GuestTag {
    New = "New",
    VIP = "VIP",
    Regular = "Regular",
    Corporate = "Corporate"
}
export enum OTAChannel {
    Airbnb = "Airbnb",
    MakeMyTrip = "MakeMyTrip",
    BookingCom = "BookingCom",
    Expedia = "Expedia",
    Direct = "Direct"
}
export enum PaymentMethod {
    UPI = "UPI",
    Card = "Card",
    Cash = "Cash",
    BankTransfer = "BankTransfer"
}
export enum RoomStatus {
    OutOfOrder = "OutOfOrder",
    Dirty = "Dirty",
    Maintenance = "Maintenance",
    Clean = "Clean",
    Occupied = "Occupied"
}
export enum RoomType {
    Suite = "Suite",
    Presidential = "Presidential",
    Deluxe = "Deluxe",
    Standard = "Standard"
}
export enum StaffRole {
    FrontDesk = "FrontDesk",
    Admin = "Admin",
    Housekeeping = "Housekeeping",
    Manager = "Manager"
}
export enum StaffStatus {
    Inactive = "Inactive",
    Active = "Active"
}
export enum SyncStatus {
    Synced = "Synced",
    OutOfSync = "OutOfSync"
}
export enum TaskStatus {
    Done = "Done",
    InProgress = "InProgress",
    Pending = "Pending"
}
export interface backendInterface {
    addFolioCharge(args: AddChargeArgs): Promise<boolean>;
    addFolioPayment(args: AddPaymentArgs): Promise<boolean>;
    checkInBooking(id: EntityId): Promise<boolean>;
    checkOutBooking(id: EntityId): Promise<boolean>;
    createBooking(args: CreateBookingArgs): Promise<BookingView>;
    createChannelConfig(args: CreateChannelConfigArgs): Promise<ChannelConfigView>;
    createFolio(args: CreateFolioArgs): Promise<FolioView>;
    createGuest(args: CreateGuestArgs): Promise<GuestView>;
    createHotel(args: CreateHotelArgs): Promise<HotelView>;
    createHousekeepingTask(args: CreateHousekeepingTaskArgs): Promise<HousekeepingTaskView>;
    createRoom(args: CreateRoomArgs): Promise<RoomView>;
    createStaff(args: CreateStaffArgs): Promise<StaffView>;
    deleteBooking(id: EntityId): Promise<boolean>;
    deleteChannelConfig(id: EntityId): Promise<boolean>;
    deleteGuest(id: EntityId): Promise<boolean>;
    deleteHotel(id: EntityId): Promise<boolean>;
    deleteHousekeepingTask(id: EntityId): Promise<boolean>;
    deleteRoom(id: EntityId): Promise<boolean>;
    deleteStaff(id: EntityId): Promise<boolean>;
    getAnalyticsData(hotelId: EntityId, fromMonth: bigint, fromYear: bigint, toMonth: bigint, toYear: bigint): Promise<AnalyticsData>;
    getBooking(id: EntityId): Promise<BookingView | null>;
    getBookings(): Promise<Array<BookingView>>;
    getBookingsByGuest(guestId: EntityId): Promise<Array<BookingView>>;
    getBookingsByHotel(hotelId: EntityId): Promise<Array<BookingView>>;
    getChannelConfig(id: EntityId): Promise<ChannelConfigView | null>;
    getChannelConfigs(): Promise<Array<ChannelConfigView>>;
    getChannelConfigsByHotel(hotelId: EntityId): Promise<Array<ChannelConfigView>>;
    getFolio(id: EntityId): Promise<FolioView | null>;
    getFolioByBooking(bookingId: EntityId): Promise<FolioView | null>;
    getFoliosByHotel(hotelId: EntityId): Promise<Array<FolioView>>;
    getGuest(id: EntityId): Promise<GuestView | null>;
    getGuests(): Promise<Array<GuestView>>;
    getHotel(id: EntityId): Promise<HotelView | null>;
    getHotels(): Promise<Array<HotelView>>;
    getHousekeepingTask(id: EntityId): Promise<HousekeepingTaskView | null>;
    getHousekeepingTasks(): Promise<Array<HousekeepingTaskView>>;
    getHousekeepingTasksByHotel(hotelId: EntityId): Promise<Array<HousekeepingTaskView>>;
    getRoom(id: EntityId): Promise<RoomView | null>;
    getRooms(): Promise<Array<RoomView>>;
    getRoomsByHotel(hotelId: EntityId): Promise<Array<RoomView>>;
    getStaff(): Promise<Array<StaffView>>;
    getStaffByHotel(hotelId: EntityId): Promise<Array<StaffView>>;
    getStaffMember(id: EntityId): Promise<StaffView | null>;
    searchGuests(term: string): Promise<Array<GuestView>>;
    settleFolio(id: EntityId): Promise<boolean>;
    updateBooking(args: UpdateBookingArgs): Promise<boolean>;
    updateBookingStatus(id: EntityId, status: BookingStatus): Promise<boolean>;
    updateChannelConfig(args: UpdateChannelConfigArgs): Promise<boolean>;
    updateGuest(args: UpdateGuestArgs): Promise<boolean>;
    updateHotel(args: UpdateHotelArgs): Promise<boolean>;
    updateHousekeepingTask(args: UpdateHousekeepingTaskArgs): Promise<boolean>;
    updateHousekeepingTaskStatus(id: EntityId, status: TaskStatus): Promise<boolean>;
    updateRoom(args: UpdateRoomArgs): Promise<boolean>;
    updateRoomStatus(id: EntityId, status: RoomStatus): Promise<boolean>;
    updateStaff(args: UpdateStaffArgs): Promise<boolean>;
}
