"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const inversify_1 = require("inversify");
let EmailRepository = class EmailRepository {
    async create(data) {
        return prisma_1.default.userNewsletterEmail.create({
            data,
        });
    }
    async findAll() {
        const emails = await prisma_1.default.userNewsletterEmail.findMany();
        return emails;
    }
    async findById(id) {
        const email = await prisma_1.default.userNewsletterEmail.findFirst({
            where: { id },
        });
        return email;
    }
    async delete(id) {
        const deletedEmail = await prisma_1.default.userNewsletterEmail.delete({
            where: { id },
        });
        return deletedEmail;
    }
};
exports.EmailRepository = EmailRepository;
exports.EmailRepository = EmailRepository = __decorate([
    (0, inversify_1.injectable)()
], EmailRepository);
//# sourceMappingURL=email.repository.js.map