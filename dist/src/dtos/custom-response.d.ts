export default interface CustomResponse<T> {
    success: boolean;
    errors?: string[];
    message?: string;
    errorCode?: string;
    data?: T;
}
//# sourceMappingURL=custom-response.d.ts.map