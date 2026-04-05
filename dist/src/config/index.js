"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
const config = {
    jwt: {
        secret: process.env.JWT_SECRET || "",
        audience: process.env.JWT_AUDIENCE || "",
        issuer: process.env.JWT_ISSUER || "",
        accessExpires: process.env.JWT_ACCESS_EXPIRES || "15m",
        refreshExpires: process.env.JWT_REFRESH_EXPIRES || "7d",
    },
};
exports.default = config;
//# sourceMappingURL=index.js.map