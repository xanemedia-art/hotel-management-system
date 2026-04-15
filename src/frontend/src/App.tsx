import { Layout } from "@/components/Layout";
import { SkeletonPage } from "@/components/ui/LoadingSkeleton";
import { useHotelStore } from "@/store/useHotelStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Component, Suspense, lazy, useEffect } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Toaster } from "sonner";

// ─── Error Boundary ───────────────────────────────────────────────────────────

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[HMS ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-card border border-border rounded-xl p-8 text-center shadow-lg">
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl" role="img" aria-label="error">
                ⚠️
              </span>
            </div>
            <h1 className="text-xl font-bold text-foreground mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              {this.state.error?.message ?? "An unexpected error occurred."}
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── App setup ────────────────────────────────────────────────────────────────

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ReservationsPage = lazy(() => import("@/pages/ReservationsPage"));
const FrontDeskPage = lazy(() => import("@/pages/FrontDeskPage"));
const HousekeepingPage = lazy(() => import("@/pages/HousekeepingPage"));
const BillingPage = lazy(() => import("@/pages/BillingPage"));
const ChannelManagerPage = lazy(() => import("@/pages/ChannelManagerPage"));
const ReportsPage = lazy(() => import("@/pages/ReportsPage"));
const GuestCRMPage = lazy(() => import("@/pages/GuestCRMPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const ManagementPage = lazy(() => import("@/pages/ManagementPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, retry: 1 },
  },
});

function PageWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<SkeletonPage />}>{children}</Suspense>;
}

function RootComponent() {
  const isDarkMode = useHotelStore((s) => s.isDarkMode);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);
  return (
    <Layout>
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </Layout>
  );
}

const rootRoute = createRootRoute({ component: RootComponent });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});
const reservationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reservations",
  component: ReservationsPage,
});
const frontDeskRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/front-desk",
  component: FrontDeskPage,
});
const housekeepingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/housekeeping",
  component: HousekeepingPage,
});
const billingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/billing",
  component: BillingPage,
});
const channelManagerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/channel-manager",
  component: ChannelManagerPage,
});
const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: ReportsPage,
});
const guestCRMRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/guest-crm",
  component: GuestCRMPage,
});
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});
const managementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/management",
  component: ManagementPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  reservationsRoute,
  frontDeskRoute,
  housekeepingRoute,
  billingRoute,
  channelManagerRoute,
  reportsRoute,
  guestCRMRoute,
  settingsRoute,
  managementRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            className: "bg-card border border-border text-foreground text-sm",
          }}
          richColors
        />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
