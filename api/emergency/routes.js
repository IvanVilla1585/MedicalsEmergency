var { Router, Route } = require('../router');
var { emergencyController } = require('./controller');
var authController = require('../oauth2/auth');

class EmergencyRoutes extends Router {

  constructor(app) {
    super(app);
    app.param('emergencyId', emergencyController.loadEmergencyById);
  }

  get routes() {
    return {
      '/emergencies': [
        new Route("get", [authController.isAuthenticated, "getEmergenciesList"]),
        new Route("post", [authController.isAuthenticated, "createEmergency"])
      ],
      '/emergencies/:emergencyId': [
        new Route("get", [authController.isAuthenticated, "getEmergency"]),
        new Route("put", [authController.isAuthenticated, "updateEmergency"]),
        new Route("delete", [authController.isAuthenticated, "deleteEmergency"])
      ]
    };
  }

  createEmergency(req, res, next) {
    emergencyController.createEmergency(req, res, next);
  }

  getEmergenciesList(req, res, next) {
    emergencyController.listEmergencies(req.query, res, next);
  }

  getEmergency(req, res, next) {
    return res.json(req.emergency);
  }

  updateEmergency(req, res, next) {
    emergencyController.updateEmergency(req.emergency, req.body, res, next);
  }

  deleteEmergency(req, res, next) {
    emergencyController.deleteEmergency(req.emergency, res, next);
  }
}
exports.EmergencyRoutes = EmergencyRoutes;