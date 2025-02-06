Auth-RBAC API

This is a Role-Based Access Control (RBAC) authentication API built using Node.js, Express, and MongoDB with Mongoose.

Prerequisites

Ensure you have the following installed on your machine:

Node.js (v14 or later recommended)

MongoDB (local or cloud-based, e.g., MongoDB Atlas)

Git (optional, for cloning the repository)

Setup Instructions

1. Clone the Repository

git clone https://github.com/your-username/Auth-RBAC.git
cd Auth-RBAC

2. Install Dependencies

npm install

3. Set Up Environment Variables

Create a .env file in the root directory and add the following variables:

PORT=9090
MONGO_URI=mongodb://localhost:27017/auth_rbac # Or your MongoDB Atlas URI
JWT_SECRET=your_jwt_secret_key

4. Start the Server

Development Mode (with auto-restart using nodemon):

npm run dev

Production Mode:

npm start

API Endpoints

Authentication

POST /api/auth/register - Register a new user

POST /api/auth/login - Authenticate and receive a token

User Management

GET /api/users - Get all users (Admin only)

GET /api/users/:id - Get a specific user

Role Management

POST /api/roles - Create a new role

GET /api/roles - List all roles

Dependencies

Express - Web framework for Node.js

Mongoose - ODM for MongoDB

jsonwebtoken - Handling authentication tokens

dotenv - Environment variable management

bcryptjs - Hashing passwords

Troubleshooting

Ensure MongoDB is running locally or use a valid MongoDB Atlas URI.

Check .env file for missing or incorrect values.

Run console.log(process.env.MONGO_URI) before connecting to MongoDB to debug connection issues.

License

This project is licensed under the MIT License.
