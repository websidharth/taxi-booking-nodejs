import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { UserRepository } from "./user.repository";
import { container } from "../config/ioc.config";
import IUnitOfWork from "./interfaces/iunitofwork.repository";
import { IUserRepository } from "./interfaces/iuser.repository";
import { TYPES } from "../config/ioc.types"; 
import { IEmailRepository } from "./interfaces/iemail.repository";
import { AccountRepository } from "./account.repository";
import { IAccountRepository } from "./interfaces/iaccount.repository";
import { NewsletterRepository } from "./newsletter.repository";
import { INewsletterRepository } from "./interfaces/inewsletter.repository";

export default class UnitOfWork implements IUnitOfWork {
  public User: UserRepository;
  public Email: IEmailRepository;
  public Account: AccountRepository;
  public Newsletter: NewsletterRepository;

  constructor(
    user = container.get<IUserRepository>(TYPES.IUserRepository),
    email = container.get<IEmailRepository>(TYPES.IEmailRepository),
    account = container.get<IAccountRepository>(TYPES.IAccountRepository),
    newsletter = container.get<INewsletterRepository>(TYPES.INewsletterRepository)
  ) {
    this.User = user;
    this.Email = email;
    this.Account = account;
    this.Newsletter = newsletter;
  }

  async transaction<T>(
    callback: (prisma: Prisma.TransactionClient) => Promise<T>
  ): Promise<T> {
    return prisma.$transaction(async (transactionClient) => {
      return callback(transactionClient);
    });
  }
}
