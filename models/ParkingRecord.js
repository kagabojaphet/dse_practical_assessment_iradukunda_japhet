const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ParkingRecord = sequelize.define('ParkingRecord', {
    recordId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    entryTime: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
    exitTime: { 
        type: DataTypes.DATE,
        allowNull: true 
    },
    totalHours: { 
        type: DataTypes.INTEGER,
        defaultValue: 0 
    },
    totalAmount: { 
        type: DataTypes.FLOAT,
        defaultValue: 0 
    },
    // Foreign Key for Vehicle
    vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Foreign Key for the User (Parking Manager) who recorded the entry
    recordedBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = ParkingRecord;