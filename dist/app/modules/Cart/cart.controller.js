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
exports.CartControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const cart_service_1 = require("./cart.service");
const createCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartData = req.body;
    const result = yield cart_service_1.CartServices.createCartIntoDB(cartData);
    (0, sendResponse_1.default)(res, {
        message: 'Cart created Successfully',
        data: result
    });
}));
const getMyCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const result = yield cart_service_1.CartServices.getMyCartFromDB(email);
    (0, sendResponse_1.default)(res, {
        message: 'My Cart retrieved Successfully',
        data: result
    });
}));
const getAllCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_service_1.CartServices.getAllCartFromDB();
    (0, sendResponse_1.default)(res, {
        message: 'Cart retrieved Successfully',
        data: result
    });
}));
const deleteCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_service_1.CartServices.deleteCartIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        message: 'Cart is deleted Successfully',
        data: result,
    });
}));
exports.CartControllers = {
    createCart,
    getMyCart,
    getAllCart,
    deleteCart,
};
