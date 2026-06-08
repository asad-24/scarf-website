import Product, { type ProductDocument } from "@/models/Product";
import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/format";

export type ProductView = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  imagePublicId?: string;
  category: string;
  status: "active" | "draft";
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export function serializeProduct(product: ProductDocument): ProductView {
  return {
    id: String(product._id),
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    imagePublicId: product.imagePublicId,
    category: product.category,
    status: product.status,
    featured: product.featured,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

export async function createUniqueSlug(name: string, existingId?: string) {
  const base = slugify(name) || "product";
  let slug = base;
  let suffix = 2;

  await connectDB();
  while (true) {
    const match = await Product.findOne({ slug }).select("_id").lean();
    if (!match || String(match._id) === existingId) {
      return slug;
    }
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
}

export async function getPublicProducts(options?: {
  search?: string;
  category?: string;
  featured?: boolean;
  limit?: number;
}) {
  await connectDB();
  const query: Record<string, unknown> = { status: "active" };

  if (options?.category && options.category !== "All") {
    query.category = options.category;
  }

  if (options?.featured) {
    query.featured = true;
  }

  if (options?.search) {
    const pattern = new RegExp(options.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    query.$or = [{ name: pattern }, { description: pattern }, { category: pattern }];
  }

  const products = await Product.find(query)
    .sort({ featured: -1, createdAt: -1 })
    .limit(options?.limit ?? 0);

  return products.map(serializeProduct);
}

export async function getPublicProductBySlug(slug: string) {
  await connectDB();
  const product = await Product.findOne({ slug, status: "active" });
  return product ? serializeProduct(product) : null;
}
