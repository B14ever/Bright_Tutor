const express = require('express')
const router = express.Router()
//controller
const {SignUp} = require('../../Controllers/Tutors/SignUp')
router.post('/',SignUp)
module.exports = router