import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";



const productSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    availableQuantity: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    }
}, {
    timestamps: true,
});


export const Product = model<TProduct>('Product', productSchema);


