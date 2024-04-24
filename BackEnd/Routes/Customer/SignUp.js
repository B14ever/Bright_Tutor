const express = require('express')
const router = express.Router()
//controller
const {SignUp} = require('../../Controllers/Customer/SignUp')
router.post('/',SignUp)
module.exports = router