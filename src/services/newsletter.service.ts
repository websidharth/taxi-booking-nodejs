import { inject, injectable } from 'inversify';
import { TYPES } from '../config/ioc.types';
import type IUnitOfWork from '../repository/interfaces/iunitofwork.repository';
import type { IDateTimeService } from './interfaces/idatetime.service';
import { INewsletterService } from './interfaces/Inewsletter.service';
import { NewsletterTempletesModel } from '../models/newsletterTempletes.model';

@injectable()
export class NewsletterService implements INewsletterService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork, @inject(TYPES.IDateTimeService) private dateTime: IDateTimeService) { }


  async create(userId: string, data: NewsletterTempletesModel) { 
    return this.unitOfWork.transaction(async (transactionClient) => { 
      const user = await transactionClient.newsletterTempletes.create({
        data: {
          userId: userId,
          title: data.title,
          htmlContent: data.htmlContent,
        },
      }); 
      return user;
    });
  }

  async getAll() { 
    return this.unitOfWork.transaction(async (transactionClient) => { 
      const newsletters = await transactionClient.newsletterTempletes.findMany();
      return newsletters;
    });

  }
  
  async getById(id: number) { 
    return this.unitOfWork.transaction(async (transactionClient) => { 
      const newsletter = await transactionClient.newsletterTempletes.findFirst({
     where: { newsletterId: id },
      });
      return newsletter;
    });
  }

  async update(id: number, data: NewsletterTempletesModel) {
    return this.unitOfWork.transaction(async (transactionClient) => { 
      const updatedNewsletter = await transactionClient.newsletterTempletes.update({
        where: { newsletterId: id },
        data: {
          title: data.title,
          htmlContent: data.htmlContent,
          updatedAt: this.dateTime.now(),
        },
      });
      return updatedNewsletter;
    }
    );
  }
  async delete(id: number) { 
    return this.unitOfWork.transaction(async (transactionClient) => { 
      const deletedNewsletter = await transactionClient.newsletterTempletes.delete({
      where: { newsletterId: id },
      });
      return deletedNewsletter;
    }); 
  }

}


export default NewsletterService;
