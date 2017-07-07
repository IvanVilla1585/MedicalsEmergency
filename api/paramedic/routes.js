var { Router, Route } = require('../router');
var { paramedicController } = require('./controller');

class ParamedicRoutes extends Router {

  constructor(app) {
    super(app);
    app.param('paramedicId', paramedicController.loadParamedicById);
  }

  get routes() {
    return {
      '/paramedics': [
        new Route("get", ["getParamedicsList"]),
        new Route("post", ["createParamedic"])
      ],
      '/paramedics/:paramedicId': [
        new Route("get", ["getParamedic"]),
        new Route("put", ["updateParamedic"]),
        new Route("delete", ["deleteParamedic"])
      ]
    };
  }

  createParamedic(req, res, next) {
    paramedicController.createParamedic(req, res, next);
  }

  getParamedicsList(req, res, next) {
    paramedicController.listParamedics(req.query, res, next);
  }

  getParamedic(req, res, next) {
    return res.json(req.paramedic);
  }

  updateParamedic(req, res, next) {
    paramedicController.updateParamedic(req.paramedic, req.body, res, next);
  }

  deleteParamedic(req, res, next) {
    paramedicController.deleteParamedic(req.paramedic, res, next);
  }
}
exports.ParamedicRoutes = ParamedicRoutes;