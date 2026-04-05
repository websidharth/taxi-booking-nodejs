import { UserEmailDto } from "../dtos/email.dto";
import { CreateEmailModel } from "../models/email.model";
import { IEmailRepository } from "./interfaces/iemail.repository";
export declare class EmailRepository implements IEmailRepository {
    create(data: CreateEmailModel): Promise<UserEmailDto>;
    findAll(): Promise<UserEmailDto[] | null>;
    findById(id: number): Promise<UserEmailDto | null>;
    delete(id: number): Promise<UserEmailDto | null>;
}
//# sourceMappingURL=email.repository.d.ts.map