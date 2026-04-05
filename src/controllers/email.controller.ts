import { container } from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import IUnitOfService from '../services/interfaces/iunitof.service';
import { Request, Response } from 'express';
import CustomResponse from '../dtos/custom-response';
import CustomError from '../exceptions/custom-error';
import { UserEmailDto } from '../dtos/email.dto';
import { CreateEmailModel } from '../models/email.model';
import { dispatchEmailAsync } from '../utils/email/emailDispatcher.util';
import { ListResponseDto } from '../dtos/list-response.dto';

export class EmailController {
  constructor(private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)) {
    this.unitOfService = unitOfService;
  }

  sendEmail = async (req: Request, res: Response): Promise<Response<CustomResponse<CreateEmailModel>>> => {
    const data = req.body as CreateEmailModel;

    if (!data?.recipient || !data?.htmlContent) {
      throw new CustomError("recipient and htmlContent are required", 400);
    }

    let response: CustomResponse<UserEmailDto>;

    const userId = req.user?.userId;
    if (!userId) {
      throw new CustomError('userId is required', 400);
    }

    console.log('EmailController - sendEmail called with data:', data);


    const userExists = await this.unitOfService.User.getUserById(userId);
    if (!userExists) {
      throw new CustomError("User not found", 404);
    }

    
   const emailResponse = await dispatchEmailAsync({
      userId: userExists.userId,
      to: data.recipient,
      subject: data.subject || "No Subject",
      html: data.htmlContent,
    });

    if (!emailResponse) {
      throw new CustomError("Failed to send email", 500);
    }

    const createEmail = await this.unitOfService.Email.create(data, userId, emailResponse);


    response = {
      success: true,
      message: 'Email sent successfully',
      data: createEmail,
    };

    return res.status(200).json(response);
  };

  getAllEmails = async (req: Request, res: Response): Promise<Response<CustomResponse<ListResponseDto<UserEmailDto>>>> => {
    let response: CustomResponse<ListResponseDto<UserEmailDto>>;

    const data = await this.unitOfService.Email.findAll();
    if (!data) {
      response = { success: false, message: 'User not found' };
      return res.status(404).json(response);
    }
    const totalRecord = data.length;
    response = {
      success: true,
      message: 'User fetched successfully',
      data: { totalRecord, data: data },
    };

    return res.status(200).json(response);
  };

  getEmailById = async (req: Request, res: Response): Promise<Response<CustomResponse<UserEmailDto>>> => {
    const id = req.params.id;
    if (!id) {
      throw new CustomError('id not found', 404);
    }
    let response: CustomResponse<UserEmailDto>;
    const data = await this.unitOfService.Email.findById(+id);
    if (!data) {
      response = { success: false, message: 'Email not found' };
      return res.status(404).json(response);
    }
    response = {
      success: true,
      message: 'Email fetched successfully',
      data: data,
    };
    return res.status(200).json(response);
  };

  deleteEmail = async (req: Request, res: Response): Promise<Response<CustomResponse<UserEmailDto>>> => {
    const id = req.params.id;
    if (!id) {
      throw new CustomError('id not found', 404);
    }
    let response: CustomResponse<UserEmailDto>;
    const data = await this.unitOfService.Email.delete(+id);
    if (!data) {
      response = { success: false, message: 'Email not found' };
      return res.status(404).json(response);
    }
    response = {
      success: true,
      message: 'Email deleted successfully',
      data: data,
    };
    return res.status(204).json(response);
  };


}
