import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  sampleActivityFeed,
  sampleAnalytics,
  sampleBookings,
  sampleChannelConfigs,
  sampleFolios,
  sampleGuests,
  sampleHotels,
  sampleHousekeepingTasks,
  sampleRooms,
  sampleStaff,
} from "@/data/sampleData";
import { ManagementBookingsTab } from "@/pages/management/ManagementBookingsTab";
import { ManagementGuestsTab } from "@/pages/management/ManagementGuestsTab";
import { ManagementRoomsTab } from "@/pages/management/ManagementRoomsTab";
import { ManagementStaffTab } from "@/pages/management/ManagementStaffTab";
import { useHotelStore } from "@/store/useHotelStore";
import {
  BedDouble,
  BookOpen,
  ChevronRight,
  LayoutDashboard,
  RefreshCw,
  Trash2,
  UserCog,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const QUICK_LINKS = [
  {
    label: "Rooms",
    tab: "rooms",
    icon: BedDouble,
    bg: "bg-blue-500/10 border-blue-500/20",
    color: "text-blue-400",
  },
  {
    label: "Staff",
    tab: "staff",
    icon: UserCog,
    bg: "bg-violet-500/10 border-violet-500/20",
    color: "text-violet-400",
  },
  {
    label: "Guests",
    tab: "guests",
    icon: Users,
    bg: "bg-emerald-500/10 border-emerald-500/20",
    color: "text-emerald-400",
  },
  {
    label: "Bookings",
    tab: "bookings",
    icon: BookOpen,
    bg: "bg-amber-500/10 border-amber-500/20",
    color: "text-amber-400",
  },
] as const;

type TabValue = "overview" | "rooms" | "staff" | "guests" | "bookings";

function StatCard({
  label,
  value,
  sub,
}: { label: string; value: number; sub?: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
        {label}
      </p>
      <p className="text-3xl font-bold text-foreground font-display mt-1">
        {value}
      </p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function OverviewTab({ onTabChange }: { onTabChange: (t: TabValue) => void }) {
  const hotels = useHotelStore((s) => s.hotels);
  const rooms = useHotelStore((s) => s.rooms);
  const guests = useHotelStore((s) => s.guests);
  const bookings = useHotelStore((s) => s.bookings);
  const staff = useHotelStore((s) => s.staff);

  const handleLoadSample = () => {
    useHotelStore.setState({
      hotels: sampleHotels,
      rooms: sampleRooms,
      bookings: sampleBookings,
      guests: sampleGuests,
      staff: sampleStaff,
      housekeepingTasks: sampleHousekeepingTasks,
      folios: sampleFolios,
      channelConfigs: sampleChannelConfigs,
      analyticsData: sampleAnalytics,
      activityFeed: sampleActivityFeed,
    });
    toast.success("Sample data loaded", {
      description: "All stores re-seeded with demo data.",
    });
  };

  const handleClearAll = () => {
    useHotelStore.setState({
      hotels: [],
      rooms: [],
      bookings: [],
      guests: [],
      staff: [],
      housekeepingTasks: [],
      folios: [],
      channelConfigs: [],
      analyticsData: [],
      activityFeed: [],
    });
    toast.warning("All data cleared", {
      description: "Store reset to empty state.",
    });
  };

  const stats = [
    { label: "Hotels", value: hotels.length },
    {
      label: "Rooms",
      value: rooms.length,
      sub: `${rooms.filter((r) => r.isActive).length} active`,
    },
    { label: "Guests", value: guests.length },
    {
      label: "Bookings",
      value: bookings.length,
      sub: `${bookings.filter((b) => b.status === "CheckedIn").length} checked in`,
    },
    {
      label: "Staff",
      value: staff.length,
      sub: `${staff.filter((s) => s.status === "Active").length} active`,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          data-ocid="management.load_sample_button"
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold px-6"
          onClick={handleLoadSample}
        >
          <RefreshCw className="w-4 h-4" />
          Load Sample Data
        </Button>
        <Button
          type="button"
          data-ocid="management.clear_all_button"
          variant="outline"
          size="lg"
          onClick={handleClearAll}
          className="border-destructive/60 text-destructive hover:bg-destructive/10 gap-2 font-semibold px-6"
        >
          <Trash2 className="w-4 h-4" />
          Clear All Data
        </Button>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Quick Access
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {QUICK_LINKS.map((link, i) => (
            <motion.button
              key={link.tab}
              type="button"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + i * 0.07 }}
              data-ocid={`management.quicklink_${link.tab}`}
              onClick={() => onTabChange(link.tab)}
              className={`flex items-center justify-between p-4 rounded-xl border transition-smooth hover:scale-[1.02] cursor-pointer ${link.bg}`}
            >
              <div className="flex items-center gap-3">
                <link.icon className={`w-5 h-5 ${link.color}`} />
                <span className="font-medium text-foreground text-sm">
                  {link.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

const TABS: { value: TabValue; label: string; icon: typeof LayoutDashboard }[] =
  [
    { value: "overview", label: "Overview", icon: LayoutDashboard },
    { value: "rooms", label: "Rooms", icon: BedDouble },
    { value: "staff", label: "Staff", icon: UserCog },
    { value: "guests", label: "Guests", icon: Users },
    { value: "bookings", label: "Bookings", icon: BookOpen },
  ];

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("overview");

  return (
    <div data-ocid="management.page" className="page-enter space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground font-display flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-primary" />
          Management Panel
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Full CRUD control over rooms, staff, guests, and bookings
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabValue)}
        className="space-y-6"
      >
        <TabsList className="bg-card border border-border h-auto p-1 flex-wrap gap-1">
          {TABS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              data-ocid={`management.tab_${value}`}
              className="gap-2 text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <Icon className="w-4 h-4" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab onTabChange={setActiveTab} />
        </TabsContent>
        <TabsContent value="rooms">
          <ManagementRoomsTab />
        </TabsContent>
        <TabsContent value="staff">
          <ManagementStaffTab />
        </TabsContent>
        <TabsContent value="guests">
          <ManagementGuestsTab />
        </TabsContent>
        <TabsContent value="bookings">
          <ManagementBookingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
