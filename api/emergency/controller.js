const { EmergencyModel } = require('./modelschema');
//const { validator } = require('../../lib/validator');

class EmergencyController {
  loadEmergencyById(req, res, next, id) {
    EmergencyModel.getEmergencyById(id)
      .then(emergency => {
        req.emergency = emergency;
        return next();
      })
      .catch(e => next(e));
  }

  createEmergency(req, res, next) {
    let emergency = new EmergencyModel(req.body);
    if (!emergency.date || !emergency.typeEmergency || !emergency.locationEmergency || 
    	!emergency.ambulance || !emergency.paramedic || !emergency.patient 
    	|| !emergency.hospital || !emergency.driver) {
      res.status(400);
      return res.json({message: 'ingrese los campos obligatorios'});
    }
    paramedic.save()
      .then(savedEmergency => res.json(savedEmergency))
      .catch(e => next(e));
  }

  listEmergencys(query, res, next) {
    const { limit = 50, skip = 0 } = query;
    EmergencyModel.list({ limit, skip })
      .then(emergencyList => res.json(emergencyList))
      .catch(e => next(e));
  }

  updateEmergency(persitedEmergency, updatedEmergencyState, res, next) {
    Object.keys(updatedEmergencyState).filter(propertyName => persitedEmergency[propertyName] && propertyName !== '_id' && propertyName !== '__v').forEach(propertyName => {
      persitedEmergency[propertyName] = updatedEmergencyState[propertyName];
    });
    persitedEmergency.save()
      .then(savedEmergency => res.json(savedEmergency))
      .catch(e => next(e));
  }

  deleteEmregency(persitedEmergency, res, next) {
    persitedEmergency.remove()
      .then(deletedEmergency => res.json(deletedEmergency))
      .catch(e => next(e));
  }
}

exports.emergencyController = new EmergencyController();