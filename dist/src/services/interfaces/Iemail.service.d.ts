import { UserEmailDto } from "../../dtos/email.dto";
import { CreateEmailModel } from "../../models/email.model";
export interface IEmailService {
    create(data: CreateEmailModel, userId: string, emailResponse: string): Promise<UserEmailDto>;
    findAll(): Promise<UserEmailDto[] | null>;
    findById(id: number): Promise<UserEmailDto | null>;
    delete(id: number): Promise<UserEmailDto | null>;
}
//# sourceMappingURL=Iemail.service.d.ts.map