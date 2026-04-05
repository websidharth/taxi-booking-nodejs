import prisma from "../config/prisma";
import { NewsletterTempletesDto } from "../dtos/newsletterTempletes.dto";
import { NewsletterTempletesModel } from "../models/newsletterTempletes.model";
import { INewsletterRepository } from "./interfaces/inewsletter.repository";

export class NewsletterRepository implements INewsletterRepository {

  async createNewsletter(data: NewsletterTempletesModel): Promise<NewsletterTempletesDto> {
    const result = await prisma.newsletterTempletes.create({
      data: data,
    });
    return result as NewsletterTempletesDto;
  }

   async findAll(): Promise<NewsletterTempletesDto[]> {
    return prisma.newsletterTempletes.findMany();
  }

  async findById(id: number): Promise<NewsletterTempletesDto | null> {
    return prisma.newsletterTempletes.findUnique({
      where: { newsletterId: id, status: true },
    });
  }

 

  async update(id: number, data: NewsletterTempletesModel): Promise<NewsletterTempletesDto> {
    return prisma.newsletterTempletes.update({
      where: { newsletterId: id },
      data,
    });
  }
 

  async delete(id: number): Promise<NewsletterTempletesDto> {
    return prisma.newsletterTempletes.update({
      where: { newsletterId: id },
      data: { status: false },
    });
  }

   



}



