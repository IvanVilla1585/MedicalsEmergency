const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
  car: { type: String, require: true},
  car_plate: { type: String, require: true},
  type_ambulance: {type: String, require: true},
  available: {type: Boolean, default: true}
});

AmbulanceSchema.statics = {
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .exec();
  },
  getAmbulanceById(id) {
    return this.findById(id)
      .exec()
      .then((contact) => {
        if (contact) {
          return contact;
        }
        const err = new Error(`La ambulancia con el id ${id} no existe`);
        return Promise.reject(err);
      });
  }
};
const AmbulanceModel = mongoose.model('ambulances', AmbulanceSchema);
exports.AmbulanceModel = AmbulanceModel;
exports.AmbulanceSchema = AmbulanceSchema;