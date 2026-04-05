import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import asyncHandler from "../middleware/asyncHandler.middleware";
import { EmailController } from "../controllers/email.controller";

const emailRouter = Router();
const emailController = container.get<EmailController>(TYPES.EmailController);

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
 

emailRouter.get("/", authenticateToken, asyncHandler(emailController.getAllEmails));

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



emailRouter.post("/", authenticateToken, asyncHandler(emailController.sendEmail));



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
emailRouter.get("/:id", authenticateToken, asyncHandler(emailController.getEmailById));


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

emailRouter.delete("/:id", authenticateToken, asyncHandler(emailController.deleteEmail));


export default emailRouter;
