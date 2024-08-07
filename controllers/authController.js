const User = require('../model/user');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const emailAlreadyExists = await User.findOne({ email });

        if (emailAlreadyExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const user = await User.create({ email, name, password });

        // Return a success response
        return res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const user = await User.findByIdAndUpdate(  id,
            { name, email, password },
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUserById
};
