const express = require('express');
const expressSession = require('express-session');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sunnysingh9953922:P%40ssw0rd@cluster0.ybt6qw8.mongodb.net/', { useNewUrlParser: true });

const app = express();
const ejs = require('ejs');
const path = require('path');
const User = require('./models/User');
const Service = require('./models/Service'); 
const storeUserController = require('./controllers/storeUser.js');
const logoutUser = require('./controllers/logoutUser.js');
const loginUser = require('./controllers/loginUser.js');
const onlinebookingController = require('./controllers/onlinebookingController.js');
const ordertiresController = require('./controllers/ordertiresController.js');
const servicesController = require('./controllers/servicesController.js');
const contactusController = require('./controllers/contactusController.js');
const checkoutController = require('./controllers/checkoutController');
const confirmationController = require('./controllers/confirmationController');

const validateMiddleware = require('./middleware/signupAuthMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));

app.use((req, res, next) => {
    res.locals.loggedIn = req.session.userId ? true : false;
    res.locals.username = req.session.username;
    next();
});

app.get('/', (req, res) => {
    res.render('index', { username: req.session.username, loggedIn: !!req.session.userId });
});


app.get('/ordertires', ordertiresController);
app.get('/login', (req, res) => {
    res.render('login', { loginError: null, signupError: null });
});
app.post('/login', loginUser);
app.get('/signup', (req, res) => {
    res.render('login', { signupError: null, loginError: null });
});
app.post('/signup', storeUserController);
app.get('/onlinebooking', onlinebookingController);
app.get('/services', servicesController);
app.get('/contact', contactusController);
app.get('/logout', logoutUser);
app.get('/checkout', checkoutController);
app.get('/confirmation', confirmationController);
app.listen(4000, () => {
    console.log('App listening on port 4000');
});
