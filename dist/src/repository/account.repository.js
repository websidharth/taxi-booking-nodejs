"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class AccountRepository {
    async login(data, token, refreshToken) {
        return prisma_1.default.users.update({
            where: { email: data.email },
            data: {
                token: token,
                refreshToken: refreshToken,
            },
        });
    }
    async logout(userId) {
        return prisma_1.default.users.update({
            where: { userId: userId },
            data: {
                token: null,
                refreshToken: null,
            },
        });
    }
    async updateToken(userId, token) {
        return prisma_1.default.users.update({
            where: { userId: userId },
            data: {
                token: token,
                tokenUpdated: true,
            },
        });
    }
    async create(data) {
        return prisma_1.default.users.create({
            data,
        });
    }
    async updateEmailVerification(data, userId) {
        return prisma_1.default.users.update({
            where: { userId: userId },
            data: {
                emailVerificationToken: data.emailVerificationToken ?? null,
                emailVerificationExpires: data.emailVerificationExpires ?? null,
            },
        });
    }
    async updateEmailStatus(email) {
        return prisma_1.default.users.update({
            where: { email },
            data: { isEmailVerified: true },
        });
    }
    async resetPassword(userId, hashedPassword) {
        return await prisma_1.default.users.update({
            where: { userId: userId },
            data: { password: hashedPassword },
        });
    }
    async forgotPassword(userId, otp) {
        return await prisma_1.default.users.update({
            where: { userId: userId },
            data: {
                emailVerificationToken: otp,
                emailVerificationExpires: new Date()
            },
        });
    }
    async clearPasswordResetToken(email) {
        return await prisma_1.default.users.update({
            where: { email },
            data: {
                emailVerificationToken: null,
                emailVerificationExpires: null,
            },
        });
    }
}
exports.AccountRepository = AccountRepository;
//# sourceMappingURL=account.repository.js.map