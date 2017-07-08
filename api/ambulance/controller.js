var { AmbulanceModel } = require('./modelschema');

class AmbulanceController {
  loadAmbulanceById(req, res, next, id) {
    AmbulanceModel.getAmbulanceById(id)
      .then(ambulance => {
        req.ambulance = ambulance;
        return next();
      })
      .catch(e => next(e));
  }

  createAmbulance(req, res, next) {
    let ambulance = new AmbulanceModel(req.body);
    if (!ambulance.car || !ambulance.car_plate || !ambulance.type_ambulance) {
      res.status(500);
      return res.json({message: 'Ingrese los campos obligatorios'});
    }
    ambulance.save()
      .then(savedAmbulance => res.json(savedAmbulance))
      .catch(e => next(e));
  }

  listAmbulances(query, res, next) {
    const { limit = 50, skip = 0 } = query;
    AmbulanceModel.list({ limit, skip })
      .then(ambulanceList => res.json(ambulanceList))
      .catch(e => next(e));
  }

  updateAmbulance(persitedAmbulance, updatedAmbulanceState, res, next) {
    if (!updatedAmbulanceState.car || !updatedAmbulanceState.car_plate || !updatedAmbulanceState.type_ambulance) {
      res.status(500);
      return res.json({message: 'Ingrese los campos obligatorios'});
    }
    Object.keys(updatedAmbulanceState).filter(propertyName => persitedAmbulance[propertyName] && propertyName !== '_id' && propertyName !== '__v').forEach(propertyName => {
      persitedAmbulance[propertyName] = updatedAmbulanceState[propertyName];
    });
    persitedAmbulance.save()
      .then(savedAmbulance => res.json(savedAmbulance))
      .catch(e => next(e));
  }

  deleteAmbulance(persitedAmbulance, res, next) {
    persitedAmbulance.remove()
      .then(deletedAmbulance => res.json(deletedAmbulance))
      .catch(e => next(e));
  }
}

exports.ambulanceController = new AmbulanceController();