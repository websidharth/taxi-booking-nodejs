"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const custom_error_1 = __importDefault(require("../exceptions/custom-error"));
function errorHandler(err, req, res, next) {
    if (!(err instanceof custom_error_1.default)) {
        const response = {
            success: false,
            message: process.env.NODE_ENV === 'development' ? err.message : 'Server error, please try again later',
        };
        res.status(500).json(response);
        return;
    }
    else {
        const customError = err;
        let response = { message: customError.message, };
        // Check if there is more info to return.
        if (customError.additionalInfo) {
            response.additionalInfo = customError.additionalInfo;
        }
        const jsonResponse = {
            success: false,
            message: response.message,
            ...(response.additionalInfo ? { errors: [response.additionalInfo] } : {}),
        };
        res.status(customError.status).json(jsonResponse);
        return;
    }
}
//# sourceMappingURL=errorHandler.middleware.js.map