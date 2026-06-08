import type { NextRequest } from "next/server";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { connectDB } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { serializeOrder } from "@/lib/orders";

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return jsonError("Unauthorized.", 401);
    }

    await connectDB();
    const [totalProducts, totalOrders, recentOrders] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Order.find().sort({ createdAt: -1 }).limit(5),
    ]);

    return jsonOk({
      totalProducts,
      totalOrders,
      recentOrders: recentOrders.map(serializeOrder),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
