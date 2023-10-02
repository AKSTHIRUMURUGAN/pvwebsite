const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    slotNos: {
        type: [String],
        required: true,
    },
    quantity: {
        type: Number,
        default:1,
        required: true,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    id: {
            type: String,
            default:"123",
            required:true

        },
    status: {
            type: String,
            default:"failure",
            required:true
        },

    paidAt: {
        type: Date,
        default: Date.now,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required:true
    },
});

let orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
