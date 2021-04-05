"use strict"
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpResponse = require('../model/http-response');
const Company = require('../model/company.model');

const signup = async (req, res) => {
  const { CompanyName, CompanyEmail, password} = req.body;
  // checking if user already exists
  let existingUser;
  try {
    existingUser = await Company.findOne({ CompanyEmail: CompanyEmail })
  } catch (err) {
    const error = new HttpResponse(
      'Signing up failed, Something went wrong while checking existing user',
      500
    );
    return res.status(500).json({ response: error });
  }

  if (existingUser) {
    const error = new HttpResponse(
      'User exists already, please login instead.',
      422
    );
    return res.status(422).json({ response: error });
  }

  //creating a hashed password and saving the user into mongo.
  let hashedPassword;
  try {
    hashedPassword = await bycrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpResponse("Hashing Failed ..", 500)
    return res.status(500).json({ response: error });
  }
  const createdUser = new Company({
    CompanyName,
    CompanyEmail,
    password: hashedPassword
  });
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err)
    const error = new HttpResponse(
      err,
      500
    );
    return res.status(500).json({ response: error })
  }

  //generating JWT TOKEN- DO NOT TOUCH
  let token;
  try {
    token = jwt.sign({ userId: createdUser.id, email: createdUser.CompanyEmail },
      "my toKen",
      { expiresIn: '21d' });
  } catch (err) {
    const error = new HttpResponse(
      "Token generation failed, Login not done",
      500
    );
    return res.status(500).json({ response: error });
  }
  res.status(201).json({
    CompanyId: createdUser.id,
    CompanyName: createdUser.CompanyName,
    CompanyEmail: createdUser.CompanyEmail,
    token: token
  });
};


// LOGIN FUNCTION
const login = async (req, res) => {
  const { CompanyEmail, password } = req.body;

  //trying to find if user email exists.
  let existingUser;
  try {
    existingUser = await Company.findOne({ CompanyEmail: CompanyEmail })
  } catch (err) {
    const error = new HttpResponse(
      'Something went wrong while checking user email',
      500
    );
    return res.status(500).json({ response: error })
  }

  if (!existingUser) {
    const error = new HttpResponse(
      'Invalid credentials, could not log you in.',
      401
    );
    return res.status(500).json({ response: error })
  }
  let isValidPassword;
  try {
    isValidPassword = await bycrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpResponse('Something went wrong while comparing passwords', 500);
    return res.status(500).json({ response: error })
  }

  if (!isValidPassword) {
    const error = new HttpResponse('Wrong password entered', 401);
    return res.status(401).json({ response: error });
  }

  //generating JWT TOKEN- DO NOT TOUCH
  let token;
  try {
    token = jwt.sign({ userId: existingUser.id, email: existingUser.CompanyEmail},
      "my toKen",
      { expiresIn: '21d' });
  } catch (err) {
    const error = new HttpResponse(
      "Token generation failed, Login not done",
      500
    );
    return res.status(500).json({ response: error });
  }
  console.log(existingUser);
  res.json({
    CompanyId: existingUser.id,
    CompanyName: existingUser.CompanyName,
    CompanyEmail: existingUser.CompanyEmail,
    token: token
  });
  console.log(token);
};

exports.singup = signup;
exports.login = login;