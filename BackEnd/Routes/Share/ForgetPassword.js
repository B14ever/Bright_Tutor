const express = require('express')
const router = express.Router()
//controlles
const {ForgetPassword} = require('../../Controllers/Share/ForgetPassword')
router.post('/',ForgetPassword)
module.exports = router