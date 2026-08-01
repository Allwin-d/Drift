# Backend Progress

## 1. Server Setup

- Configured the Express server in `server.ts`.
- Initialized the application using Express.
- Started the server on **Port 6969**.

## 2. Database Configuration

- Created a `DB` folder.
- Added a `db.ts` file to manage the MongoDB database connection.
- Configured the database connection using MongoDB credentials.

## 3. User Schema

- Created the `User` schema inside the `Model` folder.
- The schema includes the following fields:
  - `name`
  - `email`
  - `password`
  - `createdAt`

- Validation:
  - `name`, `email`, and `password` are required.
  - `email` is unique to prevent duplicate user registrations.

## 4. Authentication

### Register

- Implemented the user registration functionality.
- Passwords are securely hashed using **bcrypt** before being stored in the database.

### Login

- Implemented the user login functionality.
- Verified user credentials using **bcrypt**.
- Generated a JWT (JSON Web Token) upon successful authentication.
- Returned the JWT in the response for client-side authentication.

## 5. Entry Schema

- Created the `Entry` schema to store journal entries.
- The schema includes the following fields:
  - `userId`
  - `content`
  - `mood`
  - `location`
  - `placeName`
  - `weather`
  - `timeOfDay`
  - `createdAt`

400 Bad Request — invalid input data
401 Unauthorized — missing/invalid token
403 Forbidden — insufficient role
404 Not Found — resource doesn't exist
500 Internal Server Error
