const User = require('../models/user')
const { validationResult } = require('express-validator')

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

exports.signout = ( req, res ) => {
    res.json({
        message: "Sign out route works"
    })
}