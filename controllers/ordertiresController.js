const User = require('../models/User');

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.session.username });
        const isAvailable = !!user;
        res.render('ordertires', { user, isAvailable });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
};
