"use strict";
const HttpResponse = require("../model/http-response"); 
const ExperienceInfo = require("../model/experienceInfo.model");

const addUserExperience = async (req, res) => {
    console.log(req.body);
  let experience;
  try{
    experience=await ExperienceInfo.insertMany(req.body)
  }
  catch(err){
    console.log(err);
    const error = new HttpResponse('Error in getting experience', 500);
    return res.status(500).json({ response: error })
  }
  let allExperience;
  try{
    allExperience=await ExperienceInfo.find({UserInfoId:req.body[0].UserInfoId});
  }
  catch(err){
    const error = new HttpResponse(
      'Error in getting all experience',
      500
    );
    return res.status(500).json({ response: error });
  }
  res.status(200).json(allExperience);
};

const editUserExperience = async (req, res) => {
  const {
    ExperienceInfoId,
    UserInfoId,
    Title,
    EmploymentType,
    CompanyName,
    Location,
    StartDate,
    EndDate,
    Headline,
    Description,
  } = req.body;
  let updatedExperienceInfo;
  try {
    updatedExperienceInfo = await ExperienceInfo.findOneAndUpdate(
      { _id: ExperienceInfoId },
      {
        $set: {
          Title: Title,
          EmploymentType: EmploymentType,
          UserInfoId:UserInfoId,
          CompanyName: CompanyName,
          Location: Location,
          StartDate: StartDate,
          EndDate: EndDate,
          Headline: Headline,
          Description: Description,
        },
      },
      {upsert:true,new:true,runValidators:true}
    );
  }
  catch(err){
      console.log(err);
      const error = new HttpResponse('Error in updation of experience', 500);
      return res.status(500).json({ response: error })
  }
  console.log(updatedExperienceInfo);
  let totalExperience;
  try{
    totalExperience=await ExperienceInfo.find({UserInfoId:UserInfoId})
  }
  catch(err){
    console.log(err)
    const error = new HttpResponse('Something went wrong while getting all experience', 500);
    return res.status(500).json({ response: error })
  }
  return res.status(200).json(totalExperience);
};
exports.addUserExperience = addUserExperience;
exports.editUserExperience = editUserExperience;
