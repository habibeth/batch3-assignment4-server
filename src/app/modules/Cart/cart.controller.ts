import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CartServices } from "./cart.service";



const createCart: RequestHandler = catchAsync(async (req, res) => {
    const cartData = req.body;

    const result = await CartServices.createCartIntoDB(cartData);
    sendResponse(res, {
        message: 'Cart created Successfully',
        data: result
    })
})
const getMyCart = catchAsync(async (req, res) => {
    const { email } = req.params;
    const result = await CartServices.getMyCartFromDB(email);
    sendResponse(res, {
        message: 'My Cart retrieved Successfully',
        data: result
    })
})

const getAllCart = catchAsync(async (req, res) => {

    const result = await CartServices.getAllCartFromDB();
    sendResponse(res, {
        message: 'Cart retrieved Successfully',
        data: result
    })
})


const deleteCart = catchAsync(async (req, res) => {
    const result = await CartServices.deleteCartIntoDB(req.body);

    sendResponse(res, {
        message: 'Cart is deleted Successfully',
        data: result,
    });
});


export const CartControllers = {
    createCart,
    getMyCart,
    getAllCart,
    deleteCart,
}