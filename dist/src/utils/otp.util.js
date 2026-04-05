"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateOtp = () => {
    const buffer = crypto_1.default.randomBytes(2);
    const otp = ((buffer.readUInt16BE(0) % 9000) + 1000).toString(); // 4-digit
    return { otp };
};
exports.generateOtp = generateOtp;
//# sourceMappingURL=otp.util.js.map