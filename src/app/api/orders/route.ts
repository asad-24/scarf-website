import mongoose from "mongoose";
import type { NextRequest } from "next/server";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { serializeOrder } from "@/lib/orders";
import { orderInputSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return jsonError("Unauthorized.", 401);
    }

    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return jsonOk({ orders: orders.map(serializeOrder) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = orderInputSchema.parse(body);

    await connectDB();
    const ids = input.items.map((item) => item.productId);
    if (ids.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
      return jsonError("Invalid product in cart.", 400);
    }

    const products = await Product.find({ _id: { $in: ids }, status: "active" });
    const productMap = new Map(products.map((product) => [String(product._id), product]));

    const items = input.items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new Error("One or more products are no longer available.");
      }
      return {
        productId: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: item.quantity,
      };
    });

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({
      customerName: input.customerName,
      email: input.email,
      phone: input.phone,
      shippingAddress: input.shippingAddress,
      items,
      totalAmount,
      status: "Pending",
    });

    return jsonOk({ order: serializeOrder(order) }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
