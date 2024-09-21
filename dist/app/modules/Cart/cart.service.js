"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartServices = void 0;
const cart_model_1 = require("./cart.model");
const product_model_1 = require("../Product/product.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const createCartIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.Product.findById(payload.product);
        if (!product) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Product is not Available');
        }
        if ((product === null || product === void 0 ? void 0 : product.availableQuantity) < 0) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Product Quantity is not Available');
        }
        const user = yield user_model_1.User.isUserExistsByEmailAddress(payload.userEmail);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist!');
        }
        const id = product._id;
        const availableQuantity = product.availableQuantity - 1;
        const productQuantity = yield product_model_1.Product.findByIdAndUpdate(id, { availableQuantity }, { new: true });
        const existCart = yield cart_model_1.Cart.findOne({ product: product._id, userEmail: user.email, isDeleted: { $ne: true } }).populate('product');
        if (existCart) {
            const quantity = payload.quantity + (existCart === null || existCart === void 0 ? void 0 : existCart.quantity);
            const price = payload.price + (existCart === null || existCart === void 0 ? void 0 : existCart.price);
            const result = yield cart_model_1.Cart.findByIdAndUpdate(existCart._id, { quantity, price }, { new: true });
            return result;
        }
        const result = yield cart_model_1.Cart.create(payload);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const getMyCartFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.find({ userEmail: email, isDeleted: { $ne: true } }).populate('product');
    return result;
});
const getAllCartFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.find({ isDeleted: { $ne: true } });
    return result;
});
const deleteCartIntoDB = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("services", ids);
    const result = yield cart_model_1.Cart.updateMany({ product: { $in: ids } }, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.CartServices = {
    createCartIntoDB,
    getMyCartFromDB,
    getAllCartFromDB,
    deleteCartIntoDB
};
