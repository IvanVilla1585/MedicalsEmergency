var { Router, Route } = require('../router');
var { ambulanceController } = require('./controller');

class AmbulanceRoutes extends Router {

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
    ambulanceController.createAmbulance(req, res, next);
  }

  getAmbulancesList(req, res, next) {
    ambulanceController.listAmbulances(req.query, res, next);
  }

  getAmbulance(req, res, next) {
    return res.json(req.ambulance);
  }

  updateAmbulance(req, res, next) {
    ambulanceController.updateAmbulance(req.ambulance, req.body, res, next);
  }

  deleteAmbulance(req, res, next) {
    ambulanceController.deleteAmbulance(req.ambulance, res, next);
  }
}
exports.AmbulanceRoutes = AmbulanceRoutes;