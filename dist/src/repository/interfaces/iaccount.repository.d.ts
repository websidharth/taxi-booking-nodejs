import { CreateUserDto, UserDto } from "../../dtos/user.dto";
import { LoginModel } from "../../models/login.model";
import { OtpModel } from "../../models/otp.model";
export interface IAccountRepository {
    login(data: LoginModel, token: string, refreshToken: string): Promise<UserDto | null>;
    logout(userId: string): Promise<UserDto | null>;
    updateToken(userId: string, token: string): Promise<UserDto | null>;
    create(data: CreateUserDto): Promise<UserDto | null>;
    updateEmailVerification(data: OtpModel, usersId: string): Promise<UserDto | null>;
    updateEmailStatus(email: string): Promise<UserDto | null>;
    resetPassword(userId: string, hashedPassword: string): Promise<UserDto | null>;
    forgotPassword(userId: string, otp: string): Promise<UserDto | null>;
    clearPasswordResetToken(email: string): Promise<UserDto | null>;
}
//# sourceMappingURL=iaccount.repository.d.ts.map