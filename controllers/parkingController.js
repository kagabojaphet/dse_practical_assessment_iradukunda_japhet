const { ParkingRecord, Vehicle } = require('../models');
const { Op, fn, col } = require('sequelize');

// 1. CREATE (Entry) - Manager Records Plate Number
exports.enterParking = async (req, res) => {
    try {
        const { plateNumber, vehicleType } = req.body;

        // Validation to prevent the "undefined" error
        if (!plateNumber) {
            return res.status(400).json({ message: "Plate number is required" });
        }

        // Find or create vehicle automatically
        let vehicle = await Vehicle.findOne({ where: { plateNumber } });
        if (!vehicle) {
            vehicle = await Vehicle.create({ plateNumber, vehicleType });
        }

        // Create parking record
        const record = await ParkingRecord.create({
            vehicleId: vehicle.vehicleId,
            recordedBy: req.user.id, // ID from the JWT token
            entryTime: new Date()
        });

        res.status(201).json({
            message: "Vehicle entry recorded successfully",
            record
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

// 2. UPDATE (Exit & Fee Calculation)
exports.exitParking = async (req, res) => {
    try {
        const record = await ParkingRecord.findByPk(req.params.id);
        if (!record) return res.status(404).json({ message: "Parking record not found" });

        const exitTime = new Date();
        const entryTime = new Date(record.entryTime);
        
        // Calculate difference in hours (Partial hours = Full hours)
        const diffInMs = exitTime - entryTime;
        const totalHours = Math.ceil(diffInMs / (1000 * 60 * 60));

        // Fee Rules: 1500 for 1st hour, 1000 for extra hours
        let fee = 0;
        if (totalHours <= 1) {
            fee = 1500;
        } else {
            fee = 1500 + (totalHours - 1) * 1000;
        }

        await record.update({ 
            exitTime, 
            totalHours, 
            totalAmount: fee 
        });

        res.json({ message: "Exit recorded and fee calculated", fee, record });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

// 3. READ (History)
exports.getHistory = async (req, res) => {
    try {
        let whereClause = {};
        
        // If it's a Driver, only show records belonging to their vehicles
        if (req.user.role === 'Driver') {
            whereClause = { '$Vehicle.userId$': req.user.id };
        }

        const records = await ParkingRecord.findAll({
            where: whereClause,
            include: [{
                model: Vehicle,
                attributes: ['plateNumber', 'vehicleType', 'userId']
            }],
            order: [['entryTime', 'DESC']] // Show latest first
        });

        res.json({
            status: "Success",
            count: records.length,
            data: records
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};
// 4. REPORT (Revenue)
exports.getRevenueReport = async (req, res) => {
    try {
        // 1. Calculate Daily Revenue
        const dailyReport = await ParkingRecord.findAll({
            attributes: [
                [fn('DATE', col('exitTime')), 'date'],
                [fn('SUM', col('totalAmount')), 'dailyRevenue']
            ],
            where: { exitTime: { [Op.ne]: null } },
            group: [fn('DATE', col('exitTime'))]
        });

        // 2. Calculate Monthly Revenue
        const monthlyReport = await ParkingRecord.findAll({
            attributes: [
                [fn('MONTH', col('exitTime')), 'month'],
                [fn('YEAR', col('exitTime')), 'year'],
                [fn('SUM', col('totalAmount')), 'monthlyRevenue']
            ],
            where: { exitTime: { [Op.ne]: null } },
            group: [fn('YEAR', col('exitTime')), fn('MONTH', col('exitTime'))]
        });

        // 3. Grand Total
        const totalRevenue = await ParkingRecord.sum('totalAmount', {
            where: { exitTime: { [Op.ne]: null } }
        });

        res.json({
            status: "Success",
            totalRevenue: totalRevenue || 0,
            dailyReport,
            monthlyReport
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};