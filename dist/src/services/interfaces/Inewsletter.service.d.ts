import { NewsletterDto, NewsletterTempletesDto, NewsletterTempletesUpdateDto } from "../../dtos/newsletterTempletes.dto";
import { NewsletterTempletesModel } from "../../models/newsletterTempletes.model";
export interface INewsletterService {
    create(userId: string, data: NewsletterTempletesModel): Promise<NewsletterDto | null>;
    getAll(): Promise<NewsletterTempletesDto[]>;
    getById(id: number): Promise<NewsletterTempletesDto | null>;
    update(id: number, data: NewsletterTempletesUpdateDto): Promise<NewsletterTempletesDto | null>;
    delete(id: number): Promise<NewsletterTempletesDto | null>;
}
//# sourceMappingURL=Inewsletter.service.d.ts.map