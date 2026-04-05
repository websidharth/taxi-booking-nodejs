import { Request, Response } from "express";
import IUnitOfService from "../services/interfaces/iunitof.service";
export declare class HealthController {
    private unitOfService;
    constructor(unitOfService?: IUnitOfService);
    /**
     * Handles a health check request.
     *
     * Responds with a JSON object indicating the service status.
     *
     * @param req - The Express request object.
     * @param res - The Express response object.
     * @returns A response with HTTP status 200 and a JSON body `{ status: 'UP' }`.
     */
    check(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=health.controller.d.ts.map