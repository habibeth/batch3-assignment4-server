"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidationSchema = void 0;
const zod_1 = require("zod");
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        brand: zod_1.z.string(),
        availableQuantity: zod_1.z.number(),
        price: zod_1.z.number(),
        rating: zod_1.z.number(),
    })
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
        availableQuantity: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        rating: zod_1.z.number().optional(),
    })
});
exports.ProductValidationSchema = {
    createProductValidationSchema,
    updateProductValidationSchema
};
