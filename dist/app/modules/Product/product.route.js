"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const vaildRequest_1 = __importDefault(require("../../middleware/vaildRequest"));
const product_validation_1 = require("./product.validation");
const product_controller_1 = require("./product.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const route = (0, express_1.Router)();
route.post('/create-product', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, vaildRequest_1.default)(product_validation_1.ProductValidationSchema.createProductValidationSchema), product_controller_1.ProductControllers.createProduct);
route.get('/:id', product_controller_1.ProductControllers.getSingleProduct);
route.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, vaildRequest_1.default)(product_validation_1.ProductValidationSchema.updateProductValidationSchema), product_controller_1.ProductControllers.updateProduct);
route.get('/', product_controller_1.ProductControllers.getAllProducts);
route.delete('/:id', product_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = route;
