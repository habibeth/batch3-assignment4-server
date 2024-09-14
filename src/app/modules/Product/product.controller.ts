import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";


const createProduct: RequestHandler = catchAsync(async (req, res) => {
    const productData = req.body;

    const result = await ProductServices.createProductIntoDB(req.file, productData);
    sendResponse(res, {
        message: 'Product created Successfully',
        data: result
    })
})


export const ProductControllers = {
    createProduct
}