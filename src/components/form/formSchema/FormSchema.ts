import { z } from "zod";

// New Blog Post
export const NewPostFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title can not be more than 100 characters"),

  status: z.string().min(1, "Status is required"),

  slug: z
    .string()
    .min(1, "Slug is required")
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be a valid format"),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(800, "Excerpt can not be more than 800 characters"),
  metaDescription: z
    .string()
    .min(3, "Meta description is required")
    .max(800, "Meta description can not be more than 800 characters"),
  tags: z.array(z.string()).optional(),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
});

export type NewPostFormSchemaType = z.infer<typeof NewPostFormSchema>;

export const EditPostFormSchema = z.object({
  id: z.string(),
  status: z.string().min(1, "Status is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title can not be more than 100 characters"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(800, "Excerpt can not be more than 800 characters"),
  metaDescription: z
    .string()
    .min(3, "Meta description is required")
    .max(800, "Meta description can not be more than 800 characters"),
  tags: z.array(z.string()).optional(),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
});

export type EditPostFormSchemaType = z.infer<typeof NewPostFormSchema>;

// New Product

export const NewProductFormSchema = z.object({
  name: z
    .string()
    .min(10, "Name must be at least 10 characters")
    .max(200)
    .trim()
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      "Name should not contain special characters like - _ +"
    ),
  description: z
    .string()
    .min(10, "Description must contain at least 10 character")
    .max(4000)
    .trim(),
  status: z.string().min(1, "Status is required").max(100),
  category: z.string().min(1, "Required"),
  subcategory: z.string().min(1, "Required"),
  brand: z.string().min(1, "Required").trim(),
  price: z.number(),
  discountPrice: z.number().optional(),
  discountPercent: z.number().optional(),
  stock: z.number(),
  size: z.coerce.number().optional(),
  additionalCategory: z.string().optional(),
  color: z.string().optional(),
  material: z.string().optional(),
  weight: z.coerce.number().optional(),
});

export type NewProductFormSchemaType = z.infer<typeof NewProductFormSchema>;
