# Drift Server

This is the backend API for Drift, the personal journaling application that connects user entries to place, time, weather, and emotional context. The server handles authentication, journal entry creation, weather/geolocation enrichment, and secure data persistence with MongoDB.

The backend is built with Node.js, Express, TypeScript, and Mongoose, and exposes REST endpoints for the frontend client.

## Overview

Drift is designed around a core idea: every journal entry should be more than plain text. The backend captures and stores context such as:
- user identity
- journal content
- mood score
- geolocation coordinates
- readable place name
- weather details
- time-of-day classification
- creation time

This makes later features like entry analysis, map views, and personal insights possible.

## Main Backend Features

### 1. User Authentication
- User registration with hashed password storage
- Login with email/password validation
- JWT token generation on successful login
- Protected routes using an authorization middleware
- Error handling for invalid, expired, or missing tokens

### 2. Journal Entry Management
- Create entries for authenticated users
- Fetch all entries for a user
- Fetch a single entry by ID
- Delete entries with ownership validation
- Filter entries by mood and paginate results

### 3. Geolocation + Reverse Geocoding
- Accepts latitude and longitude from the client
- Uses Nominatim/OpenStreetMap reverse geocoding to determine place information
- Builds a readable `placeName` such as `City, State`

### 4. Weather Integration
- Calls the OpenWeather API based on user location
- Stores weather information like:
  - temperature
  - weather condition
  - weather icon
- Helps connect mood and journaling to real-world environmental context

### 5. Time-of-Day Classification
- Determines the session of the day based on the current hour
- Stores a `timeOfDay` value in the entry
- Supports later pattern analysis (for example: morning reflections vs evening journaling)

### 6. Data Validation and Security
- Input validation using Zod schemas
- Protected API routes with JWT verification
- Rate limiting on login requests
- CORS enabled for the frontend origin
- Ownership checks before deleting or accessing another user’s entry

## API Structure

### Auth Routes
Base path: `/api/auth`

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive JWT token

### Entry Routes
Base path: `/api/entries`

- `GET /api/entries` — fetch user entries
- `POST /api/entries` — create a new journal entry
- `GET /api/entries/:id` — fetch a single entry
- `DELETE /api/entries/:id` — delete an entry

## Server Architecture

```bash
Server/
├─ README.md
├─ package.json
├─ tsconfig.json
├─ src/
│  ├─ Config/
│  ├─ Controllers/
│  │  ├─ authControllers/
│  │  └─ entryControllers/
│  ├─ Db/
│  ├─ Middleware/
│  │  ├─ auth.middleware.ts
│  │  ├─ errorHandler.middleware.ts
│  │  └─ rateLimiter.middleware.ts
│  ├─ Models/
│  │  ├─ UserModel/
│  │  └─ EntrySchema/
│  ├─ Routes/
│  │  ├─ authRoutes/
│  │  └─ entryRoutes/
│  ├─ Services/
│  │  ├─ geoCoding/
│  │  └─ weather/
│  ├─ Types/
│  ├─ Utils/
│  ├─ Validations/
│  ├─ server.ts
│  └─ ...
```

## Database Design

### User Model
Stores:
- `name`
- `email`
- `passwordHash`
- `createdAt`

### Entry Model
Stores:
- `userId`
- `content`
- `mood`
- `location`
- `placeName`
- `weather`
- `timeOfDay`
- `createdAt`

The entry is linked to a specific user so each user can only access their own journal records.

## External Services Used

### OpenStreetMap / Nominatim
Used for reverse geocoding:
- converts latitude/longitude into readable regional information
- helps identify locality and state

### OpenWeather API
Used for live weather data:
- temperature in Celsius
- condition name
- icon code

## Security and Reliability

The backend includes the following protections and quality checks:
- hashed passwords using bcrypt
- JWT-based authorization
- request validation with Zod
- token verification middleware
- rate limiting on login route
- ownership checks for sensitive actions
- structured error responses

## Environment Variables

The server depends on environment variables such as:

```bash
PORT=6969
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
OPEANWEATHER_API_KEY=your_weather_api_key
```

## Local Development

From the `Server` folder:

```bash
npm install
npm run dev
```

The server starts on:

```bash
http://localhost:6969
```

## Production Build

```bash
npm run build
```

## Notes

This backend is the foundation for Drift’s “memory map” concept: journal entries are stored with context, not just text. That allows the frontend and future analytics features to reconstruct user behavior across locations, weather conditions, and time-of-day patterns.

The current server is focused on the MVP flow: authentication, secure journal entry storage, weather/geolocation enrichment, and protected access to each user’s data.
