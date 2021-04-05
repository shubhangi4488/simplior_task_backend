const express = require('express');
const validate = require('../middlewares/validateToken')

const allInfoController = require("../controllers/allInfo.controllers");
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.use(validateToken);

router.get('/allInformation/:CompanyId',allInfoController.allUserInfo);

module.exports = router;