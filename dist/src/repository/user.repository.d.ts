import { UpdateUserDto, UserDto } from "../dtos/user.dto";
import { IUserRepository } from "./interfaces/iuser.repository";
export declare class UserRepository implements IUserRepository {
    findAll(): Promise<UserDto[]>;
    findById(userId: string): Promise<UserDto | null>;
    findByEmail(email: string): Promise<UserDto | null>;
    update(userId: string, data: UpdateUserDto): Promise<UserDto>;
    updateStatus(userId: string, updatedData: UpdateUserDto): Promise<UserDto>;
    delete(userId: string): Promise<UserDto>;
}
//# sourceMappingURL=user.repository.d.ts.map