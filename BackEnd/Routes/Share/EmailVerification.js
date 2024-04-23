const express = require('express')
const router = express.Router()
//controlles
const {EmailVerification} = require('../../Controllers/Share/EmailVerificatrion')
const {RequestCode} = require('../../Controllers/Share/RequestCode')
//midleware
const {JWT_Verification} = require('../../MiddleWare/JWT_Verification')
router.post('/',JWT_Verification,EmailVerification)
router.post('/requestcode',JWT_Verification,RequestCode)

module.exports = router