# Auth-RBAC
A Secure JWT-based authentication system for user login and token management.


## Features

- 🔐 JWT-based authentication system
- 🛡️ Role-Based Access Control (RBAC)
- 🔑 Token management with expiration
- 📦 Protected API endpoints based on user roles
- 👥 User management for Admin users
- 🔄 Refresh token rotation (optional)
- 🛡️ Secure password storage with bcrypt

## Prerequisites

- Node.js 
- npm
- MongoDB (v6+)
- Postman or similar API testing tool
- Basic understanding of REST APIs and JWT

## Setup Instructions

### 1. Clone Repository
### 2. Install Dependencies
- npm install
### 3.Create .env file in root directory:

PORT=your port

MONGODB_URI=mongodb://localhost:27017/auth-rbac-db

JWT_SECRET=your_secure_jwt_secret_here

JWT_EXPIRES_IN=expiration time

### 4.Database Setup

- Ensure MongoDB is running locally or update MONGODB_URI to your remote database.
  
### 5.Dependencies
Express.js - Web framework

Mongoose - MongoDB ODM

jsonwebtoken - JWT implementation

bcryptjs - Password hashing

dotenv - Environment management
### 6. API ENDPOINTS

Authentication

POST	/api/auth/register	Register new user	Public

POST	/api/auth/login	Login & get access token	Public

POST	/api/auth/refresh	Refresh access token	Authenticated

POST	/api/auth/logout	Invalidate refresh token	Authenticated

User Management (Admin Only)

Method	Endpoint	Description

GET	/api/users	Get all users

PUT	/api/users/:id	Update user role

DELETE	/api/users/:id	Delete user
