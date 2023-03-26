const { Router } = require('express')
const router = Router()
const auth = require('../controller/auth.js')


router.get('/login', auth.getLogin)

// Post login
router.post('/login', auth.login)

// Get register 
router.get('/register', auth.getRegister)

// Post register
router.post('/register', auth.register)

module.exports = router