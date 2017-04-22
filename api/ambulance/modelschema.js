const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
  car: { type: String, require: true},
  car_plate: { type: String, require: true},
  type_ambulance: {type: String, require: true},
  available: {type: Boolean, require: true}
});

AmbulanceSchema.statics = {
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .exec();
  },
  getContactById(id) {
    return this.findById(id)
      .exec()
      .then((contact) => {
        if (contact) {
          return contact;
        }
        const err = new Error(`not found the ambulance with the id ${id}`);
        return Promise.reject(err);
      });
  }
};
const AmbulanceModel = mongoose.model('ambulances', AmbulanceSchema);
exports.AmbulanceModel = AmbulanceModel;
exports.AmbulanceSchema = AmbulanceSchema;