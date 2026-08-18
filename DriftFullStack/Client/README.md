## Progress

### 1. Routing

* Implemented application routing in `App.tsx`.

### 2. Navbar

* Created and integrated the `Navbar` component.

### 3. Constants and Types

* Created reusable constant variables.
* Defined constant arrays and TypeScript types for better code organization and type safety.

### 4. Login Page

* Created the login page.
* Used controlled components to manage form input values with React state.
* Used `useMutation` to send the login request to the backend.
* Added toast notifications to indicate whether the login was successful or failed.

### 5. Axios Instance

* Created a reusable Axios instance.
* Configured an Axios request interceptor to automatically attach the JWT token to every outgoing request.

### 6. New Entry Page

* Implemented the entry form with geolocation capture.
* Used the browser's `navigator.geolocation` API to retrieve the user's current latitude and longitude.
* Used `useMutation` to submit the entry data through the `createEntry` function.
* Added `onSuccess` and `onError` handlers to display appropriate toast notifications.
* Defined the `entryDetailsType` TypeScript type for the entry data.
* The entry details include:

  * `content`
  * `mood`
  * `lat`
  * `lng`
* Integrated the following POST endpoint:

```typescript
export const ADD_ENTRY_API = "/entries";
```
