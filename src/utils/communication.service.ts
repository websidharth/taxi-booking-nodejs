import prisma from "../config/prisma";
import { sendEmail } from "./nodemailer";
import { sendSMS } from "./twilio";

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

export class CommunicationService {
  async sendEmails({ to, subject, html }: SendSmsParamss) {
    const emailResp = await sendEmail(to, subject, html);
    return emailResp;
  }

  async sendAndLogEmail({ usersId, to, subject, html }: SendEmailParams) {
    const emailResp = await sendEmail(to, subject, html);

    // await prisma.userEmail.create({
    //   data: {
    //     userId: usersId,
    //     recipient: to,
    //     subject,
    //     htmlContent: html,
    //     emailResponse: JSON.parse(JSON.stringify(emailResp)),
    //   },
    // });

    return emailResp;
  }

  async sendAndLogSms({ usersId, to, message }: SendSmsParams) {
    const smsResp = await sendSMS(to, message);

    await prisma.userSms.create({
      data: {
        userId: usersId,
        phoneNumber: to,
        message,
        twilioResponse: JSON.parse(JSON.stringify(smsResp)),
      },
    });

    return smsResp;
  }

  // ✅ Reusable convenience function (example)
  async sendWelcomeEmail(params: {
    usersId: string;
    to: string;
    fullName: string;
    admissionNumber: string;
  }) {
    const { usersId, to, fullName, admissionNumber } = params;

    return this.sendAndLogEmail({
      usersId,
      to,
      subject: "Welcome to Our Platform 🎉",
      html: `
        <h2>Welcome ${fullName}!</h2>
        <p>Your account has been successfully created.</p>
        <p><b>Admission Number:</b> ${admissionNumber}</p>
      `,
    });
  }
}
