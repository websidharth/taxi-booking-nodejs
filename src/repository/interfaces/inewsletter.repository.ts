import { NewsletterTempletesDto } from "../../dtos/newsletterTempletes.dto";
import { NewsletterTempletesModel } from "../../models/newsletterTempletes.model";

export interface INewsletterRepository {
    createNewsletter(data: NewsletterTempletesModel): Promise<NewsletterTempletesDto>;
    findAll(): Promise<NewsletterTempletesDto[]>;
    findById(id: number): Promise<NewsletterTempletesDto | null>;
    update(id: number, updatedData: NewsletterTempletesDto): Promise<NewsletterTempletesDto>;
    delete(id: number): Promise<NewsletterTempletesDto>;
}
