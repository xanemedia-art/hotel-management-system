# Firebase Backend Migration Plan

## Goal

Migrate the current Hotel Management System frontend from a local mock/state-only backend to a real Firebase backend using Firestore for persistence and optional Firebase Auth for user security.

The current app is primarily a frontend mock layer:
- `src/frontend/src/hooks/useBackend.ts` reads from `useHotelStore`
- `src/frontend/src/store/useHotelStore.ts` stores all app entities in Zustand + sample data
- `src/frontend/src/backend.ts` is a generated ICP/Candid file and not actually used by the app logic

## Recommended Firebase Architecture

1. Firebase services
   - Firestore: primary data storage for hotels, rooms, bookings, guests, staff, housekeeping tasks, folios, channel configs, analytics, activity feed
   - Firebase Auth: optional for staff login / permissions
   - Firebase Hosting: optional for deploying the frontend
   - Cloud Functions: optional for server-side business logic, notifications, or batch operations

2. Data model mapping
   - `hotels` collection
   - `rooms` collection
   - `guests` collection
   - `bookings` collection
   - `staff` collection
   - `housekeepingTasks` collection
   - `folios` collection
   - `channelConfigs` collection
   - `analytics` collection
   - `activityFeed` collection

3. Data conversion
   - Firestore does not support `bigint` directly
   - Store IDs and timestamps as strings or numbers
   - Provide conversion helpers: Firestore document → frontend type, and frontend type → Firestore payload

## High-level Plan

### Phase 0: Prep and cleanup

1. Audit current repository usage of backend bindings
   - Confirm that `src/frontend/src/backend.ts` and `@/backend` imports are only used for type definitions
   - Identify any remaining ICP/`candid` references

2. Decide migration scope
   - Full replacement of mock data layer with Firestore
   - Or hybrid mode: use Firestore for core entities and keep `useHotelStore` for UI-only state

3. Add Firebase dependency
   - Install `firebase` in `src/frontend` package
   - Example: `pnpm add firebase`

4. Remove/disable unused backend generation if no longer needed
   - `package.json` root script `bindgen` can stay for reference, but it is not part of Firebase
   - If backend DID integration is not required, stop treating `src/frontend/src/backend.ts` as app source

### Phase 1: Firebase project setup

1. Create Firebase project
   - `firebase init` in the frontend folder or root if using Hosting
   - Enable Firestore and Auth if needed

2. Configure Firebase
   - Add Firebase config to `src/frontend/src/firebase/firebaseConfig.ts`
   - Use environment variables for API key, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId
   - Add `.env` or Vite env support in `src/frontend/env.json` as appropriate

3. Initialize Firebase client
   - Create `src/frontend/src/firebase/firebaseClient.ts`
   - Export `app`, `db`, and `auth` instances

### Phase 2: Build Firestore data layer

1. Create Firestore service module
   - `src/frontend/src/firebase/firestoreService.ts`
   - Add methods for CRUD operations and queries for each collection
   - Example methods:
     - `getHotels()` / `getHotel(id)`
     - `getRooms(hotelId)`
     - `getBookings(hotelId)`
     - `createBooking(data)`
     - `updateBooking(id, data)`
     - `checkInBooking(id)` / `checkOutBooking(id)`
     - `createGuest(data)` / `updateGuest(id, data)`

2. Add conversion helpers
   - `src/frontend/src/firebase/firestoreConverters.ts`
   - Convert stored Firestore values to frontend types, particularly for IDs and timestamps
   - Example converter shape:
     - `docToBooking(doc)`
     - `bookingToFirestore(booking)`

3. Use typed Firestore models
   - Keep current frontend types in `src/frontend/src/types/index.ts`
   - If needed, create a second layer that maps Firestore shapes to frontend types

4. Add generic hooks or utilities
   - `src/frontend/src/hooks/useFirestoreCollection.ts`
   - Provide reusable React Query + Firestore logic
   - Example: `useFirestoreQuery(queryRef, transform)` and `useFirestoreMutation(action)`

### Phase 3: Replace current data hooks

1. Update `useBackend.ts`
   - Replace `useHotelStore()` reads with Firestore-backed query functions
   - Example:
     - `useHotels()` → `useQuery(['hotels'], () => firestoreService.getHotels())`
     - `useRooms(hotelId)` → `useQuery(['rooms', hotelId], () => firestoreService.getRooms(hotelId))`

2. Update mutation hooks
   - Change `useCreateBooking()` / `useUpdateBooking()` / `useCheckIn()` / `useCheckOut()` etc. to call Firestore methods
   - Use React Query `onSuccess` to invalidate related queries

3. Keep UI state separate
   - Leave `useHotelStore` for UI state only if desired: `isDarkMode`, `sidebarCollapsed`, `selectedHotelId`
   - Remove domain state from Zustand if fully moving to Firestore

4. Remove sample data as active state
   - Keep sample data only for Firestore seed scripts or local development seeding
   - Optionally add import script that writes sample data into Firestore for initial setup

### Phase 4: Security and rules

