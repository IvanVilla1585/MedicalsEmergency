var { EmergencyModel } = require('./modelschema');

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
    if (!ambulance.car || !ambulance.car_plate || !ambulance.car_type) {
      res.status(400);
      return res.json({message: 'ingrese los campos obligatorios'});
    }
    emergency.save()
      .then(savedEmergency => res.json(savedEmergency))
      .catch(e => next(e));
  }

  listEmergencies(query, res, next) {
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

  deleteEmergency(persitedEmergency, res, next) {
    persitedEmergency.remove()
      .then(deletedEmergency => res.json(deletedEmergency))
      .catch(e => next(e));
  }
}

exports.emergencyController = new EmergencyController();