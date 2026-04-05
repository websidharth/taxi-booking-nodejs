import { IAccountService } from "./interfaces/Iaccount.service";
import { IEmailService } from "./interfaces/Iemail.service";
import { INewsletterService } from "./interfaces/Inewsletter.service";
import IUnitOfService from "./interfaces/iunitof.service";
import { IUserService } from "./interfaces/Iuser.service";
export default class UnitOfService implements IUnitOfService {
    User: IUserService;
    Email: IEmailService;
    Account: IAccountService;
    Newsletter: INewsletterService;
    constructor(user?: IUserService, email?: IEmailService, account?: IAccountService, newsletter?: INewsletterService);
}
//# sourceMappingURL=unitOfService.d.ts.map