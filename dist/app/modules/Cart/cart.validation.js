"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidationSchema = void 0;
const zod_1 = require("zod");
const createCartValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userEmail: zod_1.z.string().optional(),
        product: zod_1.z.string(),
        quantity: zod_1.z.number(),
        price: zod_1.z.number()
    })
});
exports.CartValidationSchema = {
    createCartValidationSchema,
};
