import crypto from "crypto";

export const generateEmailVerificationToken = () => {
  // random token safe for URL
  const token = crypto.randomBytes(32).toString("hex");
  // expires in 15 minutes
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  return { token, expires };
};
