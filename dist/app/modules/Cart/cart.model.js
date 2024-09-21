"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    userEmail: {
        type: String,
        default: ''
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
    }
}, {
    timestamps: true,
});
exports.Cart = (0, mongoose_1.model)('Cart', cartSchema);
