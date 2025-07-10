import { z } from "zod";

export const teacherFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  
  subject: z
    .string()
    .min(2, "Subject must be at least 2 characters")
    .max(30, "Subject must be less than 30 characters"),
  
  phone: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits"),
  
  experience: z
    .number()
    .min(0, "Experience cannot be negative")
    .max(50, "Experience cannot exceed 50 years"),
  
  qualification: z
    .string()
    .min(2, "Qualification must be at least 2 characters")
    .max(100, "Qualification must be less than 100 characters"),
  
  department: z
    .string()
    .min(2, "Department must be at least 2 characters")
    .max(50, "Department must be less than 50 characters"),
  
  joinDate: z
    .string()
    .min(1, "Join date is required")
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate <= today;
    }, "Join date cannot be in the future"),
});

export type TeacherFormData = z.infer<typeof teacherFormSchema>;