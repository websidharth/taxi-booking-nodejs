"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = void 0;
exports.TYPES = {
    IUnitOfService: Symbol.for("UnitOfService"),
    IDateTimeService: Symbol.for("IDateTimeService"),
    IAccountService: Symbol.for("AccountService"),
    IUserService: Symbol.for("UserService"),
    IEmailService: Symbol.for("EmailService"),
    INewsletterService: Symbol.for("NewsletterService"),
    //Controllers
    HealthController: Symbol.for("HealthController"),
    AccountController: Symbol.for("AccountController"),
    UserController: Symbol.for("UserController"),
    EmailController: Symbol.for("EmailController"),
    NewsletterController: Symbol.for("NewsletterController"),
    //Repositories
    IUnitOfWork: Symbol.for("UnitOfWork"),
    IAccountRepository: Symbol.for("AccountRepository"),
    IUserRepository: Symbol.for("UserRepository"),
    IEmailRepository: Symbol.for("EmailRepository"),
    INewsletterRepository: Symbol.for("NewsletterRepository"),
};
//# sourceMappingURL=ioc.types.js.map