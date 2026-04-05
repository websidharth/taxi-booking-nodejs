import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import { IAccountService } from "./interfaces/Iaccount.service";
import { IEmailService } from "./interfaces/Iemail.service";
import { INewsletterService } from "./interfaces/Inewsletter.service";
import IUnitOfService from "./interfaces/iunitof.service";
import { IUserService } from "./interfaces/Iuser.service";

export default class UnitOfService implements IUnitOfService {
  public User: IUserService;
  public Email: IEmailService;
  public Account: IAccountService;
  public Newsletter: INewsletterService;

  constructor(
    user = container.get<IUserService>(TYPES.IUserService),
    email = container.get<IEmailService>(TYPES.IEmailService),
    account = container.get<IAccountService>(TYPES.IAccountService),
    newsletter = container.get<INewsletterService>(TYPES.INewsletterService),
  ) {
    this.User = user;
    this.Email = email;
    this.Account = account;
    this.Newsletter = newsletter;
  }
}
