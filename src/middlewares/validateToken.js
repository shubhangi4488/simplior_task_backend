const jwt = require('jsonwebtoken');
const HttpResponse = require('../model/http-response');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, "my toKen");
    req.userData = { email: decodedToken.email };
    next(); 
  } catch (err) {
    const error = new HttpResponse('Authentication failed!', 403);
    return res.json({ response: error });
  }
};