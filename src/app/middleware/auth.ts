import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync"
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import AppError from "../errors/AppError";



const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        //check token  exists or not
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorize Persons!")
        }

        //check verification auth token

        let decoded;
        try {
            decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            ) as JwtPayload;
        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'UnAuthorized');
        }


        const { role, email, iat } = decoded

        //checking user exists
        const user = await User.isUserExistsByEmailAddress(email)


        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This User is not Found!')
        }

        //checking user status deleted or active
        const isDeleted = user?.isDeleted
        if (isDeleted) {
            throw new AppError(httpStatus.FORBIDDEN, "This User is Already Deleted")
        }



        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorize Person!")
        }
        req.user = decoded as JwtPayload;
        next()
    })
}

export default auth;