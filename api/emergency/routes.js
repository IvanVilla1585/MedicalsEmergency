var { Router, Route } = require('../router');
var { emergencyController } = require('./controller');

class EmergencyRoutes extends Router {

  constructor(app) {
    super(app);
    app.param('emergencyId', emergencyController.loadEmergencyById);
  }

  get routes() {
    return {
      '/api/emergencys': [
        new Route("get", "getEmergencyList"),
        new Route("post", "createEmergency")
      ],
      '/api/emergencys/:emergencyId': [
        new Route("get", "getEmergency"),
        new Route("put", "updateEmergency"),
        new Route("delete", "deleteEmergency")
      ]
    };
  }

  createEmergency(req, res, next) {
    emergencyController.createEmergency(req, res, next);
  }

  getEmergencyList(req, res, next) {
    emergencyController.listEmergencys(req.query, res, next);
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