import { NewsletterTempletesDto } from "../dtos/newsletterTempletes.dto";
import { NewsletterTempletesModel } from "../models/newsletterTempletes.model";
import { INewsletterRepository } from "./interfaces/inewsletter.repository";
export declare class NewsletterRepository implements INewsletterRepository {
    createNewsletter(data: NewsletterTempletesModel): Promise<NewsletterTempletesDto>;
    findAll(): Promise<NewsletterTempletesDto[]>;
    findById(id: number): Promise<NewsletterTempletesDto | null>;
    update(id: number, data: NewsletterTempletesModel): Promise<NewsletterTempletesDto>;
    delete(id: number): Promise<NewsletterTempletesDto>;
}
//# sourceMappingURL=newsletter.repository.d.ts.map