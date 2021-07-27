const Category = require('../models/category')

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec( (err, category) => {
        if(err){
            return res.status(400).json({
                message: "Category not found in DB",
                error: err
            })
        }
        res.category = category
        next()
    })
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body)
    category.save( (err, category) => {
        if(err){
            return res.status(400).json({
                message: "Not able to create Category",
                error: err
            })
        }
        res.json({category})
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}