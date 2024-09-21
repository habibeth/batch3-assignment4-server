"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const sendResponse = (res, data) => {
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: data === null || data === void 0 ? void 0 : data.message,
        meta: data.meta,
        data: data === null || data === void 0 ? void 0 : data.data
    });
};
exports.default = sendResponse;
