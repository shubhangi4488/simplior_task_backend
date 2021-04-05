const express = require('express');
const validateToken = require('../middlewares/validateToken')

const userInfoController = require("../controllers/user.controllers");

const router = express.Router();

router.use(validateToken);

router.post('/basicDetails',userInfoController.editInfo);

module.exports = router;