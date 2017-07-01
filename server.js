const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const {AmbulanceRoutes} = require('./api/ambulance/routes');
const {ParamedicRoutes} = require('./api/paramedic/routes');
const {EmergencyRoutes} = require('./api/emergency/routes');
const {Receiver} = require('./amqp/receiver');
const {Sender} = require('./amqp/sender');

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost/medicalemergency');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


let ambulanceRouter = new AmbulanceRoutes(app);
let paramedicRoutes = new ParamedicRoutes(app);
let emergencyRoutes = new EmergencyRoutes(app);

//var sender = new Sender('amqp://ivan:ivan@10.100.75.131','manuelao');
//sender.sendMessage('Hola Ivan');
var receiver = new Receiver('amqp://ivan:ivan@10.100.75.131','manuelao');
receiver.receiveMessage(function(msg){
	console.log('Mensaje recibido' + msg);
});

const server = app.listen(port, () => console.log(`server listening in port ${port}`));