const express = require('express')
const router = express.Router()
//controlles
const {RecoverPassword} = require('../../Controllers/Share/RecoverPassword')
//midleware
const {JWT_Verification} = require('../../MiddleWare/JWT_Verification')
router.put('/',JWT_Verification,RecoverPassword)
module.exports = router