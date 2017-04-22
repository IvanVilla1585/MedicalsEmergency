const mongoose = require('mongoose');
const {AmbulanceModel} = require('../ambulance/modelschema');
const {ParamedicModel} = require('../paramedic/modelschema');


let PatienteModel = new mongoose.Schema({
  name: { type: String, require: true},
  lastname: { type: String, require: true},
  phone: {type: String, require: true},
  gender: {type: String, require: true}  ,
  age: {type: String, require: true}
});

let HospitalModel = new mongoose.Schema({
  name: { type: String, require: true},
  location: { type: String, require: true},
  phone: { type: String, require: true},
  category: { type: String, require: true},
  available: { type: String, require: true}
});


const emergencySchema = new mongoose.Schema({
  date: { type: Date, require: true},
  typeEmergency: { type: String , require: true},
  locationEmergency: {type: String, require: true},
  ambulance: AmbulanceModel,
  paramedic: ParamedicModel,  
  patient: [PatienteModel],
  hospital: HospitalModel,
  driver: {type: String, require: true}
});

EmergencySchema.statics = {
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .exec();
  },
  getEmergencyById(id) {
    return this.findById(id)
      .exec()
      .then((contact) => {
        if (contact) {
          return contact;
        }
        const err = new Error(`not found the emergency with the id ${id}`);
        return Promise.reject(err);
      });
  }
};
const EmergencyModel = mongoose.model('emergencys', EmergencySchema);
exports.EmergencyModel = EmergencyModel;