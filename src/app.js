require('dotenv').config();
const app = express();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');


// Initialize the Application 
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1/routes', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});