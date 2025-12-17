const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    userId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, // Corrected here
        autoIncrement: true 
    },
    fullName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('Manager', 'Driver'), defaultValue: 'Driver' }
});

module.exports = User;