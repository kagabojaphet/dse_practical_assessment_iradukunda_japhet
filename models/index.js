const sequelize = require('../config/db');
const User = require('./User');
const Vehicle = require('./Vehicle');
const ParkingRecord = require('./ParkingRecord');

// --- Relationships ---

// 1. Driver (User) and Vehicle
// A Driver owns many vehicles
User.hasMany(Vehicle, { foreignKey: 'userId', as: 'myVehicles' });
Vehicle.belongsTo(User, { foreignKey: 'userId', as: 'owner' });

// 2. Vehicle and ParkingRecord
// A Vehicle can have many parking sessions
Vehicle.hasMany(ParkingRecord, { foreignKey: 'vehicleId' });
ParkingRecord.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

// 3. Manager (User) and ParkingRecord
// A Parking Manager records many parking entries/exits
User.hasMany(ParkingRecord, { foreignKey: 'recordedBy', as: 'managedRecords' });
ParkingRecord.belongsTo(User, { foreignKey: 'recordedBy', as: 'attendant' });

// EXPORT EVERYTHING TOGETHER
module.exports = { sequelize, User, Vehicle, ParkingRecord };