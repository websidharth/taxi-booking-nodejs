"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
const ioc_config_1 = require("../config/ioc.config");
const ioc_types_1 = require("../config/ioc.types");
class UnitOfWork {
    constructor(user = ioc_config_1.container.get(ioc_types_1.TYPES.IUserRepository), email = ioc_config_1.container.get(ioc_types_1.TYPES.IEmailRepository), account = ioc_config_1.container.get(ioc_types_1.TYPES.IAccountRepository), newsletter = ioc_config_1.container.get(ioc_types_1.TYPES.INewsletterRepository)) {
        this.User = user;
        this.Email = email;
        this.Account = account;
        this.Newsletter = newsletter;
    }
    async transaction(callback) {
        return prisma_1.default.$transaction(async (transactionClient) => {
            return callback(transactionClient);
        });
    }
}
exports.default = UnitOfWork;
//# sourceMappingURL=unitofwork.repository.js.map