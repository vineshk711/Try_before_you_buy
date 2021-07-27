const express = require('express')
const router = express.Router()

const { getUserById } = require('../controllers/user')
const { getCategoryById, createCategory, getCategory } = require('../controllers/category')
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth')

// params
router.param("userId", getUserById)
router.param("categoryId", getCategoryById)


// routes
router.post("/category/create/:userId", isSignedIn, isAuthenticated, createCategory)
router.get("/category/:categoryId", getCategory)



module.exports = router