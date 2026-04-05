import IUnitOfService from '../services/interfaces/iunitof.service';
import { Request, Response } from 'express';
import CustomResponse from '../dtos/custom-response';
import { UserEmailDto } from '../dtos/email.dto';
import { CreateEmailModel } from '../models/email.model';
import { ListResponseDto } from '../dtos/list-response.dto';
export declare class EmailController {
    private unitOfService;
    constructor(unitOfService?: IUnitOfService);
    sendEmail: (req: Request, res: Response) => Promise<Response<CustomResponse<CreateEmailModel>>>;
    getAllEmails: (req: Request, res: Response) => Promise<Response<CustomResponse<ListResponseDto<UserEmailDto>>>>;
    getEmailById: (req: Request, res: Response) => Promise<Response<CustomResponse<UserEmailDto>>>;
    deleteEmail: (req: Request, res: Response) => Promise<Response<CustomResponse<UserEmailDto>>>;
}
//# sourceMappingURL=email.controller.d.ts.map