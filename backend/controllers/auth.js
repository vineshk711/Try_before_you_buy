const User = require('../models/user')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = ( req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(442).json({
            error: errors.array()[0].msg,
            in: errors.array()[0].param
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to add user into DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
}

exports.signin = ( req, res ) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(442).json({
            error: errors.array()[0].msg,
            in: errors.array()[0].param
        })
    }

    const {email, password} = req.body
    
    User.findOne({email} , ( err, user ) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User does not exists"
            })
        }

        if(!user.auth(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }
        const { _id, name, email, role} = user
        
        // creating web token
        const token = jwt.sign({ _id: _id}, process.env.SECRET )

        // Put token into cookie
        res.cookie("token", token, { expire: new Date() + 9999})

        // sending response to frontend
        return res.json({ token, user: { _id, name, email, role}})
    })

}

exports.signout = ( req, res ) => {
    res.json({
        message: "Sign out route works"
    })
}