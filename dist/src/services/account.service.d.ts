import { users } from "@prisma/client";
import { UserDto } from "../dtos/user.dto";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import { Role } from "../enum/user.enum";
import { CreateUserModel } from "../models/user.model";
import type { IDateTimeService } from "./interfaces/idatetime.service";
import { IAccountService } from "./interfaces/Iaccount.service";
import { ResetPasswordModel } from "../models/forgot-password.model";
import { LoginModel } from "../models/login.model";
export declare class AccountService implements IAccountService {
    private unitOfWork;
    private dateTime;
    constructor(unitOfWork: IUnitOfWork, dateTime: IDateTimeService);
    login(data: LoginModel, token: string, refreshToken: string): Promise<UserDto | null>;
    logout(userId: string): Promise<UserDto | null>;
    updateToken(userId: string, token: string): Promise<UserDto | null>;
    create(data: CreateUserModel, role: Role): Promise<UserDto>;
    convertToDto(user: users, includePassword?: boolean, token?: boolean, refreshToken?: boolean): UserDto;
    updateEmailVerification(userId: string): Promise<UserDto>;
    updateEmailStatus(email: string): Promise<UserDto | null>;
    getUserById(userId: string): Promise<UserDto | null>;
    resetPassword(userId: string, data: ResetPasswordModel): Promise<UserDto | null>;
    forgotPassword(userId: string): Promise<UserDto | null>;
}
export default AccountService;
//# sourceMappingURL=account.service.d.ts.map