# Hotel Management System Architecture

## Overview
This repository is structured as a full-stack Caffeine/DFINITY-style application, but the current checked-in workspace is primarily a frontend UI with generated backend bindings.

- Root-level `package.json` includes a `bindgen` script to generate frontend backend bindings from a Candid `.did` file.
- `src/frontend` contains the actual React app, data store, and UI pages.
- `src/backend` is present in the workspace but currently empty; backend source code is not included here.

## Backend Setup

### 1. Bindgen and generated bindings

The backend integration is defined by a Candid interface file:

- `src/backend/dist/backend.did`

The root `package.json` defines:

```json
"bindgen": "caffeine-bindgen --did-file ./src/backend/dist/backend.did --out-dir ./src/frontend/src --actor-interface-file --force"
```

This command generates:

- `src/frontend/src/backend.ts`
- `src/frontend/src/declarations/backend.did.d.ts`
- `src/frontend/src/declarations/backend.did.js`

Those generated files expose the backend service interface and client-side actor wrapper.

### 2. Generated frontend backend file

The file `src/frontend/src/backend.ts` is auto-generated and includes:

- Candid type definitions for entities such as `HotelView`, `RoomView`, `GuestView`, `BookingView`, `ChannelConfigView`, and others.
- Enum definitions like `BookingStatus`, `RoomStatus`, `StaffRole`, `SyncStatus`, `TaskStatus`, `OTAChannel`, `PaymentMethod`, etc.
- A `Backend` class implementing the generated `backendInterface`.
- A `createActor(canisterId, uploadFile, downloadFile, options)` function that creates an actor using `@icp-sdk/core`.

It also supports remote assets using `ExternalBlob` and Candid conversion helpers.

### 3. Backend actor creation and environment

Backend actor creation is configured by environment variables and Vite plugin handling:

- `src/frontend/env.json`
  - `backend_host`
  - `backend_canister_id`
  - `project_id`
  - `ii_derivation_origin`

- `src/frontend/vite.config.js`
  - Uses `vite-plugin-environment` to expose `CANISTER_*` and `DFX_*` variables.
  - Sets `II_URL` and `STORAGE_GATEWAY_URL` defaults.
  - Proxies `/api` to `http://127.0.0.1:4943` during development.

The generated `createActor` function can use either a provided `Agent` or `HttpAgentOptions`.

### 4. Backend status in this workspace

- The backend service source code is not present in `src/backend`.
- The frontend can still compile against generated types and actor bindings.
- No actual backend actor calls are currently used in the app source.

## Frontend Architecture

### 1. App entrypoint and routing

- `src/frontend/src/App.tsx`
  - Sets up `@tanstack/react-router` routes.
  - Wraps the application in a `QueryClientProvider` from `@tanstack/react-query`.
  - Uses an `ErrorBoundary` around the app.
  - Lazily loads main pages: `DashboardPage`, `ReservationsPage`, `FrontDeskPage`, `HousekeepingPage`, `BillingPage`, `ChannelManagerPage`, `ReportsPage`, `GuestCRMPage`, `SettingsPage`, and `ManagementPage`.

### 2. State management and sample data

- `src/frontend/src/store/useHotelStore.ts`
  - Uses `zustand` with `persist` middleware.
  - Stores application state for:
    - `hotels`
    - `rooms`
    - `guests`
    - `bookings`
    - `staff`
    - `housekeepingTasks`
    - `folios`
    - `channelConfigs`
    - `analyticsData`
    - `activityFeed`
    - `selectedHotelId`
    - UI state: `isDarkMode`, `sidebarCollapsed`
  - Provides actions to add, update, and remove entities.
  - Persists only a small subset of UI state to `localStorage`.

- `src/frontend/src/data/sampleData.ts`
  - Contains seeded sample entities for hotels, rooms, guests, bookings, staff, housekeeping tasks, folios, channel configs, analytics, and activity feed.
  - Uses generated backend enums such as `BookingStatus`, `RoomStatus`, `RoomType`, `StaffRole`, `GuestTag`, `OTAChannel`, `SyncStatus`, and `PaymentMethod`.

- `src/frontend/src/types/index.ts`
  - Re-exports backend-generated view types as frontend-friendly aliases:
    - `Hotel`, `Room`, `Guest`, `Booking`, `Staff`, `HousekeepingTask`, `Folio`, `ChannelConfig`, `AnalyticsData`, and others.
  - Adds frontend-only types like `User`, `ActivityFeedItem`, and `NavRoute`.

### 3. Data access hooks

- `src/frontend/src/hooks/useBackend.ts`
  - Implements React Query hooks that read from the Zustand store.
  - Query hooks return cached store values and use `initialData` from the store.
  - Mutation hooks update the store and invalidate query keys.

Main hooks include:

- `useHotels()`
- `useRooms(hotelId)`
- `useGuests()`
- `useBookings(hotelId)`
- `useStaff(hotelId)`
- `useHousekeepingTasks(hotelId)`
- `useFolios(hotelId)`
- `useChannelConfigs(hotelId)`
- `useAnalytics(hotelId)`

Mutation hooks include:

- `useCreateBooking()` / `useUpdateBooking()`
- `useCheckIn()` / `useCheckOut()`
- `useCreateRoom()` / `useUpdateRoom()`
- `useCreateGuest()` / `useUpdateGuest()`
- `useCreateStaff()` / `useUpdateStaff()`
- `useCreateHousekeepingTask()` / `useUpdateHousekeepingTask()`
- `useCreateChannelConfig()` / `useUpdateChannelConfig()`
- `useUpdateHousekeepingTask()`

### 4. How frontend uses backend types

The frontend imports types and enum values from the generated backend module:

- `import { BookingStatus, RoomStatus, StaffStatus, ... } from "@/backend"`
- `import type { CreateBookingArgs, UpdateBookingArgs, ... } from "@/backend"`

These imports are used throughout the app to keep mock store data consistent with backend service definitions.

### 5. UI and pages

The app is composed of pages and UI components under:

- `src/frontend/src/pages/*`
- `src/frontend/src/components/*`
- `src/frontend/src/components/ui/*`

Pages use the data hooks and store values to render hotel management screens.

### 6. Current data flow

The actual front-end data flow is:

1. `useHotelStore` is initialized with `sampleData`.
2. UI components read from the store via React Query hooks in `useBackend.ts`.
3. Mutations update the Zustand store directly.
4. Pages and components consume query results and render hotel management UI.

This means the app currently behaves as a local/mock frontend experience rather than a live backend-driven system.

## Key files to inspect

- `package.json`
- `src/backend/dist/backend.did`
- `src/frontend/src/backend.ts`
- `src/frontend/src/declarations/backend.did.d.ts`
- `src/frontend/src/App.tsx`
- `src/frontend/src/store/useHotelStore.ts`
- `src/frontend/src/hooks/useBackend.ts`
- `src/frontend/src/data/sampleData.ts`
- `src/frontend/src/types/index.ts`
- `src/frontend/vite.config.js`
- `src/frontend/env.json`

## Notes for next steps

- To enable real backend integration, implement the backend service in `src/backend`, generate the DID and bindings with `pnpm bindgen`, and use `createActor(...)` or generated actor methods from `src/frontend/src/backend.ts`.
- If backend source is not available locally, the current app will remain a mock data-driven frontend.
