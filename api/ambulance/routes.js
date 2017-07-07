var { Router, Route } = require('../router');
var { ambulanceController } = require('./controller');
const authController = require('../oauth2/auth');

class AmbulanceRoutes extends Router {

  constructor(app) {
    super(app);
    app.param('ambulanceId', ambulanceController.loadAmbulanceById);
  }

  get routes() {
    return {
      '/ambulances': [
        new Route("get", [authController.isAuthenticated, "getAmbulancesList"]),
        new Route("post", [authController.isAuthenticated, "createAmbulance"])
      ],
      '/ambulances/:ambulanceId': [
        new Route("get", [authController.isAuthenticated, "getAmbulance"]),
        new Route("put", [authController.isAuthenticated, "updateAmbulance"]),
        new Route("delete", [authController.isAuthenticated, "deleteAmbulance"])
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