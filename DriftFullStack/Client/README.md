## Progress

### 1. Routing

- Implemented application routing in `App.tsx`.

### 2. Navbar

- Created and integrated the `Navbar` component.

### 3. Constants and Types

- Created reusable constant variables.
- Defined constant arrays and TypeScript types for better code organization and type safety.

### 4. Login Page

- Created the login page.
- Used controlled components to manage form input values with React state.
- Used `useMutation` to send the login request to the backend.
- Added toast notifications to indicate whether the login was successful or failed.

### 5. Axios Instance

- Created a reusable Axios instance.
- Configured an Axios request interceptor to automatically attach the JWT token to every outgoing request.

### 6. New Entry Page

- Implemented the entry form with geolocation capture.
- Used the browser's `navigator.geolocation` API to retrieve the user's current latitude and longitude.
- Used `useMutation` to submit the entry data through the `createEntry` function.
- Added `onSuccess` and `onError` handlers to display appropriate toast notifications.
- Defined the `entryDetailsType` TypeScript type for the entry data.
- The entry details include:
  - `content`
  - `mood`
  - `lat`
  - `lng`

- Integrated the following POST endpoint:

```typescript
export const ENTRY_API = "/entries";
```

### 7. Entries Page

- Implemented the Entries page to fetch and display the user's entries.
- Used TanStack Query's `useQuery` for API data fetching and caching.
- Added loading state with Tailwind CSS skeleton/shimmer UI.
- Added error handling with a retry option using `refetch()`.
- Added an empty state when no entries are available.
- Displayed entry details including:
  - Location
  - Time of day
  - Content
  - Mood
  - Weather
  - Temperature
- Used `useNavigate` to navigate to the New Entry page.
- Added dynamic entry card styling and hover animations.
- Used TypeScript types for type-safe API responses.
