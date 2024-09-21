import { z } from 'zod';


const createProductValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        brand: z.string(),
        availableQuantity: z.number(),
        price: z.number(),
        rating: z.number(),
    })
});


const updateProductValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        brand: z.string().optional(),
        availableQuantity: z.number().optional(),
        price: z.number().optional(),
        rating: z.number().optional(),
    })
});

export const ProductValidationSchema = {
    createProductValidationSchema,
    updateProductValidationSchema
}