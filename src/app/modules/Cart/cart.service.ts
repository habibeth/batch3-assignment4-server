import { TCart } from "./cart.interface";
import { Cart } from "./cart.model";
import { Product } from "../Product/product.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const createCartIntoDB = async (payload: TCart) => {
    try {
        const product = await Product.findById(payload.product);
        if (!product) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Product is not Available');
        }
        if (product?.availableQuantity < 0) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Product Quantity is not Available');
        }

        const user = await User.isUserExistsByEmailAddress(payload.userEmail!)
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User does not exist!');
        }

        const id = product._id
        const availableQuantity = product.availableQuantity - 1;

        const productQuantity = await Product.findByIdAndUpdate(
            id,
            { availableQuantity },
            { new: true },
        );

        const existCart = await Cart.findOne({ product: product._id, userEmail: user.email, isDeleted: { $ne: true } }).populate('product');

        if (existCart) {
            const quantity = payload.quantity + existCart?.quantity!
            const price = payload.price + existCart?.price!
            const result = await Cart.findByIdAndUpdate(
                existCart._id,
                { quantity, price },
                { new: true },
            )

            return result;
        }



        const result = await Cart.create(payload);

        return result;
    } catch (error) {
        console.log(error)
    }

}

const getMyCartFromDB = async (email: string) => {
    const result = await Cart.find({ userEmail: email, isDeleted: { $ne: true } }).populate('product');

    return result;
};

const getAllCartFromDB = async () => {
    const result = await Cart.find({ isDeleted: { $ne: true } });
    return result;
};

const deleteCartIntoDB = async (ids: string[]) => {
    console.log("services", ids)
    const result = await Cart.updateMany(
        { product: { $in: ids } },
        { isDeleted: true },
        {
            new: true,
            runValidators: true,
        }
    );
    return result;
};


export const CartServices = {
    createCartIntoDB,
    getMyCartFromDB,
    getAllCartFromDB,
    deleteCartIntoDB
}