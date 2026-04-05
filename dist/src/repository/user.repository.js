"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class UserRepository {
    async findAll() {
        return prisma_1.default.users.findMany();
    }
    async findById(userId) {
        return prisma_1.default.users.findUnique({
            where: { userId, status: true },
        });
    }
    async findByEmail(email) {
        return prisma_1.default.users.findUnique({
            where: {
                email: email,
                status: true,
            },
        });
    }
    async update(userId, data) {
        return prisma_1.default.users.update({
            where: { userId },
            data,
        });
    }
    async updateStatus(userId, updatedData) {
        return prisma_1.default.users.update({
            where: { userId },
            data: { status: false },
        });
    }
    // async delete(userId: string): Promise<UserDto> {
    //   return prisma.users.update({
    //     where: { userId },
    //     data: { status: false },
    //   });
    // }
    async delete(userId) {
        return prisma_1.default.users.delete({
            where: { userId },
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map