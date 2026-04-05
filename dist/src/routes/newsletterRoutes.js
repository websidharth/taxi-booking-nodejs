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
const newsletterRouter = (0, express_1.Router)();
const newsletterController = ioc_config_1.container.get(ioc_types_1.TYPES.NewsletterController);
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
newsletterRouter.post("/create", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(newsletterController.createNewsletter));
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
newsletterRouter.get("/", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(newsletterController.getAllNewsletters));
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
newsletterRouter.get("/:newsletterId", auth_1.authenticateToken, newsletterController.getNewsletterById);
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
newsletterRouter.get("/:newsletterId", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(newsletterController.getNewsletterById));
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
newsletterRouter.put("/:newsletterId", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(newsletterController.updateNewsletterById));
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
newsletterRouter.delete("/:newsletterId", auth_1.authenticateToken, (0, asyncHandler_middleware_1.default)(newsletterController.deleteNewsletterById));
exports.default = newsletterRouter;
//# sourceMappingURL=newsletterRoutes.js.map