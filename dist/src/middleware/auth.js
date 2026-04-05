"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const response = {
            success: false,
            message: "Token missing",
        };
        res.status(401).json(response);
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        const response = {
            success: false,
            message: "Token missing",
        };
        res.status(401).json(response);
        return;
    }
    try {
        if (!config_1.default.jwt.secret) {
            const response = {
                success: false,
                message: "MiJWT secret not configured",
            };
            res.status(500).json(response);
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
        req.user = {
            userId: decoded.userId,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
        };
        return next();
    }
    catch (err) {
        const response = {
            success: false,
            message: "Invalid or expired token",
        };
        res.status(401).json(response);
        return;
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.js.map