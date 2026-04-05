"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const ioc_config_1 = require("../config/ioc.config");
const ioc_types_1 = require("../config/ioc.types");
const custom_error_1 = __importDefault(require("../exceptions/custom-error"));
class UserController {
    constructor(unitOfService = ioc_config_1.container.get(ioc_types_1.TYPES.IUnitOfService)) {
        this.unitOfService = unitOfService;
        this.getAllUsers = async (req, res) => {
            let response;
            const user = await this.unitOfService.User.getAll();
            if (!user) {
                response = { success: false, message: 'User not found' };
                return res.status(404).json(response);
            }
            const totalRecord = user.length;
            response = {
                success: true,
                message: 'User fetched successfully',
                data: { totalRecord, data: user },
            };
            return res.status(200).json(response);
        };
        this.getUserById = async (req, res) => {
            const { userId } = req.params;
            let response;
            if (!userId) {
                response = { success: false, message: 'userId is required' };
                return res.status(400).json(response);
            }
            const user = await this.unitOfService.User.getUserById(userId);
            if (!user) {
                response = { success: false, message: 'User not found' };
                return res.status(404).json(response);
            }
            response = {
                success: true,
                message: 'User fetched successfully',
                data: user,
            };
            return res.status(200).json(response);
        };
        this.getUserByEmail = async (req, res) => {
            const { email } = req.params;
            if (!email) {
                throw new custom_error_1.default('Email is required', 400);
            }
            const user = await this.unitOfService.User.getByEmail(email, false);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            const response = {
                success: true,
                message: 'User fetched successfully',
                data: user,
            };
            return res.status(200).json(response);
        };
        this.updateUserById = async (req, res) => {
            const userId = req.params.userId;
            if (!userId) {
                const response = {
                    success: false,
                    message: 'userId is required',
                };
                return res.status(400).json(response);
            }
            const updatedData = req.body;
            const user = await this.unitOfService.User.update(userId, updatedData);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            const response = {
                success: true,
                data: user,
            };
            return res.status(200).json(response);
        };
        this.updateStatusById = async (req, res) => {
            const userId = req.params.userId;
            if (!userId) {
                const response = {
                    success: false,
                    message: 'userId is required',
                };
                return res.status(400).json(response);
            }
            const updatedData = req.body;
            const user = await this.unitOfService.User.updateStatus(userId, updatedData);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            const response = {
                success: true,
                data: user,
            };
            return res.status(200).json(response);
        };
        this.deleteUserById = async (req, res) => {
            const userId = req.params.userId;
            if (!userId) {
                const response = {
                    success: false,
                    message: 'userId is required',
                };
                return res.status(400).json(response);
            }
            const user = await this.unitOfService.User.delete(userId);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            const response = {
                success: true,
                message: 'User deleted successfully',
                data: user,
            };
            return res.status(200).json(response);
        };
        this.unitOfService = unitOfService;
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map