import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import asyncHandler from "../middleware/asyncHandler.middleware";
import { NewsletterController } from "../controllers/newsletter.controller";

const newsletterRouter = Router();

const newsletterController = container.get<NewsletterController>(TYPES.NewsletterController);

/**
 * @swagger
 * tags:
 *     - name: Newsletter
 *       description: Newsletter Management
 */



/**
 * @swagger
 * /newsletter/create:
 *   post:
 *     summary: Create Newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               title: { type: string }
 *               htmlContent: { type: string } 
 *     responses:
 *       201: { description: Created }
 */
newsletterRouter.post("/create", authenticateToken, asyncHandler(newsletterController.createNewsletter));



/**
 * @swagger
 * /newsletter/:
 *   get:
 *     summary: Get all newsletters
 *     tags: [Newsletter]
 *     responses:
 *       200:
 *         description: List of all newsletters
 */
newsletterRouter.get("/", authenticateToken, asyncHandler(newsletterController.getAllNewsletters));

/**
 * @swagger
 * /newsletter/{newsletterId}:
 *   get:
 *     summary: Get a newsletter by ID
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: NewsletterId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The user description by email
 */
newsletterRouter.get("/:newsletterId", authenticateToken, newsletterController.getNewsletterById);

/**
 * @swagger
 * /newsletter/{newsletterId}:
 *   get:
 *     summary: Get a newsletter by ID
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newsletterId
 *         schema:
 *           type: string
 *         required: true
 *         description: The newsletter ID
 *     responses:
 *       200:
 *         description: The newsletter description by id
 *       404:
 *         description: Newsletter not found
 */
newsletterRouter.get("/:newsletterId", authenticateToken, asyncHandler(newsletterController.getNewsletterById));


/**
 * @swagger
 * /newsletter/{newsletterId}:
 *   put:
 *     summary: Update Newsletter by ID
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newsletterId
 *         schema:
 *           type: string
 *         required: true
 *         description: The newsletter ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               htmlContent: { type: string } 
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

newsletterRouter.put("/:newsletterId", authenticateToken, asyncHandler(newsletterController.updateNewsletterById));

/**
 * @swagger
 * /newsletter/{newsletterId}:
 *   delete:
 *     summary: Delete a newsletter by ID
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newsletterId
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

newsletterRouter.delete("/:newsletterId", authenticateToken, asyncHandler(newsletterController.deleteNewsletterById));




export default newsletterRouter;
