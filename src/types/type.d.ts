declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.mp4";

interface IFormInput {
  firstName: string;
  organizationName: string;
  email: string;
  phone: number;
  dateOfBirth: Date;
  password: string | number;
  confirmPassword: string | number;
  address: string;
}
