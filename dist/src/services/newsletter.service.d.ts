import IUnitOfWork from '../repository/interfaces/iunitofwork.repository';
import { IDateTimeService } from './interfaces/idatetime.service';
import { INewsletterService } from './interfaces/Inewsletter.service';
import { NewsletterTempletesModel } from '../models/newsletterTempletes.model';
export declare class NewsletterService implements INewsletterService {
    private unitOfWork;
    private dateTime;
    constructor(unitOfWork: IUnitOfWork, dateTime: IDateTimeService);
    create(userId: string, data: NewsletterTempletesModel): Promise<{
        id: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: boolean | null;
        newsletterId: number;
        title: string;
        htmlContent: string;
    }>;
    getAll(): Promise<{
        id: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: boolean | null;
        newsletterId: number;
        title: string;
        htmlContent: string;
    }[]>;
    getById(id: number): Promise<{
        id: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: boolean | null;
        newsletterId: number;
        title: string;
        htmlContent: string;
    } | null>;
    update(id: number, data: NewsletterTempletesModel): Promise<{
        id: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: boolean | null;
        newsletterId: number;
        title: string;
        htmlContent: string;
    }>;
    delete(id: number): Promise<{
        id: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: boolean | null;
        newsletterId: number;
        title: string;
        htmlContent: string;
    }>;
}
export default NewsletterService;
//# sourceMappingURL=newsletter.service.d.ts.map