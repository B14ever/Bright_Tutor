const express  = require('express')
const router = express.Router()
const {RefershToken} = require('../../Controllers/Share/RefershToken')
router.post('/',RefershToken)
module.exports = router