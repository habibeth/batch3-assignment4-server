import { model, Schema } from "mongoose";
import { TCart } from "./cart.interface";



const cartSchema = new Schema(
    {
        userEmail: {
            type: String,
            default: ''
        },
        product: {
            type: Schema.Types.ObjectId,
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
    },
    {
        timestamps: true,
    }
);


export const Cart = model<TCart>('Cart', cartSchema);


