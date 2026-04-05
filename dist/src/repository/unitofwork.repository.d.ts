import { Prisma } from "@prisma/client";
import { UserRepository } from "./user.repository";
import IUnitOfWork from "./interfaces/iunitofwork.repository";
import { IUserRepository } from "./interfaces/iuser.repository";
import { IEmailRepository } from "./interfaces/iemail.repository";
import { AccountRepository } from "./account.repository";
import { IAccountRepository } from "./interfaces/iaccount.repository";
import { NewsletterRepository } from "./newsletter.repository";
import { INewsletterRepository } from "./interfaces/inewsletter.repository";
export default class UnitOfWork implements IUnitOfWork {
    User: UserRepository;
    Email: IEmailRepository;
    Account: AccountRepository;
    Newsletter: NewsletterRepository;
    constructor(user?: IUserRepository, email?: IEmailRepository, account?: IAccountRepository, newsletter?: INewsletterRepository);
    transaction<T>(callback: (prisma: Prisma.TransactionClient) => Promise<T>): Promise<T>;
}
//# sourceMappingURL=unitofwork.repository.d.ts.map