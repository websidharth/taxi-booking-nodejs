import { Container } from 'inversify';
import { TYPES } from './ioc.types';

import IUnitOfService from '../services/interfaces/iunitof.service';
import IUnitOfWork from '../repository/interfaces/iunitofwork.repository';

import UnitOfService from '../services/unitOfService';
import UnitOfWork from '../repository/unitofwork.repository';

import { UserRepository } from '../repository/user.repository';
import { EmailRepository } from '../repository/email.repository';
import { AccountRepository } from '../repository/account.repository';

import { IUserRepository } from '../repository/interfaces/iuser.repository';
import { IEmailRepository } from '../repository/interfaces/iemail.repository';
import { IAccountRepository } from '../repository/interfaces/iaccount.repository';

import { AccountController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';
import { EmailController } from '../controllers/email.controller';
import { HealthController } from '../controllers/health.controller';

import AccountService from '../services/account.service';
import { UserService } from '../services/user.service';
import { EmailService } from '../services/email.service';
import { DateTimeService } from '../services/dateTime.service';

import { IAccountService } from '../services/interfaces/Iaccount.service';
import { IUserService } from '../services/interfaces/Iuser.service';
import { IEmailService } from '../services/interfaces/Iemail.service';
import { IDateTimeService } from '../services/interfaces/idatetime.service';
import { NewsletterController } from '../controllers/newsletter.controller';
import NewsletterService from '../services/newsletter.service';
import { INewsletterRepository } from '../repository/interfaces/inewsletter.repository';
import { NewsletterRepository } from '../repository/newsletter.repository';
import { INewsletterService } from '../services/interfaces/Inewsletter.service';

export const container = new Container();
container.bind<HealthController>(TYPES.HealthController).to(HealthController);
container.bind<AccountController>(TYPES.AccountController).to(AccountController);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<EmailController>(TYPES.EmailController).to(EmailController);
container.bind<NewsletterController>(TYPES.NewsletterController).to(NewsletterController);

container.bind<IAccountService>(TYPES.IAccountService).to(AccountService);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IEmailService>(TYPES.IEmailService).to(EmailService);
container.bind<INewsletterService>(TYPES.INewsletterService).to(NewsletterService);

container.bind<IAccountRepository>(TYPES.IAccountRepository).to(AccountRepository);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IEmailRepository>(TYPES.IEmailRepository).to(EmailRepository);
container.bind<INewsletterRepository>(TYPES.INewsletterRepository).to(NewsletterRepository);


container.bind<IUnitOfService>(TYPES.IUnitOfService).to(UnitOfService);
container.bind<IUnitOfWork>(TYPES.IUnitOfWork).to(UnitOfWork);

container.bind<IDateTimeService>(TYPES.IDateTimeService).to(DateTimeService).inSingletonScope();
