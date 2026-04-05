import IUnitOfService from "../services/interfaces/iunitof.service";
import { Request, Response } from "express";
import CustomResponse from "../dtos/custom-response";
import { UserDto } from "../dtos/user.dto";
import { refreshTokenResponseDto } from "../dtos/loginResponse.dto";
export declare class AccountController {
    private unitOfService;
    constructor(unitOfService?: IUnitOfService);
    login: (req: Request, res: Response) => Promise<Response<CustomResponse<UserDto>>>;
    logout: (req: Request, res: Response) => Promise<Response<CustomResponse<null>>>;
    register: (req: Request, res: Response) => Promise<Response<CustomResponse<UserDto>>>;
    refreshToken: (req: Request, res: Response) => Promise<Response<CustomResponse<refreshTokenResponseDto>>>;
    sentOtp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    otpVerify: (req: Request, res: Response) => Promise<Response<CustomResponse<UserDto>>>;
    resetPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    forgotPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=auth.controller.d.ts.map