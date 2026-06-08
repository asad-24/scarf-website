import { z } from "zod";

export const productStatusSchema = z.enum(["active", "draft"]);
export const orderStatusSchema = z.enum(["Pending", "Processing", "Completed", "Cancelled"]);

export const loginSchema = z.object({
  email: z.string().min(2, "Username is required.").trim().toLowerCase(),
  password: z.string().min(1, "Password is required."),
});

export const productInputSchema = z.object({
  name: z.string().min(2, "Product name is required.").trim(),
  description: z.string().min(10, "Description must be at least 10 characters.").trim(),
  price: z.coerce.number().positive("Price must be greater than zero."),
  imageUrl: z.string().min(1, "Product image is required."),
  imagePublicId: z.string().optional().or(z.literal("")),
  category: z.string().min(2, "Category is required.").trim(),
  status: productStatusSchema.default("active"),
  featured: z.coerce.boolean().default(false),
});

export const orderInputSchema = z.object({
  customerName: z.string().min(2, "Name is required.").trim(),
  email: z.string().email("Enter a valid email.").trim().toLowerCase(),
  phone: z.string().min(6, "Phone number is required.").trim(),
  shippingAddress: z.string().min(8, "Shipping address is required.").trim(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.coerce.number().int().positive(),
      })
    )
    .min(1, "Add at least one product to checkout."),
});

export const orderStatusInputSchema = z.object({
  status: orderStatusSchema,
});

export type ProductInput = z.infer<typeof productInputSchema>;
export type OrderInput = z.infer<typeof orderInputSchema>;
