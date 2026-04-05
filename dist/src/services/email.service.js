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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const inversify_1 = require("inversify");
const ioc_types_1 = require("../config/ioc.types");
let EmailService = class EmailService {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    async create(data, userId, emailResponse) {
        return this.unitOfWork.transaction(async (transactionClient) => {
            const useremail = await transactionClient.userNewsletterEmail.create({
                data: {
                    userId: userId,
                    newsletterId: data.newsletterId ? data.newsletterId : null,
                    recipient: data.recipient,
                    subject: data.subject ?? null,
                    htmlContent: data.htmlContent,
                    status: 'Sent',
                    emailResponse: emailResponse ? JSON.parse(JSON.stringify(emailResponse)) : null,
                },
            });
            return useremail;
        });
    }
    async findAll() {
        const userList = await this.unitOfWork.Email.findAll();
        if (!userList || userList.length === 0) {
            throw new Error("No user found");
        }
        return userList;
    }
    async findById(id) {
        const user = await this.unitOfWork.Email.findById(id);
        if (!user) {
            return null;
        }
        return user;
    }
    async delete(id) {
        const deletedUser = await this.unitOfWork.Email.delete(id);
        if (!deletedUser) {
            return null;
        }
        return deletedUser;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(ioc_types_1.TYPES.IUnitOfWork)),
    __metadata("design:paramtypes", [Object])
], EmailService);
exports.default = EmailService;
//# sourceMappingURL=email.service.js.map