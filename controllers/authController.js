const User = require('../model/user');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const emailAlreadyExists = await User.findOne({ email: email });
        
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

// login 
// getallusers 

module.exports = {
    register
};
