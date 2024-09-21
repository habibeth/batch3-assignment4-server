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


const getSingleProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ProductServices.getSingleProductFromDB(id);

    sendResponse(res, {
        message: 'Product is retrieved successFully',
        data: result,
    })
})

const getAllProducts = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await ProductServices.getAllProductsFromDB(query);

    sendResponse(res, {
        message: 'Products are retrieved successfully',
        meta: result.meta,
        data: result.result,
    })
})

const updateProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ProductServices.updateProductIntoDB(id, req.body);

    sendResponse(res, {
        message: 'Product Updated successfully',
        data: result,
    })
})

const deleteProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ProductServices.deleteProductFromDB(id);

    sendResponse(res, {
        message: 'Product is deleted Successfully',
        data: result,
    });
});


export const ProductControllers = {
    createProduct,
    getSingleProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}