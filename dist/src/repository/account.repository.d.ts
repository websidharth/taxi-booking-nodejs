import { CreateUserDto, UserDto } from "../dtos/user.dto";
import { OtpModel } from "../models/otp.model";
import { IAccountRepository } from "./interfaces/iaccount.repository";
export declare class AccountRepository implements IAccountRepository {
    login(data: CreateUserDto, token: string, refreshToken: string): Promise<UserDto | null>;
    logout(userId: string): Promise<UserDto | null>;
    updateToken(userId: string, token: string): Promise<UserDto | null>;
    create(data: CreateUserDto): Promise<UserDto | null>;
    updateEmailVerification(data: OtpModel, userId: string): Promise<UserDto | null>;
    updateEmailStatus(email: string): Promise<UserDto | null>;
    resetPassword(userId: string, hashedPassword: string): Promise<UserDto | null>;
    forgotPassword(userId: string, otp: string): Promise<UserDto | null>;
    clearPasswordResetToken(email: string): Promise<UserDto | null>;
}
//# sourceMappingURL=account.repository.d.ts.map