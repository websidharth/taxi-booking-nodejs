"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class NewsletterRepository {
    async createNewsletter(data) {
        const result = await prisma_1.default.newsletterTempletes.create({
            data: data,
        });
        return result;
    }
    async findAll() {
        return prisma_1.default.newsletterTempletes.findMany();
    }
    async findById(id) {
        return prisma_1.default.newsletterTempletes.findUnique({
            where: { newsletterId: id, status: true },
        });
    }
    async update(id, data) {
        return prisma_1.default.newsletterTempletes.update({
            where: { newsletterId: id },
            data,
        });
    }
    async delete(id) {
        return prisma_1.default.newsletterTempletes.update({
            where: { newsletterId: id },
            data: { status: false },
        });
    }
}
exports.NewsletterRepository = NewsletterRepository;
//# sourceMappingURL=newsletter.repository.js.map