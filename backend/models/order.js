const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const orderSchema = Mongoose.Schema({

    products: [productCartSchema],
    transaction_id: {},
    amount: {
        type: Number,
        maxlength: 32,
        trim: true,
    },
    address: {
        type: String,
        trim: true,

        maxlength: 2000,
    },
    status: {
        type: String,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }

}, {timestamps: true})

const productCartSchema = mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: {
        type: String,
        maxlength: 32,
        trim: true
    },
    count: {
        type: Number,
        maxlength: 32,
    },
    price: {
        type: Number,
        maxlength: 32,
        trim: true
    }
}, {timestamps: true})

module.exports = {
    orderCollection: mongoose.model("Order", orderSchema),
    productCartCollection: mongoose.model("ProductCart", productCartSchema)
}