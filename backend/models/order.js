const { Mongoose } = require("mongoose");

const orderSchema = Mongoose.Schema({

    products: {
        type: Array,
        default: []
    },
    transaction_id: {
        type: Number,
        maxlength: 32,
        trim: true,
    },
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
        type: Number,
        default: 0,
    },
    updated: {
        type: Number,
        default: 0,
    },
    user: {
        type: String,
        trim: true,
        maxlength: 32,
    }

})