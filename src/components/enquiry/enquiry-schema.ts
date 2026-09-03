import { z } from "zod";

export const INTERESTED_IN_OPTIONS = [
  "Commercial Shop",
  "Office Space",
  "Food Court / Restaurant",
  "Retail Kiosk",
  "Other",
] as const;

export const CONTACT_METHOD_OPTIONS = ["Phone", "WhatsApp", "Email"] as const;

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

const selectOption = (list: readonly string[], message: string) =>
  z
    .string()
    .min(1, message)
    .refine((value) => list.includes(value), message);

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name is required")
    .max(100, "Name must be 100 characters or fewer"),
  phone: z
    .string()
    .trim()
    .regex(INDIAN_MOBILE_REGEX, "Enter a valid 10-digit mobile number"),
  email: z
    .union([z.email("Enter a valid email address").trim(), z.literal("")])
    .optional(),
  interestedIn: selectOption(
    INTERESTED_IN_OPTIONS,
    "Please select an option"
  ),
  contactMethod: selectOption(
    CONTACT_METHOD_OPTIONS,
    "Please select a contact method"
  ),
  message: z
    .string()
    .trim()
    .max(2000, "Message must be 2000 characters or fewer")
    .optional(),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;