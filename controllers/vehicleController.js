const { Vehicle, User } = require('../models');

// 1. CREATE - Register a new vehicle
exports.registerVehicle = async (req, res) => {
    try {
        const { plateNumber, vehicleType, userId } = req.body;
        const vehicle = await Vehicle.create({ plateNumber, vehicleType, userId });
        res.status(201).json({ message: "Vehicle registered successfully", vehicle });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. READ - Get all vehicles (Manager) or own vehicles (Driver)
exports.getVehicles = async (req, res) => {
    try {
        let vehicles;
        if (req.user.role === 'Manager') {
            vehicles = await Vehicle.findAll({ include: [{ model: User, as: 'owner', attributes: ['fullName', 'phone'] }] });
        } else {
            vehicles = await Vehicle.findAll({ where: { userId: req.user.id } });
        }
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. DELETE - Remove a vehicle
exports.deleteVehicle = async (req, res) => {
    try {
        await Vehicle.destroy({ where: { vehicleId: req.params.id } });
        res.json({ message: "Vehicle removed" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};