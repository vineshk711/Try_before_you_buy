const Product = require('../models/product')

exports.getProductById = (req, res, next ,id) => {
    Product.findById(id)
        .populate('category')
        .exec((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "porduct not found",
                    message: err
                })
            }
            req.product = product
            next()   
        })
}

exports.createProduct = (req, res) => {
    
}