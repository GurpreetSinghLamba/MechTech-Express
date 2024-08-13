const User = require('../models/User');

module.exports = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }).then((user) => {
        if (user) {
            if (password === user.password) { // Direct comparison
                req.session.userId = user._id;
                req.session.username = user.username;
                req.session.user_type = user.user_type;
                res.redirect('/');
            } else {
                res.status(400).render('login', { loginError: 'Invalid username or password', signupError: null });
            }
        } else {
            res.status(400).render('login', { loginError: 'Invalid username or password', signupError: null });
        }
    }).catch((error) => {
        console.error('Error finding user:', error);
        res.status(500).render('login', { loginError: 'Internal Server Error', signupError: null });
    });
};
