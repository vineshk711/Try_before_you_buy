const Category = require('../models/category')

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec( (err, category) => {
        if(err){
            return res.status(400).json({
                message: "Category not found in DB",
                error: err
            })
        }
        req.category = category
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

exports.getAllCategories = (req, res) => {
    Category.find().exec( (err, categories) => {
        if(err){
            return res.status(400).json({
                message: "Unable to find any category",
                error: err
            })
        }
        res.json({categories})
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category
    category.name = req.body.name
    
    category.save( (err, updatedCategory) => {
        if(err) {
            return req.status(400).json({
                message: "Unable to update category",
                error: err
            })
        }
        res.json({
            message: `Updated category to ${updatedCategory.name}`
        })
    })
}

exports.removeCategory = (req, res) => {
    const category = req.category
    category.remove( (err, removedCategory) => {
        if(err || !removedCategory) {
            return res.status(400).json({
                message: "Unable to delete category",
                error: err
            })
        }
        res.json({
            message: `${removedCategory.name} is successfully deleted`
        })
    })
}