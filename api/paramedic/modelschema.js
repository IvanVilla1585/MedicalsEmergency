const mongoose = require('mongoose');

const ParamedicSchema = new mongoose.Schema({
  name: { type: String, require: true},
  lastname: { type: String},
  phone: {type: String, require: true},
  gender: {type: Number, require: true},
  cellPhone: {type: String},
  birthdate: {type: Date},
  specialization: {type: String, require: true}
});

ParamedicSchema.statics = {
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .exec();
  },
  getParamedicById(id) {
    return this.findById(id)
      .exec()
      .then((contact) => {
        if (contact) {
          return contact;
        }
        const err = new Error(`not found the paramedic with the id ${id}`);
        return Promise.reject(err);
      });
  }
};
const ParamedicModel = mongoose.model('paramedics', ParamedicSchema);
exports.ParamedicModel = ParamedicModel;