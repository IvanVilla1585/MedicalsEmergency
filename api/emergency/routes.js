var { Router, Route } = require('../router');
var { emergencyController } = require('./controller');

class EmergencyRoutes extends Router {

  constructor(app) {
    super(app);
    app.param('emergencyId', emergencyController.loadEmergencyById);
  }

  get routes() {
    return {
      '/api/emergencies': [
        new Route("get", "getEmergenciesList"),
        new Route("post", "createEmergency")
      ],
      '/api/emergencies/:emergencyId': [
        new Route("get", "getEmergency"),
        new Route("put", "updateEmergency"),
        new Route("delete", "deleteEmergency")
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