const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes'); 
const globalErrorHandler = require('./middleware/errorMiddleware'); // Best to use the external one
require('dotenv').config();

const app = express();

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/parking', parkingRoutes);
app.use('/api/vehicles', vehicleRoutes); 

// Global Error Handling Middleware (Requirement)
// Place this AFTER all routes
app.use(globalErrorHandler);

// Sync Database and Start Server
sequelize.sync({ alter: true })
    .then(() => {
        console.log("✅ Database connected & Tables synced");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error("❌ Unable to connect to the database:", err);
    });