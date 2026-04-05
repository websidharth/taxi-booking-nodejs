export interface CreateEmailDto {
  userId: string;
  recipient: string;
  subject: string | null;
  htmlContent: string;
  emailResponse?: any | null;
}

export interface UserEmailDto {
  id: number;
  userId: string;
  recipient: string;
  subject: string | null;
  htmlContent: string;
  emailResponse?: any | null;
  createdAt: Date | null;
}
