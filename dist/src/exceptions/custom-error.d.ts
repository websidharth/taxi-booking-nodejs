export default class CustomError extends Error {
    message: string;
    status: number;
    additionalInfo: any;
    constructor(message: string, status?: number, additionalInfo?: any);
}
//# sourceMappingURL=custom-error.d.ts.map