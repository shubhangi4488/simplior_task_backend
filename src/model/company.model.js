const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const UserInfo = require('./userInfo.model')

const Schema = mongoose.Schema;


const companySchema = new Schema({
    CompanyName: { type: String, required: true },
    CompanyEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    AuthToken: {type: String},
});

companySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Company', companySchema);