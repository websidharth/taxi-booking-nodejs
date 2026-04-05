import { UserEmailDto } from "../../dtos/email.dto";
import { CreateEmailModel } from "../../models/email.model";
export interface IEmailRepository {
    create(data: CreateEmailModel): Promise<UserEmailDto>;
    findAll(): Promise<UserEmailDto[] | null>;
    findById(id: number): Promise<UserEmailDto | null>;
    delete(id: number): Promise<UserEmailDto | null>;
}
//# sourceMappingURL=iemail.repository.d.ts.map