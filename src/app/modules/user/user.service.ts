import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";


const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
}


export const UserServices = {
    createUserIntoDB,
}