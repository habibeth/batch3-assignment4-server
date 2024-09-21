"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = require("express");
const vaildRequest_1 = __importDefault(require("../../middleware/vaildRequest"));
const cart_validation_1 = require("./cart.validation");
const cart_controller_1 = require("./cart.controller");
const route = (0, express_1.Router)();
route.get('/:email', cart_controller_1.CartControllers.getMyCart);
route.post('/add-cart', (0, vaildRequest_1.default)(cart_validation_1.CartValidationSchema.createCartValidationSchema), cart_controller_1.CartControllers.createCart);
route.get('/', cart_controller_1.CartControllers.getAllCart);
route.delete('/', cart_controller_1.CartControllers.deleteCart);
exports.CartRoutes = route;
