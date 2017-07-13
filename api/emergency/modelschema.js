const mongoose = require('mongoose');
const { ParamedicSchema } = require('../paramedic/modelschema');
const { AmbulanceSchema } = require('../ambulance/modelschema');

const EmergencySchema = new mongoose.Schema({
  date: { type: Date, require: true},
  type_emergency: { type: String, require: true },
  driver: {type: ParamedicSchema, require: true},
  ambulance: {type: AmbulanceSchema, require: true},
  paramedic: {type: [ParamedicSchema], require: true},
  patient: {type: [mongoose.Schema.Types.Mixed], require: true},
  location: {
    type: {
      type: String,
      default: 'Point',
      require: true
    },
    coordinates: [Number]
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
  getEmergencyById(id) {
    return this.findById(id)
      .exec()
      .then((emergency) => {
        if (emergency) {
          return emergency;
        }
        const err = new Error(`La emergencia con el id ${id} no existe`);
        return Promise.reject(err);
      });
  }
};
const EmergencyModel = mongoose.model('emergencies', EmergencySchema);
exports.EmergencyModel = EmergencyModel;