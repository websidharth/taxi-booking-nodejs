"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const ioc_config_1 = require("../config/ioc.config");
const ioc_types_1 = require("../config/ioc.types");
const custom_error_1 = __importDefault(require("../exceptions/custom-error"));
const emailDispatcher_util_1 = require("../utils/email/emailDispatcher.util");
class EmailController {
    constructor(unitOfService = ioc_config_1.container.get(ioc_types_1.TYPES.IUnitOfService)) {
        this.unitOfService = unitOfService;
        this.sendEmail = async (req, res) => {
            const data = req.body;
            if (!data?.recipient || !data?.htmlContent) {
                throw new custom_error_1.default("recipient and htmlContent are required", 400);
            }
            let response;
            const userId = req.user?.userId;
            if (!userId) {
                throw new custom_error_1.default('userId is required', 400);
            }
            console.log('EmailController - sendEmail called with data:', data);
            const userExists = await this.unitOfService.User.getUserById(userId);
            if (!userExists) {
                throw new custom_error_1.default("User not found", 404);
            }
            const emailResponse = await (0, emailDispatcher_util_1.dispatchEmailAsync)({
                userId: userExists.userId,
                to: data.recipient,
                subject: data.subject || "No Subject",
                html: data.htmlContent,
            });
            if (!emailResponse) {
                throw new custom_error_1.default("Failed to send email", 500);
            }
            const createEmail = await this.unitOfService.Email.create(data, userId, emailResponse);
            response = {
                success: true,
                message: 'Email sent successfully',
                data: createEmail,
            };
            return res.status(200).json(response);
        };
        this.getAllEmails = async (req, res) => {
            let response;
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
        this.getEmailById = async (req, res) => {
            const id = req.params.id;
            if (!id) {
                throw new custom_error_1.default('id not found', 404);
            }
            let response;
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
        this.deleteEmail = async (req, res) => {
            const id = req.params.id;
            if (!id) {
                throw new custom_error_1.default('id not found', 404);
            }
            let response;
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
        this.unitOfService = unitOfService;
    }
}
exports.EmailController = EmailController;
//# sourceMappingURL=email.controller.js.map