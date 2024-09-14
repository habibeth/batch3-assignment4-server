import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { createToken } from "./auth.utils";
import AppError from "../../errors/AppError";

const loginUser = async (payload: TLoginUser) => {
    //checking user exists
    const user = await User.isUserExistsByEmailAddress(payload.email);

    (user.password as any) = undefined

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This User is not Found!')
    }

    // create token 
    const jwtPayload = {
        email: user.email,
        role: user.role
    }

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expire_in as string)
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expire_in as string)


    return {
        refreshToken,
        accessToken,
    }
}


export const AuthServices = {
    loginUser,
}