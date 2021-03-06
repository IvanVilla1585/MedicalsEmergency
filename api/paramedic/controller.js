const { ParamedicModel } = require('./modelschema');
//const { validator } = require('../../lib/validator');

class ParamedicController {
  loadParamedicById(req, res, next, id) {
    ParamedicModel.getParamedicById(id)
      .then(paramedic => {
        req.paramedic = paramedic;
        return next();
      })
      .catch(e => next(e));
  }

  createParamedic(req, res, next) {
    let paramedic = new ParamedicModel(req.body);
    if (!paramedic.name || !paramedic.phone || !paramedic.gender || !paramedic.specialization) {
      res.status(500);
      return res.json({message: 'Ingrese los campos obligatorios'});
    }
    paramedic.save()
      .then(savedParamedic => res.json(savedParamedic))
      .catch(e => next(e));
  }

  listParamedics(query, res, next) {
    const { limit = 50, skip = 0 } = query;
    ParamedicModel.list({ limit, skip })
      .then(paramedicList => res.json(paramedicList))
      .catch(e => next(e));
  }

  updateParamedic(persitedParamedic, updatedParamedicState, res, next) {
    if (!persitedParamedic.name || !persitedParamedic.phone || !persitedParamedic.gender || !persitedParamedic.specialization) {
      res.status(500);
      return res.json({message: 'Ingrese los campos obligatorios'});
    }
    Object.keys(updatedParamedicState).filter(propertyName => persitedParamedic[propertyName] && propertyName !== '_id' && propertyName !== '__v').forEach(propertyName => {
      persitedParamedic[propertyName] = updatedParamedicState[propertyName];
    });
    persitedParamedic.save()
      .then(savedParamedic => res.json(savedParamedic))
      .catch(e => next(e));
  }

  deleteParamedic(persitedParamedic, res, next) {
    persitedParamedic.remove()
      .then(deletedParamedic => res.json(deletedParamedic))
      .catch(e => next(e));
  }
}

exports.paramedicController = new ParamedicController();