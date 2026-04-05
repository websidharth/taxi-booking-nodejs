import { container } from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import IUnitOfService from '../services/interfaces/iunitof.service';
import { Request, Response } from 'express';
import CustomResponse from '../dtos/custom-response';
import CustomError from '../exceptions/custom-error';
import { NewsletterTempletesModel } from '../models/newsletterTempletes.model';
import { NewsletterTempletesDto } from '../dtos/newsletterTempletes.dto';

export class NewsletterController {
  constructor(private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)) {
    this.unitOfService = unitOfService;
  }

  createNewsletter = async (req: Request, res: Response): Promise<Response<CustomResponse<NewsletterTempletesDto>>> => {
    const userId = req.user?.userId;
    if (!userId) {
      throw new CustomError('Unauthorized', 401);
    }
    const data = req.body as NewsletterTempletesModel;
    const user = await this.unitOfService.User.getUserById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    const newNewsletter = await this.unitOfService.Newsletter.create(userId, data);
    if (!newNewsletter) {
      throw new CustomError('Newsletter creation failed', 500);
    }
    const response: CustomResponse<NewsletterTempletesDto> = {
      success: true,
      message: 'Newsletter created successfully',
      data: newNewsletter,
    };
    return res.status(201).json(response);
  };

  getAllNewsletters = async (req: Request, res: Response): Promise<Response<CustomResponse<NewsletterTempletesDto[]>>> => {
    const newsletters = await this.unitOfService.Newsletter.getAll();
    const response: CustomResponse<NewsletterTempletesDto[]> = {
      success: true,
      message: 'Newsletters fetched successfully',
      data: newsletters,
    };
    return res.status(200).json(response);
  };

  getNewsletterById = async (req: Request, res: Response): Promise<Response<CustomResponse<NewsletterTempletesDto>>> => {
    const userId = req.user?.userId;
    const id = req.params.newsletterId;
    if (!id) {
      throw new CustomError('NewsletterId is required', 400);
    }
    if (!userId) {
      throw new CustomError('Unauthorized', 401);
    }

    const newsletter = await this.unitOfService.Newsletter.getById(+id);
    if (!newsletter) {
      throw new CustomError('Newsletter not found', 404);
    }
    const response: CustomResponse<NewsletterTempletesDto> = {
      success: true,
      message: 'Newsletter fetched successfully',
      data: newsletter,
    };
    return res.status(200).json(response);
  };

  updateNewsletterById = async (req: Request, res: Response): Promise<Response<CustomResponse<NewsletterTempletesDto>>> => {
    const id = req.params.newsletterId;
    if (!id) {
      throw new CustomError('NewsletterId is required', 400);
    }
    const updateData = req.body;
    const updated = await this.unitOfService.Newsletter.update(+id, updateData);
    if (!updated) {
      throw new CustomError('Newsletter not found or update failed', 404);
    }
    const response: CustomResponse<NewsletterTempletesDto> = {
      success: true,
      message: 'Newsletter updated successfully',
      data: updated,
    };
    return res.status(200).json(response);
  };

  deleteNewsletterById = async (req: Request, res: Response): Promise<Response<CustomResponse<NewsletterTempletesDto>>> => {
    const id = req.params.newsletterId;
    if (!id) {
      throw new CustomError('NewsletterId is required', 400);
    }
    const deleted = await this.unitOfService.Newsletter.delete(+id);
    if (!deleted) {
      throw new CustomError('Newsletter not found or delete failed', 404);
    }
    const response: CustomResponse<NewsletterTempletesDto> = {
      success: true,
      message: 'Newsletter deleted successfully',
      data: deleted,
    };
    return res.status(204).json(response);
  };
}
