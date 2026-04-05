import { inject, injectable } from "inversify";
import { TYPES } from "../config/ioc.types";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import { IEmailService } from "./interfaces/Iemail.service";
import { CreateEmailModel } from "../models/email.model"; 
import { UserEmailDto } from "../dtos/email.dto";

@injectable()
export class EmailService implements IEmailService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) { }

  async create(data: CreateEmailModel, userId: string, emailResponse:string): Promise<UserEmailDto> {
    return this.unitOfWork.transaction(async (transactionClient) => {
      const useremail = await transactionClient.userNewsletterEmail.create({
        data: {
          userId: userId,
          newsletterId: data.newsletterId ? data.newsletterId : null,
          recipient: data.recipient,
          subject: data.subject ?? null,
          htmlContent: data.htmlContent,
          status: 'Sent' ,
          emailResponse: emailResponse ? JSON.parse(JSON.stringify(emailResponse)) : null,
        }, 
      }); 
      return useremail;
    });
  }

  async findAll(): Promise<UserEmailDto[] | null> {
    const userList = await this.unitOfWork.Email.findAll();
    if (!userList || userList.length === 0) {
      throw new Error("No user found");
    }
    return userList;
  }

  async findById(id: number): Promise<UserEmailDto | null> {
    const user = await this.unitOfWork.Email.findById(id);
    if (!user) {
      return null;
    }
    return user;
  }
  async delete(id: number): Promise<UserEmailDto | null> {
    const deletedUser = await this.unitOfWork.Email.delete(id);
    if (!deletedUser) {
      return null;
    }
    return deletedUser;
  }



}

export default EmailService;
