import Order, { type OrderDocument } from "@/models/Order";

export type OrderView = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  items: {
    productId: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
};

export function serializeOrder(order: OrderDocument): OrderView {
  return {
    id: String(order._id),
    customerName: order.customerName,
    email: order.email,
    phone: order.phone,
    shippingAddress: order.shippingAddress,
    items: order.items.map((item) => ({
      productId: String(item.productId),
      name: item.name,
      imageUrl: item.imageUrl,
      price: item.price,
      quantity: item.quantity,
    })),
    totalAmount: order.totalAmount,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  };
}
