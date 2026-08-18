# Backend Progress

## 1. Server Setup

* Configured the Express server in `server.ts`.
* Initialized the application using Express.
* Started the server on **Port 6969**.

## 2. Database Configuration

* Created a `DB` folder.
* Added a `db.ts` file to manage the MongoDB database connection.
* Configured the database connection using MongoDB credentials.

## 3. User Schema

* Created the `User` schema inside the `Model` folder.
* The schema includes the following fields:

  * `name`
  * `email`
  * `password`
  * `createdAt`

### Validation

* `name`, `email`, and `password` are required.
* `email` is unique to prevent duplicate user registrations.

## 4. Authentication

### Register

* Implemented user registration functionality.
* Passwords are securely hashed using **bcrypt** before being stored in the database.

### Login

* Implemented user login functionality.
* Verified user credentials using **bcrypt**.
* Generated a JWT (JSON Web Token) upon successful authentication.
* Returned the JWT in the response for client-side authentication.

## 5. Entry Schema

* Created the `Entry` schema to store journal entries.
* The schema includes the following fields:

  * `userId`
  * `content`
  * `mood`
  * `location`
  * `placeName`
  * `weather`
  * `timeOfDay`
  * `createdAt`

## 6. External Services

### 6.1 Geocoding Service

* Created a reusable `geoCoding` service to retrieve location information from latitude and longitude.
* Integrated the **Nominatim OpenStreetMap Reverse Geocoding API**.
* Used Axios to make the API request.
* Passed the following parameters:

  * `lat` — Latitude
  * `lon` — Longitude
  * `format=json` — Returns the response in JSON format.
* Added a custom `User-Agent` header as required by the Nominatim service.
* Defined a TypeScript type (`geoCodingType`) for the API response.
* Added error handling for unavailable or failed geocoding requests.

### 6.2 Weather Service

* Created a reusable `getWeather` service to retrieve weather information based on latitude and longitude.
* Integrated the **OpenWeather API**.
* Used Axios to make the API request.
* Retrieved the API key from the environment variables using:

```typescript
process.env.OPEANWEATHER_API_KEY
```

* Configured the API to return temperature values in **Celsius** using `units=metric`.
* Defined a TypeScript type (`getWeatherType`) for the API response.
* Added error handling for unavailable or failed weather requests.

## 7. Create Entry API

* Implemented the `createEntry` controller.
* Added the required **middleware, route, and controller** for creating journal entries.
* Extracted the authenticated user's ID from `req.user`.
* Accepted the following data from the request body:

  * `content`
  * `mood`
  * `lat`
  * `lng`

### Geolocation and Weather Integration

* Integrated the **Geocoding Service** to convert latitude and longitude into readable location information.
* Integrated the **Weather Service** to retrieve current weather information based on the user's coordinates.
* Used `Promise.all()` to call both services concurrently:

```typescript
const [geoLocationDataResponse, weatherDataResponse] = await Promise.all([
  geoCoding(lat, lng),
  getWeather(lat, lng),
]);
```

* Extracted the state from the geocoding response.
* Extracted the most relevant place using the following fallback order:

  1. City
  2. Town
  3. Village
  4. County
* Combined the place and state to generate a readable `placeName`.

### Weather Information

The following weather details are extracted and stored with each journal entry:

* Temperature in Celsius (`tempC`)
* Weather condition (`condition`)
* Weather icon (`icon`)

### Entry Creation

* Stored the journal entry in MongoDB using the `Entry` model.
* Stored the user's location as coordinates in `[longitude, latitude]` format.
* Associated each entry with the authenticated user's `userId`.
* Returned the created entry details with a **201 Created** response.

## 8. Get Entries API

* Implemented the `getEntries` controller to retrieve journal entries belonging to the authenticated user.
* Automatically filters entries using the user's ID from `req.user`.
* Added optional filtering by `mood`.
* Implemented pagination using:

  * `page`
  * `limit`
  * `skip`
* Default pagination values:

  * `page = 1`
  * `limit = 10`
* Sorted entries by `createdAt` in descending order so the latest entries are returned first.
* Added support for retrieving entries based on a specific mood.

### Query Parameters

```text
GET /entries?page=1&limit=10&mood=5
```

* `page` — Specifies the page number.
* `limit` — Specifies the number of entries per page.
* `mood` — Optional filter to retrieve entries with a specific mood.

## 9. Error Handling

Implemented basic HTTP status code handling for API responses:

* **400 Bad Request** — Invalid input data.
* **401 Unauthorized** — Missing or invalid authentication token.
* **403 Forbidden** — Insufficient permissions or role.
* **404 Not Found** — Requested resource does not exist.
* **500 Internal Server Error** — Unexpected server-side error.

## 10. Technologies and Services Used

* **Node.js** — Backend runtime.
* **Express.js** — REST API framework.
* **TypeScript** — Type safety and development.
* **MongoDB** — Database.
* **Mongoose** — MongoDB ODM.
* **Axios** — HTTP client for external API requests.
* **JWT** — User authentication.
* **bcrypt** — Password hashing and verification.
* **Nominatim / OpenStreetMap** — Reverse geocoding.
* **OpenWeather API** — Weather data.
