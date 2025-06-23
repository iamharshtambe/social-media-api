# Social Media API

A backend API for a social media application built with Node.js, Express, and MongoDB.

## Features

-  User authentication and authorization
-  User profile management
-  Connection requests system
-  RESTful API endpoints
-  JWT-based authentication
-  Input validation and security

## Tech Stack

-  **Runtime:** Node.js
-  **Framework:** Express.js
-  **Database:** MongoDB with Mongoose
-  **Authentication:** JWT (JSON Web Tokens)
-  **Password Hashing:** bcrypt
-  **Validation:** validator

## Project Structure

```
social-media-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── models/
│   │   ├── ConnectionRequest.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRouter.js
│   │   ├── profileRouter.js
│   │   ├── requestRouter.js
│   │   └── userRouter.js
│   └── utils/
│       └── validation.js
├── server.js
└── package.json
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/iamharshtambe/social-media-backend.git
cd social-media-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the development server:

```bash
npm run dev
```

## API Documentation

### Postman Collection

📋 **[View API Documentation & Test Endpoints](https://www.postman.com/harshtambe-1653464/social-media-backend)**

The complete API documentation with example requests and responses is available in the Postman workspace above.

### Available Routes

-  **Authentication:** `/auth` - User registration and login
-  **Profile:** `/profile` - User profile management
-  **Users:** `/users` - User discovery and management
-  **Requests:** `/requests` - Connection request handling

## Development

```bash
npm run dev
```
