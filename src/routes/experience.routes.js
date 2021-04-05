const express = require('express');
const validateToken = require('../middlewares/validateToken')

const experienceController = require("../controllers/experience.controllers");

const router = express.Router();

router.use(validateToken);

router.post('/addUserExperience',experienceController.addUserExperience);
router.post('/editUserExperience',experienceController.editUserExperience);

module.exports = router;