import { Request, Response, NextFunction } from "express";
declare class ClientIdMiddleware {
    verify(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
}
declare const _default: ClientIdMiddleware;
export default _default;
//# sourceMappingURL=clientid.middleware.d.ts.map