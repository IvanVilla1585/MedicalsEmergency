var { EmergencyModel } = require('./modelschema');
var { Client } = require('../../amqp/request_reply');

let client = new Client('amqp://hospital:hospital1@10.100.127.28','manuelao');

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
    if (!emergency.date || !emergency.type_emergency /*|| !emergency.driver || !emergency.ambulance*/ ||
        !emergency.paramedic.length > 0 || !emergency.patient.length > 0 /*|| !emergency.hospital*/ || !emergency.location.coordinates.length > 0) {
      res.status(500);
      return res.json({message: 'Ingrese los campos obligatorios'});
    }
    client.sendRequest(JSON.stringify(emergency), function(reply){
        console.log(`Respuesta recibida con exito ${reply}`);
        let replyHospitales = JSON.parse(reply);
        emergency.hospital = replyHospitales.hospitales;
    });
    setTimeout(function(){ 
      emergency.save()
      .then(savedEmergency =>  res.json(savedEmergency))
      .catch(e => next(e));
    }, 10000);
    
  }

  listEmergencies(query, res, next) {
    const { limit = 50, skip = 0 } = query;
    EmergencyModel.list({ limit, skip })
      .then(emergencyList => res.json(emergencyList))
      .catch(e => next(e));
  }

  updateEmergency(persitedEmergency, updatedEmergencyState, res, next) {
    if (!updatedEmergencyState.date || !updatedEmergencyState.type_emergency /*|| !emergency.driver || !emergency.ambulance*/ ||
    !updatedEmergencyState.paramedic.length > 0 || !updatedEmergencyState.patient.length > 0 /*|| !emergency.hospital*/ ||
    !updatedEmergencyState.location.coordinates.length > 0) {
      res.status(500);
      return res.json({message: 'Ingrese los campos obligatorios'});
    }
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