"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ioc_types_1 = require("../config/ioc.types");
const asyncHandler_middleware_1 = __importDefault(require("../middleware/asyncHandler.middleware"));
const ioc_config_1 = require("../config/ioc.config");
const healthRouter = (0, express_1.Router)();
const healthController = ioc_config_1.container.get(ioc_types_1.TYPES.HealthController);
/**
 * @swagger
 * tags:
 *   - name: HealthCheck
 *     description: Health Check Endpoints
 */
/**
 * @swagger
 * /health/check:
 *   get:
 *     summary: Health Check
 *     tags: [HealthCheck]
 *     requestBody:
 *       content:
 *         application/json:
 *     responses:
 *       201: { description: Created }
 */
healthRouter.get("/check", (0, asyncHandler_middleware_1.default)(healthController.check));
exports.default = healthRouter;
//# sourceMappingURL=health.routes.js.map