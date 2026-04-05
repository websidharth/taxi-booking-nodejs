import prisma from "../config/prisma";
import { sendSMS } from "./twilio";

export class AuthService {
  async sendAndLogSms(params: {
    usersId: string;
    to: string;
    message: string;
  }) {
    const { usersId, to, message } = params;

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
}
