import { z } from 'zod';


const createProductValidationSchema = z.object({
    body: z.object({
        image: z.string(),
        title: z.string(),
        brand: z.string(),
        availableQuantity: z.number(),
        price: z.number(),
        rating: z.number(),
    })
});

export const ProductValidationSchema = {
    createProductValidationSchema
}