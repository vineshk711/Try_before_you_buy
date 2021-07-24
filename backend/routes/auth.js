const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const { signup, signout } = require('../controllers/auth')

router.post("/signup",[
    check('name', "Name should be atleast 3 chars long").minLength({min: 3}),
    check('email', "Enter a valid email").isEmail(),
    check('password', "Password should be atleast 3 chars long").minLength({min: 3})
], signup)
router.get("/signout", signout)

module.exports = router