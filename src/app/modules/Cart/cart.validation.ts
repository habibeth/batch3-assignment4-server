import { z } from 'zod';


const createCartValidationSchema = z.object({
    body: z.object({
        userEmail: z.string().optional(),
        product: z.string(),
        quantity: z.number(),
        price: z.number()
    })
});

export const CartValidationSchema = {
    createCartValidationSchema,
}