const { Router, Route } = require('../router');
const { paramedicController } = require('./controller');
const express = require('express');

const routerParamedic = express.Router();

routerParamedic.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

routerParamedic.get('/paramedics', (req, res, next) => {
  paramedicController.listParamedics(req.query, res, next);
});

routerParamedic.get('/paramedic/:paramedicId', (req, res, next) => {
  return res.json(req.paramedic);
});

routerParamedic.post('/paramedics', (req, res, next) => {
  paramedicController.createParamedic(req, res, next);
});

routerParamedic.put('/paramedic/:paramedicId', (req, res, next) => {
  paramedicController.updateParamedic(req.paramedic, req.body, res, next);
});

routerParamedic.delete('/paramedic/:paramedicId', (req, res, next) => {
  paramedicController.deleteAmbulance(req.ambulance, res, next);
});

module.exports = routerParamedic;

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