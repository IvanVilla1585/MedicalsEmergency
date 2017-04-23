const mongoose = require('mongoose');
const {AmbulanceSchema} = require('../ambulance/modelschema');
const {ParamedicSchema} = require('../paramedic/modelschema');

const EmergencySchema = new mongoose.Schema({
  date: { type: Date, require: true},
  typeEmergency: { type: String , require: true},
  locationEmergency: {type: String, require: true},
  ambulance:  {type: AmbulanceSchema, require: true},
  paramedic: {type: [ParamedicSchema], require: true},  
  patient: {type: [mongoose.Schema.Types.Mixed], require: true},
  hospital: {type: mongoose.Schema.Types.Mixed, require: true},
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