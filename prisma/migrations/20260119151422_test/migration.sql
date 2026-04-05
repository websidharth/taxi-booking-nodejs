-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,
    "emailVerificationExpires" TIMESTAMP(3),
    "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "profileImageUrl" TEXT,
    "loginAttempts" INTEGER NOT NULL DEFAULT 0,
    "lastLoginAt" TIMESTAMP(3),
    "lastLoginIP" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT,
    "tokenUpdated" TIMESTAMP(3),
    "refreshToken" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "newsletterTempletes" (
    "id" SERIAL NOT NULL,
    "newsletterId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "newsletterTempletes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userNewsletterEmail" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "newsletterId" INTEGER,
    "recipient" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "subject" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "errorMessage" TEXT,
    "emailResponse" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "userNewsletterEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userSms" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT,
    "twilioResponse" JSONB,

    CONSTRAINT "userSms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userId_key" ON "users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_emailVerificationToken_key" ON "users"("emailVerificationToken");

-- CreateIndex
CREATE INDEX "users_userId_idx" ON "users"("userId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "newsletterTempletes_newsletterId_key" ON "newsletterTempletes"("newsletterId");

-- CreateIndex
CREATE INDEX "newsletterTempletes_userId_idx" ON "newsletterTempletes"("userId");

-- CreateIndex
CREATE INDEX "newsletterTempletes_newsletterId_idx" ON "newsletterTempletes"("newsletterId");

-- CreateIndex
CREATE INDEX "userNewsletterEmail_userId_idx" ON "userNewsletterEmail"("userId");

-- CreateIndex
CREATE INDEX "userNewsletterEmail_newsletterId_idx" ON "userNewsletterEmail"("newsletterId");

-- CreateIndex
CREATE INDEX "userNewsletterEmail_recipient_idx" ON "userNewsletterEmail"("recipient");

-- AddForeignKey
ALTER TABLE "newsletterTempletes" ADD CONSTRAINT "newsletterTempletes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userNewsletterEmail" ADD CONSTRAINT "userNewsletterEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userNewsletterEmail" ADD CONSTRAINT "userNewsletterEmail_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "newsletterTempletes"("newsletterId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userSms" ADD CONSTRAINT "userSms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
