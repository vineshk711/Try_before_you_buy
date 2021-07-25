const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const { signup, signin ,signout, isSignedIn, isAuthenticated } = require('../controllers/auth')

router.post("/signup",[
    check('name', "Name should be atleast 3 chars long").isLength({min: 3}),
    check('email', "Enter a valid email").isEmail(),
    check('password', "Password should be atleast 3 chars long").isLength({min: 3})
], signup)

router.post("/signin",[
    check('email', "Enter a valid email").isEmail(),
    check('password', "Password is required").isLength({min: 1})
], signin)


router.post("/test", isSignedIn, isAuthenticated,(req, res) => {
    res.send('this is protected route')
})

router.get("/signout", signout)

module.exports = router
