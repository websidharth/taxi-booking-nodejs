export interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
}
export declare class MailService {
    send({ to, subject, html }: SendEmailParams): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
//# sourceMappingURL=mail.service.d.ts.map