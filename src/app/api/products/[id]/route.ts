import mongoose from "mongoose";
import type { NextRequest } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import { deleteProductImage } from "@/lib/cloudinary";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { getAdminFromRequest } from "@/lib/auth";
import { createUniqueSlug, serializeProduct } from "@/lib/products";
import { productInputSchema } from "@/lib/validators";

type ProductRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, context: ProductRouteContext) {
  try {
    const { id } = await context.params;
    await connectDB();

    const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
    const product = await Product.findOne(query);
    if (!product) {
      return jsonError("Product not found.", 404);
    }

    return jsonOk({ product: serializeProduct(product) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest, context: ProductRouteContext) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return jsonError("Unauthorized.", 401);
    }

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return jsonError("Invalid product id.", 400);
    }

    const body = await request.json();
    const input = productInputSchema.parse(body);

    await connectDB();
    const current = await Product.findById(id);
    if (!current) {
      return jsonError("Product not found.", 404);
    }

    const slug = await createUniqueSlug(input.name, id);
    if (current.imagePublicId && current.imagePublicId !== input.imagePublicId) {
      await deleteProductImage(current.imagePublicId);
    }

    current.set({
      ...input,
      imagePublicId: input.imagePublicId || undefined,
      slug,
    });
    await current.save();

    return jsonOk({ product: serializeProduct(current) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: ProductRouteContext) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return jsonError("Unauthorized.", 401);
    }

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return jsonError("Invalid product id.", 400);
    }

    await connectDB();
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return jsonError("Product not found.", 404);
    }

    await deleteProductImage(product.imagePublicId);
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
