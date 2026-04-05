"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const inversify_1 = require("inversify");
const ioc_types_1 = require("../config/ioc.types");
const authHelpers_service_1 = require("../utils/authHelpers.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const otp_util_1 = require("../utils/otp.util");
let UserService = class UserService {
    constructor(unitOfWork, dateTime) {
        this.unitOfWork = unitOfWork;
        this.dateTime = dateTime;
    }
    async create(data, role) {
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const { otp } = (0, otp_util_1.generateOtp)();
        return this.unitOfWork.transaction(async (transactionClient) => {
            const user = await transactionClient.users.create({
                data: {
                    userId: (0, authHelpers_service_1.generateUserGUID)().toString(),
                    name: `${data.firstName} ${data.lastName}`,
                    userName: (0, authHelpers_service_1.createUserName)(`${data.firstName}`, `${data.lastName}`),
                    phone: data.phone || "",
                    email: data.email,
                    password: hashedPassword,
                    emailVerificationToken: otp,
                    emailVerificationExpires: new Date(),
                    isActive: false,
                    isEmailVerified: false,
                    isPhoneVerified: false,
                    tokenUpdated: false,
                },
            });
            return this.convertToDto(user);
        });
    }
    async getAll() {
        const userList = await this.unitOfWork.User.findAll();
        if (!userList || userList.length === 0) {
            throw new Error("No user found");
        }
        return userList;
    }
    async getUserById(userId) {
        const user = await this.unitOfWork.User.findById(userId);
        if (!user) {
            return null;
        }
        return user;
    }
    async getByEmail(email) {
        const user = await this.unitOfWork.User.findByEmail(email);
        if (!user) {
            return null;
        }
        return user;
    }
    async update(userId, updatedData) {
        const user = await this.unitOfWork.User.update(userId, {
            ...updatedData,
        });
        if (!user) {
            return null;
        }
        return user;
    }
    async updateStatus(userId, updatedData) {
        const user = await this.unitOfWork.User.updateStatus(userId, {
            ...updatedData,
        });
        if (!user) {
            return null;
        }
        return user;
    }
    async delete(userId) {
        const user = await this.unitOfWork.User.delete(userId);
        return user;
    }
    convertToDto(user, includePassword = false, token = false, refreshToken = false) {
        return {
            id: user.id,
            userId: user.userId,
            name: user.name,
            userName: user.userName,
            email: user.email,
            phone: user.phone,
            password: includePassword ? user.password : null,
            role: user.role,
            isActive: user.isActive,
            isEmailVerified: user.isEmailVerified,
            isPhoneVerified: user.isPhoneVerified,
            loginAttempts: user.loginAttempts,
            lastLoginAt: user.lastLoginAt,
            lastLoginIP: user.lastLoginIP,
            emailVerificationToken: user.emailVerificationToken,
            emailVerificationExpires: user.emailVerificationExpires,
            profileImageUrl: user.profileImageUrl,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            status: user.status,
            token: token ? user.token : null,
            tokenUpdated: user.tokenUpdated,
            refreshToken: token ? user.refreshToken : null,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(ioc_types_1.TYPES.IUnitOfWork)),
    __param(1, (0, inversify_1.inject)(ioc_types_1.TYPES.IDateTimeService)),
    __metadata("design:paramtypes", [Object, Object])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.service.js.map