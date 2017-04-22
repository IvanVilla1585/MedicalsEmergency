const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const {AmbulanceRoutes} = require('./api/ambulance/routes');
const routerParamedic = require('./api/paramedic/routes');

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost/medicalemergency');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


let ambulanceRouter = new AmbulanceRoutes(app);
app.use('/api', routerParamedic);

const server = app.listen(port, () => console.log(`server listening in port ${port}`));