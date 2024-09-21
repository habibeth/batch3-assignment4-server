import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middleware/vaildRequest";
import { ProductValidationSchema } from "./product.validation";
import { ProductControllers } from "./product.controller";
import { upload } from "../../utils/sendImageToCloudinary";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const route = Router();

route.post(
    '/create-product',
    auth(USER_ROLE.admin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next()
    },
    validateRequest(ProductValidationSchema.createProductValidationSchema),
    ProductControllers.createProduct
)

route.get('/:id', ProductControllers.getSingleProduct);

route.patch(
    '/:id',
    auth(USER_ROLE.admin),
    validateRequest(ProductValidationSchema.updateProductValidationSchema),
    ProductControllers.updateProduct,
);

route.get('/', ProductControllers.getAllProducts);

route.delete(
    '/:id',
    ProductControllers.deleteProduct,
);





export const ProductRoutes = route