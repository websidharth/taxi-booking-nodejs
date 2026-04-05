import { IUserService } from "./interfaces/Iuser.service";
import { UpdateUserDto, UserDto } from "../dtos/user.dto";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import { Role } from "../enum/user.enum";
import { CreateUserModel } from "../models/user.model";
import { users } from "@prisma/client";
import type { IDateTimeService } from "./interfaces/idatetime.service";
export declare class UserService implements IUserService {
    private unitOfWork;
    private dateTime;
    constructor(unitOfWork: IUnitOfWork, dateTime: IDateTimeService);
    create(data: CreateUserModel, role: Role): Promise<UserDto>;
    getAll(): Promise<UserDto[] | null>;
    getUserById(userId: string): Promise<UserDto | null>;
    getByEmail(email: string): Promise<UserDto | null>;
    update(userId: string, updatedData: UpdateUserDto): Promise<UserDto | null>;
    updateStatus(userId: string, updatedData: UpdateUserDto): Promise<UserDto | null>;
    delete(userId: string): Promise<UserDto | null>;
    convertToDto(user: users, includePassword?: boolean, token?: boolean, refreshToken?: boolean): UserDto;
}
export default UserService;
//# sourceMappingURL=user.service.d.ts.map