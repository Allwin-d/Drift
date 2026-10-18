# Drift Client

This is the frontend application for Drift, a personal journaling app designed to capture context around each written entry — including location, weather, and time of day — so users can identify patterns in their mood and habits over time.

The client is built with React + TypeScript + Vite and uses Tailwind CSS for styling, React Router for navigation, TanStack Query for data fetching, and Leaflet for geo-visualization.

## Overview

Drift turns journaling into a spatial and emotional timeline. Every entry can be tied to a location, and the app is structured around the idea of turning personal reflections into something viewable, searchable, and analyzable over time.

Core concepts in the frontend:
- Authentication flow for existing users and new accounts
- Journal entry creation with geolocation capture
- Entry listing and detail views
- Map-based visualization of entries
- Dashboard/insight-oriented surfaces for future analytics

## Key Features Added

### 1. Authentication UI
- Login page with controlled form inputs
- Register page for creating a new user account
- Toast-based feedback for success and failure states
- JWT-aware API handling through a reusable Axios instance

### 2. Entry Creation and Geolocation
- New entry form for writing journal content
- Mood rating (1–5 scale)
- Browser geolocation capture via `navigator.geolocation`
- Automatic collection of latitude and longitude
- API submission through the `/entries` endpoint
- Redirect after successful entry save

### 3. Entry Listing and Detail Experience
- Entries page that fetches and displays saved journal records
- Loading, empty, and error states
- Structured card layout showing:
  - content
  - mood
  - weather
  - temperature
  - time of day
  - location context
- Route navigation to the full entry detail screen

### 4. Map Visualization
- Dedicated map page under `src/pages/Map/Map.tsx`
- Uses `react-leaflet` and Leaflet to render a map
- Displays a custom marker icon for the current location
- Provides a popup on marker click
- Uses OpenStreetMap tiles for map background data
- Designed to support visualization of journal entries across locations

### 5. Routing and Navigation
- App-level routing configured in `App.tsx`
- Routes include:
  - `/` → Login
  - `/register` → Register
  - `/entries` → Journal entries list
  - `/entries/new` → Create a new entry
  - `/entryDetail/:id` → Individual entry detail
  - `/dashboard` → Dashboard screen
  - `/map` → Map view

### 6. Shared Frontend Structure
- Reusable constants and labels are centralized in `src/constants/constantVariables.ts`
- Utility helpers are placed in `src/utils`
- API communication is managed in `src/api`
- UI components include `Navbar` and other reusable frontend blocks

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- TanStack Query
- Leaflet + React Leaflet
- React Hot Toast
- React Icons

## Client Folder Structure

```bash
Client/
├─ README.md
├─ package.json
├─ vite.config.ts
├─ tailwind.config.js
├─ postcss.config.js
├─ index.html
├─ public/
├─ src/
│  ├─ api/
│  ├─ assets/
│  ├─ components/
│  ├─ constants/
│  ├─ pages/
│  │  ├─ Login/
│  │  ├─ Register/
│  │  ├─ Entries/
│  │  ├─ NewEntry/
│  │  ├─ EntryDetail/
│  │  ├─ Map/
│  │  └─ Dashboard.tsx
│  ├─ url/
│  ├─ utils/
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
└─ node_modules/
```

## Main Frontend Flow

1. User signs in or registers.
2. User writes a journal entry and captures location + mood.
3. Entry is submitted to the backend via the API layer.
4. The entry appears in the entries list.
5. The app can surface the entry on the map and in later analytics-focused views.

## Local Development

From the `Client` folder:

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal (usually `http://localhost:5173`).

## Production Build

```bash
npm run build
```

## Notes

This client is actively evolving around the Drift concept of journaling as place-aware memory. The map and geolocation work are especially important because they connect user reflections to a physical context, which is a core part of the product vision.

The app is already structured for future analytics expansion, including correlation and insight views based on weather, location, time, and emotional state.
