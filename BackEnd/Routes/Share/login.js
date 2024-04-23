const express = require('express')
const router = express.Router()
//controller
const {Login} = require('../../Controllers/Share/Login')
router.post('/',Login)
module.exports = router