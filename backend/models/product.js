const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    desctiption: {
        type: String,
        trim: true,
        maxlength: 2000,
        required: true
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true})

module.exports = mongoose.model("Product", productSchema)
