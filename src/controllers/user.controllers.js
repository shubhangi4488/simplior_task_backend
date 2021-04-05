"use strict";
const HttpResponse = require("../model/http-response"); //for response with message and code
const UserInfo = require("../model/userInfo.model"); //userInfoSchema

const editInfo = async (req, res) => {
  const {
    CompanyId,
    UserId,
    FirstName,
    LastName,
    Gender,
    DOB,
    ContactNumber,
    Address,
    City,
    State,
    Country,
    Zip,
  } = req.body;
  console.log(UserId);
  if (UserId === undefined) {
    let basicDetails = new UserInfo({
      CompanyId,
      FirstName,
      LastName,
      Gender,
      DOB,
      ContactNumber,
      Address,
      City,
      State,
      Country,
      Zip,
    });
    try {
      await basicDetails.save();
    } catch (err) {
      console.log(err);
      const error = new HttpResponse(err, 500);
      return res.status(500).json({ response: error });
    }
    return res.status(200).json(basicDetails);
  } else if(UserId!==undefined) {
    let updatedInfo;
    try {
      updatedInfo = await UserInfo.findOneAndUpdate(
        { _id: UserId },
        {
          $set: {
            FirstName: FirstName,
            LastName: LastName,
            Gender: Gender,
            DOB: DOB,
            ContactNumber: ContactNumber,
            Address: Address,
            City: City,
            State: State,
            Country: Country,
            Zip: Zip,
          },
        },
        {new:true,runValidators:true}
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json("Error in Updation");
    }
    return res.status(200).json(updatedInfo);
  }
};

exports.editInfo = editInfo;