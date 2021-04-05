const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const experienceInfoSchema = new Schema({
    UserInfoId: {type:mongoose.Schema.Types.ObjectId, ref:'UserInfo'},
    Title: { type: String, required: true },
    EmploymentType: { type: String, required: true },
    CompanyName: { type: String, required: true },
    Location: { type: String, required: true },
    StartDate: { type: String, required: true },
    EndDate: { type: String, required: true },
    Headline: { type: String, required: true },
    Description: { type: String, required: true }, 
});


module.exports = mongoose.model('ExperienceInfo', experienceInfoSchema);