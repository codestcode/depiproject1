import { z } from "zod"

export const checkoutFormSchema = z.object({
  // Customer Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?[\d\s\-$$$$]+$/, "Please enter a valid phone number"),

  // Address Information
  streetAddress: z.string().min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),

  // Delivery Options
  deliveryOption: z.enum(["standard", "express", "same-day"], {
    required_error: "Please select a delivery option",
  }),

  // Payment Method
  paymentMethod: z.enum(["cash-on-delivery"], {
    required_error: "Please select a payment method",
  }),

  // Optional
  deliveryNotes: z.string().optional(),

  // Terms and conditions
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>

export const deliveryOptions = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "2-3 business days",
    price: 0,
    estimatedDays: "2-3",
  },
  {
    id: "express",
    name: "Express Delivery",
    description: "Next business day",
    price: 9.99,
    estimatedDays: "1",
  },
  {
    id: "same-day",
    name: "Same Day Delivery",
    description: "Available in select areas",
    price: 19.99,
    estimatedDays: "Same day",
  },
] as const

export const paymentMethods = [
  {
    id: "cash-on-delivery",
    name: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: "💵",
  },
] as const
