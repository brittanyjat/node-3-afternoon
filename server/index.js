require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , app = express();

//MIDDLEWARE//
const checkForSession = require('./middlewares/checkForSession');

// CONTROLLERS //
const swagController = require('./controllers/swag_controller')
    , authController = require('./controllers/auth_controller')
    , cartController = require('./controllers/cart_controller')
    , searchController = require('./controllers/search_controller');

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(checkForSession);

app.use(express.static(`${__dirname}/build`));


//========== SWAG ENDPOINT =========//
app.get('/api/swag', swagController.read);

//========== AUTH ENDPOINTS =========//
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);

//========== CART ENDPOINTS =========//
app.post('/api/cart', cartController.add);
app.delete('/api/cart', cartController.delete);
app.post('/api/checkout', cartController.checkout);

//========== SEARCH ENDPOINTS =========//
app.get('/api/search', searchController.search);

const port = 3000;
app.listen(port, () => { console.log(`I guess I'll listen on port ${port}.`); });