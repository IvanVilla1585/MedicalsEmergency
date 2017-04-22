const mongoose = require('mongoose');
const { ParamedicModel } = require('../paramedic/modelschema');
const { AmbulanceModel } = require('../ambulance/modelschema');

const EmergencySchema = new mongoose.Schema({
  date: { type: Date, require: true},
  typeEmergency: { type: String, require: true },
  driver: {type: ParamedicModel, require: true},
  ambulance: {type: AmbulanceModel, require: true},
  paramedic: {type: [ParamedicModel], require: true},
  patient: {any: [Object], require: true},
  hospital: {any: [Object], require: true},
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number],
    require: true
  }
});

EmergencySchema.index({ location: '2dsphere' });

EmergencySchema.statics = {
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .exec();
  },
  getEmergencySchemaById(id) {
    return this.findById(id)
      .exec()
      .then((emergency) => {
        if (emergency) {
          return emergency;
        }
        const err = new Error(`not found the ambulance with the id ${id}`);
        return Promise.reject(err);
      });
  }
};
const EmergencyModel = mongoose.model('emergencies', EmergencySchema);
exports.EmergencyModel = EmergencyModel;