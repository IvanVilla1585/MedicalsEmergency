const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
const {AmbulanceRoutes} = require('./api/ambulance/routes');
const {ParamedicRoutes} = require('./api/paramedic/routes');
const {EmergencyRoutes} = require('./api/emergency/routes');
const {ClientRouter} = require('./api/oauth2/client/routes');
const {UserRouter} = require('./api/oauth2/user/routes');
const {OAuth2Router} = require('./api/oauth2/routes');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/medicalemergency');
app.set('view engine', 'ejs');
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
  next();
});
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(session({
    secret: 'euSc5kjNOOqSF8LLNl5U',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());

let ambulanceRouter = new AmbulanceRoutes(app);
let paramedicRoutes = new ParamedicRoutes(app);
let emergencyRoutes = new EmergencyRoutes(app);
let clientRouter = new ClientRouter(app);
let userRouter = new UserRouter(app);
let oauth2Router = new OAuth2Router(app);

//var sender = new Sender('amqp://ivan:ivan@10.100.75.131','manuelao');
//sender.sendMessage('Hola Ivan');

const server = app.listen(port, () => console.log(`server listening in port ${port}`));