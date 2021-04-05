const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userInfoSchema = new Schema({
    CompanyId: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Gender: { type: String, required: true },
    DOB: { type: String, required: true },
    ContactNumber: { type: String, required: true },
    Address: { type: String, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    Country: { type: String, required: true },
    Zip: { type: String, required: true }, 
});


module.exports = mongoose.model('UserInfo', userInfoSchema);