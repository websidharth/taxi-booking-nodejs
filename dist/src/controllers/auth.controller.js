"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const ioc_config_1 = require("../config/ioc.config");
const ioc_types_1 = require("../config/ioc.types");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custom_error_1 = __importDefault(require("../exceptions/custom-error"));
const user_enum_1 = require("../enum/user.enum");
const config_1 = __importDefault(require("../config"));
const emailDispatcher_util_1 = require("../utils/email/emailDispatcher.util");
const authHelpers_service_1 = require("../utils/authHelpers.service");
const timeExpiry_util_1 = require("../utils/timeExpiry.util");
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
class AccountController {
    constructor(unitOfService = ioc_config_1.container.get(ioc_types_1.TYPES.IUnitOfService)) {
        this.unitOfService = unitOfService;
        this.login = async (req, res) => {
            const model = req.body;
            let response;
            if (!model.email || !model.password) {
                const response = {
                    success: false,
                    message: "Email and password are required",
                };
                return res.status(400).json(response);
            }
            const loggedInUser = await this.unitOfService.User.getByEmail(model.email);
            if (!loggedInUser) {
                const response = {
                    success: false,
                    message: "Invalid email or password", // Don't specify which one is wrong
                };
                return res.status(401).json(response);
            }
            const isPasswordValid = await bcryptjs_1.default.compare(model.password, loggedInUser.password || "");
            if (!isPasswordValid) {
                throw new Error("Invalid email or password");
            }
            const token = jsonwebtoken_1.default.sign({
                id: loggedInUser.id,
                userId: loggedInUser.userId,
                name: loggedInUser.name,
                email: loggedInUser.email,
                role: loggedInUser.role,
                //expiresIn: config.jwt.accessExpires,
            }, config_1.default.jwt.secret, {
                expiresIn: "10h",
                algorithm: "HS256",
                audience: config_1.default.jwt.audience,
                issuer: config_1.default.jwt.issuer,
                notBefore: "0", // Cannot use before now, can be configured to be deferred.
            });
            const refreshToken = jsonwebtoken_1.default.sign({
                id: loggedInUser.id,
                userId: loggedInUser.userId,
                name: loggedInUser.name,
                email: loggedInUser.email,
                role: loggedInUser.role,
                //expiresIn: config.jwt.refreshExpires,
            }, config_1.default.jwt.secret, {
                expiresIn: "30d",
                algorithm: "HS256",
                audience: config_1.default.jwt.audience,
                issuer: config_1.default.jwt.issuer,
                notBefore: "0", // Cannot use before now, can be configured to be deferred.
            });
            const user = await this.unitOfService.Account.login(model, token, refreshToken);
            if (!user) {
                const response = {
                    success: false,
                    message: "Login failed",
                };
                return res.status(400).json(response);
            }
            if (!user.isEmailVerified) {
                const response = {
                    success: true,
                    message: "Login successful",
                    data: { token, user }
                };
                return res.status(200).json(response);
            }
            response = {
                success: false,
                message: "Login Unsuccessful",
            };
            return res.status(400).json(response);
        };
        this.logout = async (req, res) => {
            // Invalidate the token (implementation depends on token storage strategy, e.g., blacklist)
            const userId = req.user?.userId;
            if (!userId) {
                throw new custom_error_1.default('User ID is required', 400);
            }
            const clearToken = await this.unitOfService.Account.logout(userId);
            if (!clearToken) {
                throw new custom_error_1.default("Clear Token failed", 400);
            }
            const user = await this.unitOfService.User.getUserById(userId);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            const response = {
                success: true,
                message: "Logout successful",
                data: null,
            };
            return res.status(200).json(response);
        };
        this.register = async (req, res) => {
            const data = req.body;
            let response;
            const user = await this.unitOfService.User.getByEmail(data.email);
            if (user) {
                throw new custom_error_1.default("User already exists", 409);
            }
            const newUser = await this.unitOfService.Account.create(data, user_enum_1.Role.User);
            if (!newUser) {
                throw new custom_error_1.default("User creation failed", 400);
            }
            // const emailUser = await this.unitOfService.User.getByEmail(
            //   data.email,
            //   false
            // );
            (0, emailDispatcher_util_1.dispatchEmailAsync)({
                userId: newUser.userId,
                to: newUser.email,
                subject: "Welcome 🎉",
                templateName: "welcome_newsletter",
                templateData: {
                    FirstName: newUser.name,
                    PlatformName: newUser.name,
                    LoginLink: "http://localhost:3000/login/",
                    SupportEmail: "sidharth@gmrwebteam.com",
                    WebsiteUrl: "http://localhost:3000/",
                    OTP_CODE: newUser.emailVerificationToken,
                    Year: (0, authHelpers_service_1.nowISO)(),
                },
            });
            (0, emailDispatcher_util_1.dispatchEmailAsync)({
                userId: newUser.userId,
                to: "sidharth@gmrwebteam.com",
                subject: "Admin 🎉",
                templateName: "user-registered",
                templateData: {
                    title: `${newUser.name} has registered on Newsletter Platform`,
                    userId: newUser.userId,
                    Name: newUser.name,
                    Email: newUser.email,
                    UserName: newUser.userName,
                    Phone: newUser.phone,
                    Status: newUser.status,
                    Date: newUser.createdAt,
                    PlatformName: newUser.name,
                },
            });
            response = {
                success: true,
                message: "User created successfully",
                data: newUser,
            };
            return res.status(201).json(response);
        };
        this.refreshToken = async (req, res) => {
            const userId = req.user?.userId;
            if (!userId) {
                throw new custom_error_1.default('userId is required', 400);
            }
            const { token: oldToken } = req.body;
            if (!oldToken) {
                throw new custom_error_1.default('Token is required', 400);
            }
            const decoded = jsonwebtoken_1.default.verify(oldToken, config_1.default.jwt.secret || "");
            const user = await this.unitOfService.User.getUserById(userId);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            // const userToken = user?.token;
            // const refreshToken = user?.refreshToken;
            // if (!userToken || !refreshToken) {
            //   throw new CustomError('Token not found', 400);
            // }
            const token = jsonwebtoken_1.default.sign({
                userId: decoded.userId,
                name: decoded.name,
                email: decoded.email,
                role: decoded.role?.toString(),
                profileImageUrl: decoded.profileImageUrl,
                expiresIn: config_1.default.jwt.accessExpires,
                tokenUpdated: "Yes"
            }, JWT_SECRET || "", {
                expiresIn: "5h",
                algorithm: "HS256",
                audience: config_1.default.jwt.audience,
                issuer: config_1.default.jwt.issuer,
                notBefore: "0", // Cannot use before now, can be configured to be deferred.
            });
            await this.unitOfService.Account.updateToken(userId, token);
            const updateUser = await this.unitOfService.User.getUserById(userId);
            if (!updateUser || !updateUser.token || !updateUser.refreshToken) {
                throw new custom_error_1.default('Token not found', 400);
            }
            const newToken = updateUser.token;
            const refreshToken = updateUser.refreshToken;
            const response = {
                success: true,
                message: "Token refreshed successfully",
                data: { newToken, refreshToken }
            };
            return res.status(200).json(response);
        };
        this.sentOtp = async (req, res) => {
            const userId = req.user?.userId;
            if (!userId) {
                throw new custom_error_1.default('Email is required', 400);
            }
            const user = await this.unitOfService.Account.forgotPassword(userId);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            (0, emailDispatcher_util_1.dispatchEmailAsync)({
                userId: user.userId,
                to: user.email,
                subject: "Welcome 🎉",
                templateName: "welcome_newsletter",
                templateData: {
                    FirstName: user.name,
                    PlatformName: user.name,
                    LoginLink: "http://localhost:3000/sign-in/",
                    SupportEmail: "sidharth@gmrwebteam.com",
                    WebsiteUrl: "http://localhost:3000/",
                    OTP_CODE: user.emailVerificationToken,
                    Year: (0, authHelpers_service_1.nowISO)(),
                },
            });
            (0, emailDispatcher_util_1.dispatchEmailAsync)({
                userId: user.userId,
                to: "sidharth@gmrwebteam.com",
                subject: "Admin 🎉",
                templateName: "user-registered",
                templateData: {
                    title: `${user.name} has registered on Newsletter Platform`,
                    userId: user.userId,
                    Name: user.name,
                    Email: user.email,
                    UserName: user.userName,
                    Phone: user.phone,
                    Status: user.status,
                    Date: user.createdAt,
                    PlatformName: user.name,
                },
            });
            const response = {
                success: true,
                message: "User fetched successfully",
                data: user,
            };
            return res.status(200).json(response);
        };
        this.otpVerify = async (req, res) => {
            const data = req.body;
            if (!data.email) {
                throw new custom_error_1.default('Email is required', 400);
            }
            const user = await this.unitOfService.User.getByEmail(data.email);
            if (!user) {
                throw new custom_error_1.default('User not found', 400);
            }
            let response;
            // if (!data.email) {
            //   response = { success: false, message: "Unauthorized" };
            //   return res.status(401).json(response);
            // }
            if (user.isEmailVerified) {
                response = {
                    success: false,
                    message: "User already verified",
                };
                return res.status(200).json(response);
            }
            // ✅ token exists?
            if (!user.emailVerificationToken || !user.emailVerificationExpires) {
                response = {
                    success: false,
                    message: "OTP not generated or already used. Please resend OTP",
                };
                return res.status(200).json(response);
            }
            // ✅ expiry check (1 minute expiry supported)
            const now = new Date();
            const expiresAt = user.emailVerificationExpires;
            const expired = (0, timeExpiry_util_1.isExpired)(expiresAt, 1);
            if ((0, timeExpiry_util_1.isExpired)(user.emailVerificationExpires, 1)) {
                response = {
                    success: false,
                    message: `${data.otp},"OTP expired. Please resend OTP"`,
                };
                return res.status(200).json(response);
            }
            if (user.emailVerificationToken !== data.otp) {
                response = {
                    success: false,
                    message: "Invalid OTP",
                };
                return res.status(400).json(response);
            }
            const newUser = await this.unitOfService.Account.updateEmailStatus(data.email);
            if (!newUser) {
                throw new custom_error_1.default("User not found", 200);
            }
            // const updatedUser = await this.unitOfService.User.getUserById(userId);
            // if (!updatedUser) {
            //   throw new CustomError("User not found", 200);
            // }
            response = {
                success: true,
                message: "OTP verified successfully",
                data: newUser,
            };
            return res.status(200).json(response);
        };
        this.resetPassword = async (req, res) => {
            const userId = req.user?.userId;
            const data = req.body;
            console.log("userId", userId);
            if (!userId) {
                throw new custom_error_1.default('User Id Or Email Id is required', 200);
            }
            const user = await this.unitOfService.User.getUserById(userId);
            if (user) {
                throw new custom_error_1.default('User Not Found', 200);
            }
            const users = await this.unitOfService.Account.resetPassword(userId, data);
            if (!users) {
                throw new custom_error_1.default('User not found', 200);
            }
            const response = {
                success: true,
                message: "User fetched successfully",
                data: users,
            };
            return res.status(200).json(response);
        };
        this.forgotPassword = async (req, res) => {
            const { email } = req.body;
            if (!email) {
                throw new custom_error_1.default('Email is required', 400);
            }
            const existingUser = await this.unitOfService.User.getByEmail(email);
            if (!existingUser) {
                throw new custom_error_1.default('User not found', 404);
            }
            const user = await this.unitOfService.Account.forgotPassword(existingUser.userId);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            const response = {
                success: true,
                message: "User fetched successfully",
                data: user,
            };
            return res.status(200).json(response);
        };
        this.unitOfService = unitOfService;
    }
}
exports.AccountController = AccountController;
//# sourceMappingURL=auth.controller.js.map