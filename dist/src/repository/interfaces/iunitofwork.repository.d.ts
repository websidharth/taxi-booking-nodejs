import { Prisma } from "@prisma/client";
import { IUserRepository } from "./iuser.repository";
import { IEmailRepository } from "./iemail.repository";
import { IAccountRepository } from "./iaccount.repository";
import { INewsletterRepository } from "./inewsletter.repository";
export default interface IUnitOfWork {
    User: IUserRepository;
    Email: IEmailRepository;
    Account: IAccountRepository;
    Newsletter: INewsletterRepository;
    /**
     * Executes a set of operations within a database transaction.
     *
     * @param callback - A function that receives a Prisma transaction client and performs database operations.
     * @returns A promise that resolves to the result of the transaction.
     */
    transaction<T>(callback: (prisma: Prisma.TransactionClient) => Promise<T>): Promise<T>;
}
//# sourceMappingURL=iunitofwork.repository.d.ts.map