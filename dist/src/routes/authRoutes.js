"use strict";
// export default router;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userSchema_1 = require("../schemas/userSchema");
const validate_1 = require("../middleware/validate");
const asyncHandler_middleware_1 = __importDefault(require("../middleware/asyncHandler.middleware"));
const ioc_config_1 = require("../config/ioc.config");
const ioc_types_1 = require("../config/ioc.types");
const auth_1 = require("../middleware/auth");
const accountRouter = (0, express_1.Router)();
const accountController = ioc_config_1.container.get(ioc_types_1.TYPES.AccountController);
/**
 * @swagger
 * tags:
 *   - name: Account
 *     description: Authentication
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *             example:
 *               email: sidharth@gmrwebteam.com
 *               password: "Sid@789"
 *     responses:
 *       200: { description: Success }
 */
// accountRouter.post("/login", validate(loginSchema), login);
accountRouter.post("/login", [(0, validate_1.validate)(userSchema_1.loginSchema)], (0, asyncHandler_middleware_1.default)(accountController.login));
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout the current user
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
accountRouter.post("/logout", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(accountController.logout));
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create User
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               phone: { type: string }
 *     responses:
 *       201: { description: Created }
 */
accountRouter.post("/signup", [(0, validate_1.validate)(userSchema_1.signupSchema)], (0, asyncHandler_middleware_1.default)(accountController.register));
/**
 * @swagger
 * /auth/refreshToken:
 *   post:
 *     summary: Refresh JWT Token
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: OTP sent (or masked success response)
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
accountRouter.post("/refreshToken", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(accountController.refreshToken));
/**
 * @swagger
 * /auth/otp/send:
 *   post:
 *     summary: Request OTP for password reset
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: OTP sent (or masked success response)
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
accountRouter.post("/otp/send", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(accountController.sentOtp));
/**
 * @swagger
 * /auth/verify:
 *   post:
 *     summary: Reset password using OTP
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: "websidharth@gmail.com"
 *               otp:
 *                 type: string
 *                 example: "7452"
 *                 description: OTP received on email
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid OTP / expired OTP / password mismatch
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
accountRouter.get("/verify/:otp", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(accountController.otpVerify));
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request OTP for password reset
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP sent (or masked success response)
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
accountRouter.post("/forgot-password", (0, asyncHandler_middleware_1.default)(accountController.forgotPassword));
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password using OTP
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               otp:
 *                 type: string
 *                 example: "7452"
 *                 description: OTP received on email
 *               newPassword:
 *                 type: string
 *                 example: "NewStrong@123"
 *               confirmPassword:
 *                 type: string
 *                 example: "NewStrong@123"
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid OTP / expired OTP / password mismatch
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
accountRouter.post("/reset-password", (0, asyncHandler_middleware_1.default)(accountController.resetPassword));
exports.default = accountRouter;
//# sourceMappingURL=authRoutes.js.map