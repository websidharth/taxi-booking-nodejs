import IUnitOfService from '../services/interfaces/iunitof.service';
import { Request, Response } from 'express';
import CustomResponse from '../dtos/custom-response';
import { NewsletterTempletesDto } from '../dtos/newsletterTempletes.dto';
export declare class NewsletterController {
    private unitOfService;
    constructor(unitOfService?: IUnitOfService);
    createNewsletter: (req: Request, res: Response) => Promise<Response<CustomResponse<NewsletterTempletesDto>>>;
    getAllNewsletters: (req: Request, res: Response) => Promise<Response<CustomResponse<NewsletterTempletesDto[]>>>;
    getNewsletterById: (req: Request, res: Response) => Promise<Response<CustomResponse<NewsletterTempletesDto>>>;
    updateNewsletterById: (req: Request, res: Response) => Promise<Response<CustomResponse<NewsletterTempletesDto>>>;
    deleteNewsletterById: (req: Request, res: Response) => Promise<Response<CustomResponse<NewsletterTempletesDto>>>;
}
//# sourceMappingURL=newsletter.controller.d.ts.map