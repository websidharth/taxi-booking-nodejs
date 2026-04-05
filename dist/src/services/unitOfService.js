"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioc_config_1 = require("../config/ioc.config");
const ioc_types_1 = require("../config/ioc.types");
class UnitOfService {
    constructor(user = ioc_config_1.container.get(ioc_types_1.TYPES.IUserService), email = ioc_config_1.container.get(ioc_types_1.TYPES.IEmailService), account = ioc_config_1.container.get(ioc_types_1.TYPES.IAccountService), newsletter = ioc_config_1.container.get(ioc_types_1.TYPES.INewsletterService)) {
        this.User = user;
        this.Email = email;
        this.Account = account;
        this.Newsletter = newsletter;
    }
}
exports.default = UnitOfService;
//# sourceMappingURL=unitOfService.js.map