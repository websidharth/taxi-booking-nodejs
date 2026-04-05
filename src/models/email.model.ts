export interface CreateEmailModel {
  userId?: string;
  newsletterId?: number;
  recipient: string;
  subject?: string;
  htmlContent: string;
  emailResponse?: any | null;
}
