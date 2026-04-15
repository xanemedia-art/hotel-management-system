import { cn } from "@/lib/utils";
import { useHotelStore } from "@/store/useHotelStore";
import type { NavRoute } from "@/types/index";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Building2,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ConciergeBell,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Receipt,
  Settings,
  Shield,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface NavItem {
  label: string;
  path: NavRoute;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: <LayoutDashboard className="w-4.5 h-4.5" />,
  },
  {
    label: "Reservations",
    path: "/reservations",
    icon: <Calendar className="w-4.5 h-4.5" />,
  },
  {
    label: "Front Desk",
    path: "/front-desk",
    icon: <ConciergeBell className="w-4.5 h-4.5" />,
  },
  {
    label: "Housekeeping",
    path: "/housekeeping",
    icon: <Sparkles className="w-4.5 h-4.5" />,
  },
  {
    label: "Billing",
    path: "/billing",
    icon: <Receipt className="w-4.5 h-4.5" />,
  },
  {
    label: "Channel Manager",
    path: "/channel-manager",
    icon: <Globe className="w-4.5 h-4.5" />,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: <BarChart3 className="w-4.5 h-4.5" />,
  },
  {
    label: "Guest CRM",
    path: "/guest-crm",
    icon: <Users className="w-4.5 h-4.5" />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <Settings className="w-4.5 h-4.5" />,
  },
  {
    label: "Management",
    path: "/management",
    icon: <Shield className="w-4.5 h-4.5" />,
  },
];

const routeLabels: Record<string, string> = {
  "/": "Dashboard",
  "/reservations": "Reservations",
  "/front-desk": "Front Desk",
  "/housekeeping": "Housekeeping",
  "/billing": "Billing & Invoicing",
  "/channel-manager": "Channel Manager",
  "/reports": "Reports & Analytics",
  "/guest-crm": "Guest CRM",
  "/settings": "Settings",
  "/management": "Management",
};

export function Layout({ children }: { children: React.ReactNode }) {
  const {
    hotels,
    selectedHotelId,
    setSelectedHotel,
    isDarkMode,
    toggleDarkMode,
    sidebarCollapsed,
    toggleSidebar,
  } = useHotelStore();
  const [showHotelMenu, setShowHotelMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const currentHotel = hotels.find((h) => h.id === selectedHotelId);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.classList.toggle("light", !isDarkMode);
  }, [isDarkMode]);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo area */}
      <div className="flex items-center justify-between px-3 pt-4 pb-3 border-b border-sidebar-border">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm text-sidebar-foreground truncate">
              HMS Pro
            </span>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center mx-auto">
            <Building2 className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
        {!sidebarCollapsed && (
          <button
            type="button"
            onClick={toggleSidebar}
            className="p-1 rounded text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-smooth"
            aria-label="Collapse sidebar"
            data-ocid="sidebar.toggle"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Property Selector */}
      <div className="px-2 py-2 border-b border-sidebar-border">
        <button
          type="button"
          className={cn(
            "w-full flex items-center gap-2 p-2 rounded-lg transition-smooth",
            "hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground",
            sidebarCollapsed && "justify-center",
          )}
          onClick={() => setShowHotelMenu(!showHotelMenu)}
          data-ocid="property.selector"
        >
          <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-3 h-3 text-primary" />
          </div>
          {!sidebarCollapsed && (
            <>
              <span className="text-xs font-medium flex-1 text-left truncate min-w-0">
                {currentHotel?.name ?? "Select Property"}
              </span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 flex-shrink-0 transition-smooth",
                  showHotelMenu && "rotate-180",
                )}
              />
            </>
          )}
        </button>
        {showHotelMenu && !sidebarCollapsed && (
          <div className="mt-1 bg-popover border border-border rounded-lg shadow-elevated overflow-hidden animate-slide-down z-50">
            {hotels.map((hotel) => (
              <button
                key={String(hotel.id)}
                type="button"
                className={cn(
                  "w-full text-left px-3 py-2 text-xs transition-smooth hover:bg-sidebar-accent",
                  hotel.id === selectedHotelId
                    ? "text-primary font-semibold"
                    : "text-sidebar-foreground/70",
                )}
                onClick={() => {
                  setSelectedHotel(hotel.id);
                  setShowHotelMenu(false);
                }}
                data-ocid={`property.option.${Number(hotel.id)}`}
              >
                {hotel.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.path ||
            (item.path !== "/" && currentPath.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth cursor-pointer",
                "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                isActive && "bg-primary/10 text-primary hover:bg-primary/15",
                sidebarCollapsed && "justify-center px-2",
              )}
              data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className={cn("flex-shrink-0", isActive && "text-primary")}>
                {item.icon}
              </span>
              {!sidebarCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: collapse toggle when expanded */}
      {sidebarCollapsed && (
        <div className="px-2 py-3 border-t border-sidebar-border">
          <button
            type="button"
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-2 rounded-lg text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-smooth"
            aria-label="Expand sidebar"
            data-ocid="sidebar.expand"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
          role="presentation"
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border transition-smooth overflow-hidden flex-shrink-0",
          sidebarCollapsed ? "w-16" : "w-60",
        )}
        data-ocid="sidebar.panel"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border w-60 transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
          <span className="font-bold text-sm text-sidebar-foreground">
            HMS Pro
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded text-sidebar-foreground/50 hover:text-sidebar-foreground"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {sidebarContent}
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top nav */}
        <header className="flex items-center justify-between px-4 lg:px-6 h-14 bg-card border-b border-border flex-shrink-0 shadow-subtle z-10">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              type="button"
              className="lg:hidden p-1.5 rounded text-foreground/60 hover:text-foreground hover:bg-muted transition-smooth"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              data-ocid="mobile.menu_button"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-semibold text-foreground leading-tight">
                {routeLabels[currentPath] ?? "Hotel Management"}
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {currentHotel?.name ?? "All Properties"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              aria-label="Toggle dark mode"
              data-ocid="theme.toggle"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth relative"
              aria-label="Notifications"
              data-ocid="notifications.button"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-border ml-1">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-foreground leading-tight">
                  Admin
                </p>
                <p className="text-xs text-muted-foreground">admin@hms.in</p>
              </div>
              <button
                type="button"
                className="p-1 rounded text-muted-foreground hover:text-foreground transition-smooth"
                aria-label="Sign out"
                data-ocid="user.logout_button"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          className="flex-1 overflow-y-auto bg-background"
          data-ocid="main.content"
        >
          <div className="p-4 lg:p-6 page-enter">{children}</div>
        </main>

        {/* Footer */}
        <footer className="px-4 lg:px-6 py-2.5 border-t border-border bg-card/50 flex-shrink-0">
          <p className="text-xs text-muted-foreground text-center">
            Built with love by Xane Media
          </p>
        </footer>
      </div>
    </div>
  );
}
