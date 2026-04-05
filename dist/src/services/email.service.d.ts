import IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import { IEmailService } from "./interfaces/Iemail.service";
import { CreateEmailModel } from "../models/email.model";
import { UserEmailDto } from "../dtos/email.dto";
export declare class EmailService implements IEmailService {
    private unitOfWork;
    constructor(unitOfWork: IUnitOfWork);
    create(data: CreateEmailModel, userId: string, emailResponse: string): Promise<UserEmailDto>;
    findAll(): Promise<UserEmailDto[] | null>;
    findById(id: number): Promise<UserEmailDto | null>;
    delete(id: number): Promise<UserEmailDto | null>;
}
export default EmailService;
//# sourceMappingURL=email.service.d.ts.map