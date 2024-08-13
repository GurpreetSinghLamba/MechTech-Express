const User = require('../models/User');

module.exports = async (req, res) => {
    try {
        const { username, mobile, password, firstname, lastname } = req.body;

        // Check if the username or mobile number already exists
        const existingUser = await User.findOne({ $or: [{ username }, { mobile }] });
        if (existingUser) {
            return res.status(400).render('login', { signupError: 'Username or mobile number already exists.', loginError: null });
        }

        // Create a new user
        const user = new User({
            username,
            mobile,
            password, // No hashing
            firstname,
            lastname
        });

        await user.save();

        // Redirect to login page
        res.redirect('/login');
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).render('login', { signupError: 'Internal Server Error', loginError: null });
    }
};
