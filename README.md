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