1. Write Firestore security rules
   - Restrict read/write access based on auth status or role
   - Ensure staff can only access allowed hotel data if multi-tenant
   - Example rules:
     - `allow read: if request.auth != null;`
     - `allow write: if request.auth.token.role == 'admin'`

2. Add auth flows if needed
   - `src/frontend/src/firebase/authService.ts`
   - Use Firebase Auth for staff login, role-based UI, and permissions

3. Set up indexes
   - Firestore queries that filter by `hotelId` and sort by `checkIn` may require composite indexes
   - Add them via Firebase console or `firestore.indexes.json`

### Phase 5: Migration and testing

1. Seed Firestore
   - Create migration script to upload sample data into Firestore
   - Use the existing sample objects as seed values

2. Run local tests
   - Verify queries return the expected data
   - Confirm bookings, guests, rooms, and housekeeping actions work correctly
   - Test edge cases: missing hotel, invalid IDs, offline fallback if supported

3. Update deployment pipelines
   - If using Firebase Hosting, add `firebase deploy`
   - If using other hosting, ensure environment variables are present

4. Remove unused backend pieces
   - Delete or ignore `src/frontend/src/backend.ts` if not used
   - Remove any `@/backend` imports from frontend files
   - Clean up root `bindgen` script if backend integration is abandoned

## Detailed Task Breakdown

### Task 1: Firebase project and SDK setup

- Create Firebase project in the Firebase console
- Run `pnpm add firebase` in `src/frontend`
- Create `src/frontend/src/firebase/firebaseConfig.ts`
- Create `src/frontend/src/firebase/firebaseClient.ts`
- Add env definitions for Firebase config

### Task 2: Firestore schema design

- Define collections
- Decide ID strategy:
  - Use Firestore auto IDs or string IDs generated by frontend
  - Convert all current `bigint` IDs to string IDs in Firestore
- Decide timestamp strategy:
  - Use Firestore `Timestamp` or numeric `Date.now()` values
- Add schema helpers for repeated fields like `hotelId`, `roomId`, `guestId`

### Task 3: Data service implementation

- Implement `firestoreService.ts`
- Add collection-specific CRUD methods
- Add helper functions for converting Firestore docs to frontend types
- Add hooks for queries and mutations

### Task 4: Migrate query hooks

- Rewrite `useHotels()`
- Rewrite `useRooms()`
- Rewrite `useGuests()`
- Rewrite `useBookings()`
- Rewrite `useStaff()`
- Rewrite `useHousekeepingTasks()`
- Rewrite `useFolios()`
- Rewrite `useChannelConfigs()`
- Rewrite `useAnalytics()`

### Task 5: Migrate mutations

- Rewrite create/update hooks for all entities
- Implement booking state changes with Firestore and query invalidation
- Ensure `useCheckIn()` / `useCheckOut()` update Firestore correctly

### Task 6: Clean up mock data and store

- Remove domain entities from `useHotelStore` if not needed
- Keep only UI state in Zustand if desired
- Remove sample data from production path

### Task 7: Security and auth

- Add Firebase Auth if required
- Protect Firestore using rules
- Add staff roles and authenticated access

### Task 8: Testing and deployment

- Seed Firestore with sample data
- Verify each page and workflow against Firestore data
- Deploy frontend and validate the live app

## Key Migration Notes for This Repo

- `src/frontend/src/hooks/useBackend.ts` is the central migration point
- `src/frontend/src/store/useHotelStore.ts` currently contains all fake backend state
- `src/frontend/src/backend.ts` is generated from Candid and is not part of the Firebase architecture
- `src/frontend/src/App.tsx` currently wraps the app in React Query and router; the React Query setup is already suitable for Firestore-backed queries

## Suggested Firebase File Structure

```
src/frontend/src/firebase/
  firebaseConfig.ts
  firebaseClient.ts
  firestoreService.ts
  firestoreConverters.ts
  authService.ts
  firestoreHooks.ts
```

## Example Firebase service signature

```ts
export async function getHotels() {
  const snapshot = await getDocs(collection(db, "hotels"));
  return snapshot.docs.map(docToHotel);
}

export async function createBooking(data: CreateBookingArgs) {
  const bookingRef = await addDoc(collection(db, "bookings"), bookingToFirestore(data));
  return { id: bookingRef.id, ...data };
}
```

## Timeline Proposal

1. Week 1: Firebase project setup, SDK install, config file, and Firestore schema design
2. Week 2: Implement Firestore service layer and migration of query hooks
3. Week 3: Migrate mutation hooks, test workflows, and add auth/rules
4. Week 4: Seed data, QA, cleanup, and deployment

## Recommended Follow-up

- Add a dedicated integration layer instead of sprinkling Firestore calls throughout the app
- Keep UI state local and domain data remote
- Build a `seedFirestore.ts` script using `src/frontend/src/data/sampleData.ts`
- Consider Firebase Cloud Functions if booking logic becomes complex

---

This plan gives you a concrete migration path from the current mock data frontend to a Firestore-backed backend. If you want, I can also generate the first version of `firebaseClient.ts` + `firestoreService.ts` and the updated `useBackend.ts` hook implementations.