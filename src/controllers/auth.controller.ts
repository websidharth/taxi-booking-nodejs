import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import { LoginModel } from "../models/login.model";
import IUnitOfService from "../services/interfaces/iunitof.service";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomResponse from "../dtos/custom-response";
import { UserDto } from "../dtos/user.dto";
import { CreateUserModel } from "../models/user.model";
import CustomError from "../exceptions/custom-error";
import { Role } from "../enum/user.enum";
import { LoginResponseDto, refreshTokenResponseDto } from "../dtos/loginResponse.dto";
import config from "../config";
import { dispatchEmailAsync } from "../utils/email/emailDispatcher.util";
import { nowISO } from "../utils/authHelpers.service";
import { isExpired } from "../utils/timeExpiry.util";
import { ResetPasswordModel, verifyEmailModel } from "../models/forgot-password.model";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

export class AccountController {
  constructor(
    private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)
  ) {
    this.unitOfService = unitOfService;
  }





  login = async (req: Request, res: Response): Promise<Response<CustomResponse<UserDto>>> => {

    const model = req.body as LoginModel;

    let response: CustomResponse<UserDto>;


    if (!model.email || !model.password) {
      const response: CustomResponse<LoginResponseDto> = {
        success: false,
        message: "Email and password are required",
      };
      return res.status(400).json(response);
    }


    const loggedInUser = await this.unitOfService.User.getByEmail(model.email);
    if (!loggedInUser) {
      const response: CustomResponse<LoginResponseDto> = {
        success: false,
        message: "Invalid email or password", // Don't specify which one is wrong
      };
      return res.status(401).json(response);
    }

    const isPasswordValid = await bcrypt.compare(model.password, loggedInUser.password || "");
    if (!isPasswordValid) {
      throw new Error("Invalid email or password",);
    }

    const token = jwt.sign(
      {
        id: loggedInUser.id,
        userId: loggedInUser.userId,
        name: loggedInUser.name,
        email: loggedInUser.email,
        role: loggedInUser.role,
        //expiresIn: config.jwt.accessExpires,
      },
      config.jwt.secret,
      {
        expiresIn: "10h",
        algorithm: "HS256",
        audience: config.jwt.audience,
        issuer: config.jwt.issuer,
        notBefore: "0", // Cannot use before now, can be configured to be deferred.
      }
    );

    const refreshToken = jwt.sign(
      {
        id: loggedInUser.id,
        userId: loggedInUser.userId,
        name: loggedInUser.name,
        email: loggedInUser.email,
        role: loggedInUser.role,
        //expiresIn: config.jwt.refreshExpires,
      },
      config.jwt.secret,
      {
        expiresIn: "30d",
        algorithm: "HS256",
        audience: config.jwt.audience,
        issuer: config.jwt.issuer,
        notBefore: "0", // Cannot use before now, can be configured to be deferred.
      }
    );

    const user = await this.unitOfService.Account.login(model, token, refreshToken);

    if (!user) {
      const response: CustomResponse<UserDto> = {
        success: false,
        message: "Login failed",
      };
      return res.status(400).json(response);
    }

    if (!user.isEmailVerified) {
      const response: CustomResponse<LoginResponseDto> = {
        success: true,
        message: "Login successful",
        data: { token, user }
      };
      return res.status(200).json(response);
    }


    response = {
      success: false,
      message: "Login Unsuccessful",
    };

    return res.status(400).json(response);
  };

  logout = async (
    req: Request,
    res: Response
  ): Promise<Response<CustomResponse<null>>> => {
    // Invalidate the token (implementation depends on token storage strategy, e.g., blacklist)
    const userId = req.user?.userId;

    if (!userId) {
      throw new CustomError('User ID is required', 400);
    }

    const clearToken = await this.unitOfService.Account.logout(userId);

    if (!clearToken) {
      throw new CustomError("Clear Token failed", 400);
    }

    const user = await this.unitOfService.User.getUserById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }


    const response: CustomResponse<null> = {
      success: true,
      message: "Logout successful",
      data: null,
    };

    return res.status(200).json(response);
  };



  register = async (req: Request, res: Response): Promise<Response<CustomResponse<UserDto>>> => {
    const data = req.body as CreateUserModel;
    let response: CustomResponse<UserDto>;

    const user = await this.unitOfService.User.getByEmail(data.email);
    if (user) {
      throw new CustomError("User already exists", 409);
    }

    const newUser = await this.unitOfService.Account.create(
      data as unknown as CreateUserModel,
      Role.User
    );

    if (!newUser) {
      throw new CustomError("User creation failed", 400);
    }

    // const emailUser = await this.unitOfService.User.getByEmail(
    //   data.email,
    //   false
    // );

    dispatchEmailAsync({
      userId: newUser.userId,
      to: newUser.email,
      subject: "Welcome 🎉",
      templateName: "welcome_newsletter",
      templateData: {
        FirstName: newUser.name,
        PlatformName: newUser.name,
        LoginLink: "http://localhost:3000/login/",
        SupportEmail: "sidharth@gmrwebteam.com",
        WebsiteUrl: "http://localhost:3000/",
        OTP_CODE: newUser.emailVerificationToken,
        Year: nowISO(),
      },
    });

    dispatchEmailAsync({
      userId: newUser.userId,
      to: "sidharth@gmrwebteam.com",
      subject: "Admin 🎉",
      templateName: "user-registered",
      templateData: {
        title: `${newUser.name} has registered on Newsletter Platform`,
        userId: newUser.userId,
        Name: newUser.name,
        Email: newUser.email,
        UserName: newUser.userName,
        Phone: newUser.phone,
        Status: newUser.status,
        Date: newUser.createdAt,
        PlatformName: newUser.name,
      },
    });

    response = {
      success: true,
      message: "User created successfully",
      data: newUser,
    };
    return res.status(201).json(response);
  };

  refreshToken = async (req: Request, res: Response): Promise<Response<CustomResponse<refreshTokenResponseDto>>> => {

    const userId = req.user?.userId;

    if (!userId) {
      throw new CustomError('userId is required', 400);
    }


    const { token: oldToken } = req.body as { token: string };

    if (!oldToken) {
      throw new CustomError('Token is required', 400);
    }


    const decoded = jwt.verify(oldToken, config.jwt.secret || "",);

    const user = await this.unitOfService.User.getUserById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    // const userToken = user?.token;
    // const refreshToken = user?.refreshToken;


    // if (!userToken || !refreshToken) {
    //   throw new CustomError('Token not found', 400);
    // }



    const token = jwt.sign(
      {
        userId: (decoded as any).userId,
        name: (decoded as any).name,
        email: (decoded as any).email,
        role: (decoded as any).role?.toString(),
        profileImageUrl: (decoded as any).profileImageUrl,
        expiresIn: config.jwt.accessExpires,
        tokenUpdated: "Yes"
      },
      JWT_SECRET || "",
      {
        expiresIn: "5h",
        algorithm: "HS256",
        audience: config.jwt.audience,
        issuer: config.jwt.issuer,
        notBefore: "0", // Cannot use before now, can be configured to be deferred.
      }
    );

    await this.unitOfService.Account.updateToken(userId, token);

    const updateUser = await this.unitOfService.User.getUserById(userId);
    if (!updateUser || !updateUser.token || !updateUser.refreshToken) {
      throw new CustomError('Token not found', 400);
    }
    const newToken = updateUser.token;
    const refreshToken = updateUser.refreshToken;

    const response: CustomResponse<refreshTokenResponseDto> = {
      success: true,
      message: "Token refreshed successfully",
      data: { newToken, refreshToken }
    };
    return res.status(200).json(response);
  };



  sentOtp = async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      throw new CustomError('Email is required', 400);
    }
    const user = await this.unitOfService.Account.forgotPassword(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    dispatchEmailAsync({
      userId: user.userId,
      to: user.email,
      subject: "Welcome 🎉",
      templateName: "welcome_newsletter",
      templateData: {
        FirstName: user.name,
        PlatformName: user.name,
        LoginLink: "http://localhost:3000/sign-in/",
        SupportEmail: "sidharth@gmrwebteam.com",
        WebsiteUrl: "http://localhost:3000/",
        OTP_CODE: user.emailVerificationToken,
        Year: nowISO(),
      },
    });

    dispatchEmailAsync({
      userId: user.userId,
      to: "sidharth@gmrwebteam.com",
      subject: "Admin 🎉",
      templateName: "user-registered",
      templateData: {
        title: `${user.name} has registered on Newsletter Platform`,
        userId: user.userId,
        Name: user.name,
        Email: user.email,
        UserName: user.userName,
        Phone: user.phone,
        Status: user.status,
        Date: user.createdAt,
        PlatformName: user.name,
      },
    });

    const response: CustomResponse<UserDto> = {
      success: true,
      message: "User fetched successfully",
      data: user,
    };
    return res.status(200).json(response);
  };

  otpVerify = async (req: Request, res: Response): Promise<Response<CustomResponse<UserDto>>> => {
    const data = req.body as verifyEmailModel;
    if (!data.email) {
      throw new CustomError('Email is required', 400);
    }

    const user = await this.unitOfService.User.getByEmail(data.email);
    if (!user) {
      throw new CustomError('User not found', 400);
    }

    let response: CustomResponse<UserDto>;

    // if (!data.email) {
    //   response = { success: false, message: "Unauthorized" };
    //   return res.status(401).json(response);
    // }


    if (user.isEmailVerified) {
      response = {
        success: false,
        message: "User already verified",
      };
      return res.status(200).json(response);
    }



    // ✅ token exists?
    if (!user.emailVerificationToken || !user.emailVerificationExpires) {
      response = {
        success: false,
        message: "OTP not generated or already used. Please resend OTP",
      };

      return res.status(200).json(response);
    }

    // ✅ expiry check (1 minute expiry supported)
    const now = new Date();
    const expiresAt = user.emailVerificationExpires;


    const expired = isExpired(expiresAt, 1);


    if (isExpired(user.emailVerificationExpires, 1)) {
      response = {
        success: false,
        message: `${data.otp},"OTP expired. Please resend OTP"`,
      };

      return res.status(200).json(response);
    }

    if (user.emailVerificationToken !== data.otp) {
      response = {
        success: false,
        message: "Invalid OTP",
      };

      return res.status(400).json(response);
    }

    const newUser = await this.unitOfService.Account.updateEmailStatus(data.email);
    if (!newUser) {
      throw new CustomError("User not found", 200);
    }


    // const updatedUser = await this.unitOfService.User.getUserById(userId);
    // if (!updatedUser) {
    //   throw new CustomError("User not found", 200);
    // }
    response = {
      success: true,
      message: "OTP verified successfully",
      data: newUser,
    };
    return res.status(200).json(response);
  };

  resetPassword = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const data = req.body as ResetPasswordModel;
    console.log("userId", userId);
    if (!userId) {
      throw new CustomError('User Id Or Email Id is required', 200);
    }
    const user = await this.unitOfService.User.getUserById(userId);
    if (user) {
      throw new CustomError('User Not Found', 200);
    }
    const users = await this.unitOfService.Account.resetPassword(userId, data);
    if (!users) {
      throw new CustomError('User not found', 200);
    }
    const response: CustomResponse<UserDto> = {
      success: true,
      message: "User fetched successfully",
      data: users,
    };
    return res.status(200).json(response);
  };

  forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
      throw new CustomError('Email is required', 400);
    }

    const existingUser = await this.unitOfService.User.getByEmail(email);
    if (!existingUser) {
      throw new CustomError('User not found', 404);
    }

    const user = await this.unitOfService.Account.forgotPassword(existingUser.userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    const response: CustomResponse<UserDto> = {
      success: true,
      message: "User fetched successfully",
      data: user,
    };
    return res.status(200).json(response);
  };

}
