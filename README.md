# Drift

Drift is a personal journaling and geospatial reflection app that captures the context around each entry — including location, weather, time of day, and emotional mood — and helps users discover patterns over time.

The core idea is simple: instead of writing a journal as isolated text, Drift turns each entry into a meaningful moment tied to a place and environment. Over time, users can spot patterns like:
- when they feel most positive
- which places lift their mood
- whether weather or time of day affects their writing
- which locations show up most often in their journal history

## Product Vision

Drift sits between a journaling app and a personal geospatial analytics tool. It is part reflective diary, part location-aware memory map, and part self-awareness dashboard.

Examples of the product experience:
- write an entry from your current location
- automatically capture GPS coordinates
- fetch the current weather and place name
- record your mood and time of day
- revisit entries in a timeline or on a map
- later identify emotional patterns by place and season

## Project Structure

```bash
Drift/
├─ README.md
├─ DriftFullStack/
│  ├─ Client/
│  │  ├─ README.md
│  │  ├─ package.json
│  │  ├─ src/
│  │  ├─ public/
│  │  └─ ...
│  └─ Server/
│     ├─ README.md
│     ├─ package.json
│     ├─ src/
│     └─ ...
```

## Tech Stack

### Client
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Leaflet
- TanStack Query
- Axios
- React Hot Toast
- React Icons

### Server
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT authentication
- bcrypt
- Axios
- Zod validation
- OpenStreetMap / Nominatim
- OpenWeather API

## Features

### Frontend
- user login and registration
- journal entry creation with mood tracking
- geolocation capture
- map visualization of entries
- entry listing and detail views
- dashboard and insight-oriented screens for future analytics

### Backend
- secure user authentication
- protected journal APIs
- journal CRUD operations
- reverse geocoding for place names
- weather retrieval by coordinates
- time-of-day classification
- pagination and filters for entries
- MongoDB persistence

## How Drift Works

1. A user logs into the app.
2. They write a journal entry and rate their mood.
3. The client captures the user’s current latitude and longitude.
4. The backend enriches the entry with:
   - nearby place information
   - weather details
   - time-of-day label
5. The data is stored in MongoDB.
6. The frontend can later show entries on a map and in timeline-based views.

## Local Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd Drift
```

### 2. Start the backend

```bash
cd DriftFullStack/Server
npm install
npm run dev
```

### 3. Start the frontend

```bash
cd ../Client
npm install
npm run dev
```

The frontend should run on a local Vite port (usually `http://localhost:5173`), and the backend should run on `http://localhost:6969`.

## Environment Variables

The backend requires environment variables such as:

```bash
PORT=6969
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
OPEANWEATHER_API_KEY=your_weather_api_key
```

## Notes

This project is currently structured as a full-stack MVP focused on the core Drift experience: journaling with location-aware context. The architecture is designed to support future analytics features, including weather-based insights, emotional trend analysis, and geographic pattern discovery.

The app is built as a foundation for turning personal memories into structured, meaningful data.
