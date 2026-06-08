import type { NextRequest } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { getAdminFromRequest } from "@/lib/auth";
import { createUniqueSlug, serializeProduct } from "@/lib/products";
import { productInputSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const includeDrafts = searchParams.get("includeDrafts") === "true";
    const admin = includeDrafts ? await getAdminFromRequest(request) : null;

    const query: Record<string, unknown> = includeDrafts && admin ? {} : { status: "active" };
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    if (category && category !== "All") {
      query.category = category;
    }
    if (featured === "true") {
      query.featured = true;
    }
    if (search) {
      const pattern = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      query.$or = [{ name: pattern }, { description: pattern }, { category: pattern }];
    }

    const products = await Product.find(query).sort({ featured: -1, createdAt: -1 });
    return jsonOk({ products: products.map(serializeProduct) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return jsonError("Unauthorized.", 401);
    }

    const body = await request.json();
    const input = productInputSchema.parse(body);

    await connectDB();
    const slug = await createUniqueSlug(input.name);
    const product = await Product.create({
      ...input,
      imagePublicId: input.imagePublicId || undefined,
      slug,
    });

    return jsonOk({ product: serializeProduct(product) }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
