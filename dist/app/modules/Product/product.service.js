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
exports.ProductServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
const createProductIntoDB = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const imageFileName = `${payload === null || payload === void 0 ? void 0 : payload.title}-${payload === null || payload === void 0 ? void 0 : payload.brand}`;
        const path = file === null || file === void 0 ? void 0 : file.path;
        //send Image to Cloudinnary
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageFileName, path);
        payload.image = secure_url;
    }
    const result = yield product_model_1.Product.create(payload);
    return result;
});
const getAllProductsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find({ isDeleted: { $ne: true } }), query)
        .search(product_constant_1.productsSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield productQuery.modelQuery;
    const meta = yield productQuery.countTotal();
    return {
        meta,
        result
    };
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id: id, isDeleted: { $ne: true } });
    return result;
});
const updateProductIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB
};
