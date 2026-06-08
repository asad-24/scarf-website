import mongoose from "mongoose";
import type { NextRequest } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { serializeOrder } from "@/lib/orders";
import { orderStatusInputSchema } from "@/lib/validators";

type OrderRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: OrderRouteContext) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return jsonError("Unauthorized.", 401);
    }

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return jsonError("Invalid order id.", 400);
    }

    await connectDB();
    const order = await Order.findById(id);
    if (!order) {
      return jsonError("Order not found.", 404);
    }

    return jsonOk({ order: serializeOrder(order) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest, context: OrderRouteContext) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return jsonError("Unauthorized.", 401);
    }

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return jsonError("Invalid order id.", 400);
    }

    const body = await request.json();
    const input = orderStatusInputSchema.parse(body);

    await connectDB();
    const order = await Order.findByIdAndUpdate(id, { status: input.status }, { new: true });
    if (!order) {
      return jsonError("Order not found.", 404);
    }

    return jsonOk({ order: serializeOrder(order) });
  } catch (error) {
    return handleApiError(error);
  }
}
