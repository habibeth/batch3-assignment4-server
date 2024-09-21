import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middleware/vaildRequest";
import { upload } from "../../utils/sendImageToCloudinary";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { CartValidationSchema } from "./cart.validation";
import { CartControllers } from "./cart.controller";

const route = Router();

route.get(
    '/:email',
    CartControllers.getMyCart,
);

route.post(
    '/add-cart',
    validateRequest(CartValidationSchema.createCartValidationSchema),
    CartControllers.createCart
);

route.get('/', CartControllers.getAllCart);

route.delete(
    '/',
    CartControllers.deleteCart,
);





export const CartRoutes = route