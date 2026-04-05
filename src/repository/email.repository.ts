import prisma from "../config/prisma";
import { UserEmailDto } from "../dtos/email.dto";
import { CreateEmailModel } from "../models/email.model";
import { IEmailRepository } from "./interfaces/iemail.repository";
import { injectable } from "inversify";

@injectable()
export class EmailRepository implements IEmailRepository {
  async create(data: CreateEmailModel): Promise<UserEmailDto> {
    return prisma.userNewsletterEmail.create({
      data,
    });
  }
  async findAll(): Promise<UserEmailDto[] | null> {
    const emails = await prisma.userNewsletterEmail.findMany();
    return emails;
  }
  async findById(id: number): Promise<UserEmailDto | null> {
    const email = await prisma.userNewsletterEmail.findFirst({
      where: { id },
    });
    return email;
  }

  async delete(id: number): Promise<UserEmailDto | null> {
    const deletedEmail = await prisma.userNewsletterEmail.delete({
      where: { id },
    });
    return deletedEmail;
  }
}
