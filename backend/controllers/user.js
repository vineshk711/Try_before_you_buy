const User = require('../models/user')
const Order = require('../models/order')
exports.getUserById = (req, res, next ,id) => {
    User.findById(id).exec( (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "Some went wrong or No user found!"
            })
        }
        req.profile = user
        next()
    }) 
}

exports.getUser = (req, res) =>{
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    return res.json(req.profile)
}

exports.updateUser = (req, res) =>{
    User.findByIdAndUpdate(
        { _id: req.profile._id},
        { $set: req.body},
        { new: true, useFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "Authorization revoked! Unable to update user"
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            res.json({
                message: "User info updated successfull!",
                user
            })
        }
    )
}

exports.orderList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec( (err, order) => {
            if(err){
                return res.status(400).json({
                    error: "You have no order!"
                })
            }

            return res.json(order)
        })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach( product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })

    // store the above purchase list into user collection in DB
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$puhs: {purchases: purchases} },
        {new: true},
        (err, purchases) => {
            if(err) {
                return res.status(400).json({
                    message: "Unable to update purchases list",
                    error: err
                })
            }
            next()
        }
    )
}