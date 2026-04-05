"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmailVerificationToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateEmailVerificationToken = () => {
    // random token safe for URL
    const token = crypto_1.default.randomBytes(32).toString("hex");
    // expires in 15 minutes
    const expires = new Date(Date.now() + 15 * 60 * 1000);
    return { token, expires };
};
exports.generateEmailVerificationToken = generateEmailVerificationToken;
//# sourceMappingURL=emailVerification.service.js.map