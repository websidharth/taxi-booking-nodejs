"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterController = void 0;
const ioc_config_1 = require("../config/ioc.config");
const ioc_types_1 = require("../config/ioc.types");
const custom_error_1 = __importDefault(require("../exceptions/custom-error"));
class NewsletterController {
    constructor(unitOfService = ioc_config_1.container.get(ioc_types_1.TYPES.IUnitOfService)) {
        this.unitOfService = unitOfService;
        this.createNewsletter = async (req, res) => {
            const userId = req.user?.userId;
            if (!userId) {
                throw new custom_error_1.default('Unauthorized', 401);
            }
            const data = req.body;
            const user = await this.unitOfService.User.getUserById(userId);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            const newNewsletter = await this.unitOfService.Newsletter.create(userId, data);
            if (!newNewsletter) {
                throw new custom_error_1.default('Newsletter creation failed', 500);
            }
            const response = {
                success: true,
                message: 'Newsletter created successfully',
                data: newNewsletter,
            };
            return res.status(201).json(response);
        };
        this.getAllNewsletters = async (req, res) => {
            const newsletters = await this.unitOfService.Newsletter.getAll();
            const response = {
                success: true,
                message: 'Newsletters fetched successfully',
                data: newsletters,
            };
            return res.status(200).json(response);
        };
        this.getNewsletterById = async (req, res) => {
            const userId = req.user?.userId;
            const id = req.params.newsletterId;
            if (!id) {
                throw new custom_error_1.default('NewsletterId is required', 400);
            }
            if (!userId) {
                throw new custom_error_1.default('Unauthorized', 401);
            }
            const newsletter = await this.unitOfService.Newsletter.getById(+id);
            if (!newsletter) {
                throw new custom_error_1.default('Newsletter not found', 404);
            }
            const response = {
                success: true,
                message: 'Newsletter fetched successfully',
                data: newsletter,
            };
            return res.status(200).json(response);
        };
        this.updateNewsletterById = async (req, res) => {
            const id = req.params.newsletterId;
            if (!id) {
                throw new custom_error_1.default('NewsletterId is required', 400);
            }
            const updateData = req.body;
            const updated = await this.unitOfService.Newsletter.update(+id, updateData);
            if (!updated) {
                throw new custom_error_1.default('Newsletter not found or update failed', 404);
            }
            const response = {
                success: true,
                message: 'Newsletter updated successfully',
                data: updated,
            };
            return res.status(200).json(response);
        };
        this.deleteNewsletterById = async (req, res) => {
            const id = req.params.newsletterId;
            if (!id) {
                throw new custom_error_1.default('NewsletterId is required', 400);
            }
            const deleted = await this.unitOfService.Newsletter.delete(+id);
            if (!deleted) {
                throw new custom_error_1.default('Newsletter not found or delete failed', 404);
            }
            const response = {
                success: true,
                message: 'Newsletter deleted successfully',
                data: deleted,
            };
            return res.status(204).json(response);
        };
        this.unitOfService = unitOfService;
    }
}
exports.NewsletterController = NewsletterController;
//# sourceMappingURL=newsletter.controller.js.map