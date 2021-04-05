"use strict"

const HttpResponse = require('../model/http-response');
const Company = require('../model/company.model');  
const UserInfo = require("../model/userInfo.model");
const ExperienceInfo = require("../model/experienceInfo.model");

const allUserInfo=async(req,res)=>{
    let userBasicDetails;
    try{
        userBasicDetails=await UserInfo.findOne({CompanyId:req.params.CompanyId})
    }
    catch(err){
        console.log(err)
        const error = new HttpResponse(
            'Error in getting user basic details',
            500
          );
        return res.status(500).json({ response: error });
    }
    if(userBasicDetails){
        let userExperienceDetails;
    try{
        userExperienceDetails=await ExperienceInfo.find({UserInfoId:userBasicDetails._id})
    }
    catch(err){
        console.log(err)
        const error = new HttpResponse(
            'Error in getting all experience',
            500
          );
        return res.status(500).json({ response: error });
    }

    return res.status(200).json({details:userBasicDetails,experience:userExperienceDetails});
    }
    else{
        return res.status(500).json({details:"undefined"});
    }
}


exports.allUserInfo=allUserInfo;