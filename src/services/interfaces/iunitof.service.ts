import { IAccountService } from "./Iaccount.service";
import { IEmailService } from "./Iemail.service";
import { INewsletterService } from "./Inewsletter.service";
import { IUserService } from "./Iuser.service";

export default interface IUnitOfService {
  User: IUserService;
  Email: IEmailService;
  Account: IAccountService;
  Newsletter: INewsletterService;
}
