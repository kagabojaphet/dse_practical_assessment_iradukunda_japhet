const { DataTypes } = require('sequelize'); // Import DataTypes
const sequelize = require('../config/db');   // Import your sequelize instance

const Vehicle = sequelize.define('Vehicle', {
    vehicleId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    plateNumber: { 
        type: DataTypes.STRING, 
        unique: true,
        allowNull: false 
    },
    vehicleType: { 
        type: DataTypes.STRING 
    },
    userId: { 
        type: DataTypes.INTEGER // This will be linked in models/index.js
    }
});

module.exports = Vehicle;