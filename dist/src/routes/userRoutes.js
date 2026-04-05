"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const ioc_config_1 = require("../config/ioc.config");
const ioc_types_1 = require("../config/ioc.types");
const asyncHandler_middleware_1 = __importDefault(require("../middleware/asyncHandler.middleware"));
const userRouter = (0, express_1.Router)();
const usersController = ioc_config_1.container.get(ioc_types_1.TYPES.UserController);
/**
 * @swagger
 * tags:
 *     - name: Students
 *       description: Student Management
 */
/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Get all users
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of all users
 */
userRouter.get("/", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(usersController.getAllUsers));
/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Get a user by email
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         example: websidharth@gmail.com
 *         description: The user email
 *     responses:
 *       200:
 *         description: The user description by email
 *       404:
 *         description: User not found
 */
userRouter.get("/email/:email", auth_1.authenticateToken, usersController.getUserByEmail);
/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user description by id
 *       404:
 *         description: User not found
 */
userRouter.get("/:userId", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(usersController.getUserById));
/**
 * @swagger
 * /users/status/{userId}:
 *   put:
 *     summary: Update User
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRouter.put("/status/:userId", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(usersController.updateStatusById));
/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update User
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               profileImageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRouter.put("/:userId", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(usersController.updateUserById));
/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user description by id
 *       404:
 *         description: User not found
 */
userRouter.delete("/:userId", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(usersController.deleteUserById));
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map