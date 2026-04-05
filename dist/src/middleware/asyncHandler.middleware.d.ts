import { NextFunction, Request, Response } from 'express';
/**
 * Async handler to wrap the API routes, allowing for async error handling.
 * @param fn Function to call for the API endpoint
 * @returns Promise with a catch statement
 */
declare const asyncHandler: (fn: (req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default asyncHandler;
//# sourceMappingURL=asyncHandler.middleware.d.ts.map