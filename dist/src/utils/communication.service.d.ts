type SendEmailParams = {
    usersId: string;
    to: string;
    subject: string;
    html: string;
};
type SendSmsParams = {
    usersId: string;
    to: string;
    message: string;
};
type SendSmsParamss = {
    to: string;
    subject: string;
    html: string;
};
export declare class CommunicationService {
    sendEmails({ to, subject, html }: SendSmsParamss): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    sendAndLogEmail({ usersId, to, subject, html }: SendEmailParams): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    sendAndLogSms({ usersId, to, message }: SendSmsParams): Promise<import("twilio/lib/rest/api/v2010/account/message").MessageInstance>;
    sendWelcomeEmail(params: {
        usersId: string;
        to: string;
        fullName: string;
        admissionNumber: string;
    }): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
export {};
//# sourceMappingURL=communication.service.d.ts.map