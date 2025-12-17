const jwt = require('jsonwebtoken');

// 1. Verify if the user is logged in
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adds userId and role to the request object
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};

// 2. Verify if the user is a Manager
const isManager = (req, res, next) => {
    if (req.user.role !== 'Manager') {
        return res.status(403).json({ message: "Require Manager Role!" });
    }
    next();
};

module.exports = { verifyToken, isManager };