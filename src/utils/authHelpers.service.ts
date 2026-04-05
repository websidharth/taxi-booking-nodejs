import { v4 as uuidv4 } from "uuid";

export const generateUserGUID = (): string => {
  return uuidv4(); // Generates unique UUID v4
};

// Optional: Generate GUID with prefix
export const generateUserGUIDWithPrefix = (): string => {
  return `${uuidv4()}`;
};

export const generateCustomId = (): number => {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  return randomNum; // Return just the number
};

export const userAge = (dateOfBirth: string | Date): number => {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

export const getCustomId = (): number => {
  return parseInt(
    new Date().getFullYear().toString() + generateCustomId().toString()
  );
};

export const getAdmissionId = (lastUser: string) => {
  return (
    "User" + new Date().getFullYear() + (parseInt(lastUser) + 1).toString()
  );
};

export const buildUserName = (firstName: string, lastName: string): string => {
  return `${firstName}${lastName}`.toLowerCase().replace(/\s+/g, "");
};

export const createUserName = (firstName: string, lastName: string): string => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${firstName}${lastName}${random}`.toLowerCase().replace(/\s+/g, "");
};

export const nowISO = (): string => {
  return new Date().toISOString();
};

export const generate4DigitOtp = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};
