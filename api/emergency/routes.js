const { Router, Route } = require('../router');
const { emergencyController } = require('./controller');
const express = require('express');

const routerEmergency = express.Router();

routerEmergency.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

routerEmergency.get('/emergencies', (req, res, next) => {
  emergencyController.listEmergencies(req.query, res, next);
});

routerEmergency.get('/emergencies/:emergencyId', (req, res, next) => {
  return res.json(req.emergency);
});

routerEmergency.post('/emergencies', (req, res, next) => {
  emergencyController.createEmergency(req, res, next);
});

routerEmergency.put('/emergencies/:emergencyId', (req, res, next) => {
  emergencyController.updateEmergency(req.emergency, req.body, res, next);
});

routerEmergency.delete('/emergencies/:emergencyId', (req, res, next) => {
  emergencyController.deleteEmergency(req.ambulance, res, next);
});

module.exports = routerEmergency;

/*
class ParamedicRoutes extends Router {

  constructor(app) {
    super(app);
    app.param('ambulanceId', ambulanceController.loadAmbulanceById);
  }

  get routes() {
    return {
      '/api/ambulances': [
        new Route("get", "getAmbulancesList"),
        new Route("post", "createAmbulance")
      ],
      '/api/ambulances/:ambulanceId': [
        new Route("get", "getAmbulance"),
        new Route("put", "updateAmbulance"),
        new Route("delete", "deleteAmbulance")
      ]
    };
  }

  createAmbulance(req, res, next) {
    paramedicController.createAmbulance(req, res, next);
  }

  getAmbulancesList(req, res, next) {
    paramedicController.listAmbulances(req.query, res, next);
  }

  getAmbulance(req, res, next) {
    return res.json(req.ambulance);
  }

  updateAmbulance(req, res, next) {
    paramedicController.updateAmbulance(req.ambulance, req.body, res, next);
  }

  deleteAmbulance(req, res, next) {
    paramedicController.deleteAmbulance(req.ambulance, res, next);
  }
}
exports.AmbulanceRoutes = AmbulanceRoutes;*/