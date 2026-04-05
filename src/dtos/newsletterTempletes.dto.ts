export interface NewsletterTempletesCreateDto {
  newsletterId: number;
  userId: string;
  title: string;
  htmlContent: string;
  status: boolean;
}

export interface NewsletterTempletesUpdateDto {
  title?: string;
  htmlContent?: string;
  status?: boolean;
}

export interface NewsletterTempletesDto {
  id: number;
  newsletterId: number | null;
  userId: string;
  title: string;
  htmlContent: string;
  status: boolean | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface NewsletterDto {
  id: number;
  newsletterId: number | null;
  userId: string;
  title: string;
  htmlContent: string;
  status: boolean | null;
  createdAt: Date;
  updatedAt: Date | null;
}