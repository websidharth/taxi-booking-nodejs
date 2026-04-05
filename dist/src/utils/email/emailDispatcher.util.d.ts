interface SendEmailOptions {
    userId?: string;
    to: string;
    subject: string;
    html?: string;
    templateName?: string;
    templateData?: Record<string, any>;
}
export declare const dispatchEmailAsync: ({ userId, to, subject, html, templateName, templateData }: SendEmailOptions) => Promise<any>;
export {};
//# sourceMappingURL=emailDispatcher.util.d.ts.map