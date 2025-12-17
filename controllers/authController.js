const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER - Includes the duplicate check and specific JSON output
exports.register = async (req, res) => {
    try {
        const { fullName, phone, password, role } = req.body;

        // Step 1: Check if user already exists
        const existingUser = await User.findOne({ where: { phone } });
        if (existingUser) {
            return res.status(400).json({ 
                status: "Error", 
                message: "A user with this phone number already exists." 
            });
        }

        // Step 2: Hash password (Security Requirement)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 3: Create user
        const newUser = await User.create({
            fullName,
            phone,
            password: hashedPassword,
            role: role || 'Driver' // Default to Driver if role is missing
        });

        // Step 4: Final Response (Matches your requested format)
        res.status(201).json({ 
            message: "User registered successfully", 
            userId: newUser.userId 
        });

    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

// 2. LOGIN - Generates Token for Testing
exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ where: { phone } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.userId, role: user.role }, 
            process.env.JWT_SECRET || 'secret_key', 
            { expiresIn: '1h' }
        );

        res.json({ message: "Login successful", token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};