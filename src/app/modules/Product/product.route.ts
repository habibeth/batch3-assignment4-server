import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middleware/vaildRequest";
import { ProductValidationSchema } from "./product.validation";
import { ProductControllers } from "./product.controller";
import { upload } from "../../utils/sendImageToCloudinary";

const route = Router();

route.post(
    '/create-product',
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next()
    },
    validateRequest(ProductValidationSchema.createProductValidationSchema),
    ProductControllers.createProduct
)




export const ProductRoutes = route