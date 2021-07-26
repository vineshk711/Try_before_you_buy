const express = require('express')
const router = express.Router()

const { getUser, getUserById, updateUser, orderList } = require('../controllers/user')
const { isSignedIn, isAuthenticated } = require('../controllers/auth')



router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, orderList)


module.exports = router
