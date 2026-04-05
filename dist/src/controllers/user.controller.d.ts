import IUnitOfService from '../services/interfaces/iunitof.service';
import { Request, Response } from 'express';
import CustomResponse from '../dtos/custom-response';
import { UserDto } from '../dtos/user.dto';
import { ListResponseDto } from '../dtos/list-response.dto';
export declare class UserController {
    private unitOfService;
    constructor(unitOfService?: IUnitOfService);
    getAllUsers: (req: Request, res: Response) => Promise<Response<CustomResponse<ListResponseDto<UserDto>>>>;
    getUserById: (req: Request, res: Response) => Promise<Response<CustomResponse<UserDto>>>;
    getUserByEmail: (req: Request, res: Response) => Promise<Response<CustomResponse<UserDto>>>;
    updateUserById: (req: Request, res: Response) => Promise<Response<CustomResponse<UserDto>>>;
    updateStatusById: (req: Request, res: Response) => Promise<Response<CustomResponse<UserDto>>>;
    deleteUserById: (req: Request, res: Response) => Promise<Response<CustomResponse<UserDto>>>;
}
//# sourceMappingURL=user.controller.d.ts.map