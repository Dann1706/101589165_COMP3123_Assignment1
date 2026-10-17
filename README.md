# COMP3123 Assignment 01 — Employee Management REST API

**Student:** Daniel Alvarez  
**Student ID:** 101589165  
**Course:** COMP3123 — Full Stack Development I

## Project Overview

This project is a RESTful Employee Management API developed using Node.js, Express.js, and MongoDB.

The application allows users to register, log in, and securely manage employee records through CRUD operations.

## Features

- User registration with bcrypt password hashing
- User login with JSON Web Token (JWT) authentication
- Protected employee management endpoints
- Create, retrieve, update, and delete employee records
- User-based employee ownership and access control
- Input validation using express-validator
- Security headers using Helmet
- API rate limiting
- Centralized JSON error handling
- HTTP request logging using Morgan and Winston
- MongoDB Atlas database integration
- Health check endpoint

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- jsonwebtoken
- express-validator
- Helmet
- express-rate-limit
- Morgan
- Winston
- dotenv
- Postman

## Installation and Setup

### 1. Clone the Repository

```bash
git clone git@github.com:Dann1706/101589165_COMP3123_Assignment1.git
cd 101589165_COMP3123_Assignment1
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root using `.env.example` as a reference.

```env
PORT=8080
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Replace the placeholders with your own configuration values.

**Security:** Never commit your `.env` file or share database credentials and JWT secrets.

### 4. Start the Server

```bash
node server.js
```

The application runs at:

`http://localhost:8080`

### 5. Verify the Server

Send the following request using Postman:

```http
GET http://localhost:8080/health
```

Expected response:

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## API Endpoints

### User Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/user/signup` | Register a new user |
| POST | `/api/v1/user/login` | Log in and receive a JWT |

### Employee Management

All employee endpoints require a valid JWT in the Authorization header.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/emp/employees` | Retrieve the authenticated user's employees |
| POST | `/api/v1/emp/employees` | Create an employee |
| GET | `/api/v1/emp/employees/:eid` | Retrieve an employee by ID |
| PUT | `/api/v1/emp/employees/:eid` | Update an employee |
| DELETE | `/api/v1/emp/employees?eid=ID` | Delete an employee |

### Authentication Header

For protected endpoints, include:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Users can access and manage only their own employee records.

## Testing

The API was tested using Postman, including:

- User registration and login
- Employee CRUD operations
- JWT authentication
- Cross-user access restrictions
- Input validation
- HTTP security headers
- Rate limiting
- Centralized error handling
- Request logging

Postman requests and screenshots are included as supporting assignment materials.


## Project Structure

The application follows a modular Express.js architecture to separate API routes, database models, configuration, and middleware.

- `server.js` — Express application setup, middleware registration, routes, and server startup.
- `routes/` — API endpoints for user authentication and employee management.
- `models/` — Mongoose schemas for users and employees.
- `controllers/` — Request handling and application logic.
- `middleware/` — JWT authentication and centralized error handling.
- `config/` — MongoDB connection and Winston logger configuration.
- `screenshots/` — Evidence of API testing, security features, and MongoDB records.
- `postman/` — Exported Postman collection.
- `.env.example` — Template for required environment variables.

## MongoDB Configuration

The application uses MongoDB Atlas as its database service.

1. Create a MongoDB Atlas cluster and a database user.
2. Configure network access to allow connections from your development environment.
3. Copy the MongoDB connection string into the private `.env` file as `MONGODB_URI`.
4. Ensure the database name is `comp3123_assignment1`.
5. Start the application to establish the MongoDB connection.

The database contains `users` and `employees` collections.

## Authentication and Authorization

Users register through the signup endpoint. Their passwords are hashed using bcrypt before being stored in MongoDB.

During login, the application verifies the submitted credentials and generates a JSON Web Token (JWT).

Clients must include this token in the `Authorization: Bearer` header when accessing employee endpoints.

The authentication middleware verifies the token and identifies the authenticated user.

Each employee record contains a `user` ObjectId referencing its owner. Employee database queries are restricted to the authenticated user's ID, preventing users from viewing, updating, or deleting employees belonging to another user.

## Security Features

### Password Hashing

User passwords are hashed using bcryptjs before storage. Plain-text passwords are not stored in the database.

### Helmet

Helmet adds HTTP security headers that help protect the application against common web security risks.

### Rate Limiting

Rate limiting restricts how many API requests a client can make within a specified period.

The application allows up to **100 requests per 15 minutes** for routes under `/api/v1`, including signup, login, and employee endpoints.

When the limit is exceeded, the API returns HTTP `429 Too Many Requests` with a JSON error message.

### Input Validation

The application uses express-validator to validate user registration and employee data, including required fields, email formats, password lengths, salary values, and dates.

Invalid requests return HTTP `400 Bad Request` with validation error information.

### Error Handling

The application uses centralized Express error-handling middleware to return JSON error responses and avoid exposing internal server error details.

### Environment Security

Sensitive configuration values, including MongoDB credentials and the JWT secret, are stored in a private `.env` file.

The `.env` file is excluded from Git, while `.env.example` provides safe configuration placeholders.

## Application Logging

Morgan records HTTP request information and passes it to Winston.

Winston writes logs to `logs/app.log` and displays log messages in the terminal.

HTTP request logs include information such as timestamps, request methods, paths, response status codes, and user-agent details.

Passwords, JWT secrets, and database credentials are not intentionally included in the logging configuration.

Generated log files are excluded from Git. Logging functionality is demonstrated through screenshots.

## HTTP Response Codes

The API uses HTTP status codes to indicate the outcome of requests.

| Status Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource successfully created |
| 204 | Employee successfully deleted, without a response body |
| 400 | Invalid request data |
| 401 | Missing, invalid, or expired authentication |
| 404 | Employee not found or not accessible |
| 409 | Duplicate user registration |
| 429 | Rate limit exceeded |
| 500 | Unexpected server error |