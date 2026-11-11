import { z } from "zod";

const singleLine = (label: string, max: number) => z.string().trim()
  .min(1, `Please enter your ${label}`)
  .max(max, `Please keep ${label} under ${max} characters`)
  .regex(/^[^\r\n\u0000]*$/, `Please enter a valid ${label}`);

export const requiredPhone = singleLine("phone number", 20)
  .regex(/^\+?[0-9 ()-]+$/, "Please enter a valid phone number")
  .refine(value => {
    const digits = value.replace(/\D/g, "").length;
    return digits >= 7 && digits <= 15;
  }, "Please enter a phone number with 7 to 15 digits");
export const requiredEmail = singleLine("email", 255).email("Please enter a valid email");
export const requiredInstitution = singleLine("institution", 150);
export const requiredLocation = singleLine("location", 150);

const optionalLine = (label: string, max: number) => z.string().trim()
  .max(max, `Please keep ${label} under ${max} characters`)
  .regex(/^[^\r\n\u0000]*$/, `Please enter a valid ${label}`);
export const optionalInstitution = optionalLine("institution", 150);
export const optionalLocation = optionalLine("location", 150);