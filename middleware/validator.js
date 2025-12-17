const validateEntry = (req, res, next) => {
    const { plateNumber, vehicleType } = req.body;
    if (!plateNumber || !vehicleType) {
        return res.status(400).json({ 
            status: "Validation Error", 
            message: "plateNumber and vehicleType are required for parking entry." 
        });
    }
    next();
};

const validateRegistration = (req, res, next) => {
    const { fullName, phone, password, role } = req.body;
    if (!fullName || !phone || !password || !role) {
        return res.status(400).json({ 
            status: "Validation Error", 
            message: "Missing registration fields." 
        });
    }
    next();
};

module.exports = { validateEntry, validateRegistration };