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
const emailRouter = (0, express_1.Router)();
const emailController = ioc_config_1.container.get(ioc_types_1.TYPES.EmailController);
/**
 * @swagger
 * tags:
 *   - name: Emails
 *     description: Email Management
 */
/**
 * @swagger
 * /email/:
 *   get:
 *     summary: Get all emails
 *     tags: [Emails]
 *     responses:
 *       200:
 *         description: List of all users
 */
emailRouter.get("/", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(emailController.getAllEmails));
/**
 * @swagger
 * /email/:
 *   post:
 *     summary: Send an email
 *     tags: [Emails]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipient
 *               - subject
 *               - htmlContent
 *             properties:
 *               userId:
 *                 type: string
 *                 description: UserId (userId) of sender
 *                 example: "537e3cbb-67ff-4cba-bd68-050d83f73a22"
 *               recipient:
 *                 type: string
 *                 description: Recipient email address
 *                 example: "sidharth@gmrwebteam.com"
 *               subject:
 *                 type: string
 *                 description: Email subject
 *                 example: "Greetings"
 *               htmlContent:
 *                 type: string
 *                 description: Email body (HTML content)
 *                 example: "<h1>Hello</h1><p>This is a test email</p>"
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: User not authenticated
 *       500:
 *         description: Failed to send email
 */
emailRouter.post("/", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(emailController.sendEmail));
/**
 * @swagger
 * /email/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Emails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The email ID
 *     responses:
 *       200:
 *         description: The email description by id
 *       404:
 *         description: Email not found
 */
emailRouter.get("/:id", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(emailController.getEmailById));
/**
 * @swagger
 * /email/{id}:
 *   delete:
 *     summary: Delete an email by ID
 *     tags: [Emails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The email ID
 *     responses:
 *       200:
 *         description: The email description by id
 *       404:
 *         description: Email not found
 */
emailRouter.delete("/:id", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(emailController.deleteEmail));
exports.default = emailRouter;
//# sourceMappingURL=emailRoutes.js.map