"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //checking user exists
    const user = yield user_model_1.User.isUserExistsByEmailAddress(payload.email);
    user.password = undefined;
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This User is not Found!');
    }
    // create token 
    const jwtPayload = {
        email: user.email,
        role: user.role
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expire_in);
    return {
        refreshToken,
        accessToken,
    };
});
exports.AuthServices = {
    loginUser,
};
