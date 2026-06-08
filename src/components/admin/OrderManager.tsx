"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { OrderView } from "@/lib/orders";
import { formatCurrency, formatDate } from "@/lib/format";

const statuses: OrderView["status"][] = ["Pending", "Processing", "Completed", "Cancelled"];

export default function OrderManager({ initialOrders }: { initialOrders: OrderView[] }) {
  const [orders, setOrders] = useState(initialOrders);

  async function updateStatus(orderId: string, status: OrderView["status"]) {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error || "Could not update order.");
      return;
    }
    setOrders((current) => current.map((order) => (order.id === orderId ? data.order : order)));
    toast.success("Order status updated");
  }

  return (
    <div className="space-y-5">
      {orders.length ? (
        orders.map((order) => (
          <article key={order.id} className="rounded-[8px] border border-white/10 bg-white/[0.05] p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#d8ff2f]">
                  {formatDate(order.createdAt)}
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">{order.customerName}</h2>
                <p className="mt-1 text-sm text-white/55">
                  {order.email} | {order.phone}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-white/58">{order.shippingAddress}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <select
                  value={order.status}
                  onChange={(event) => updateStatus(order.id, event.target.value as OrderView["status"])}
                  className="h-11 rounded-full border border-white/12 bg-black px-4 text-sm font-bold text-white outline-none"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <p className="rounded-full bg-[#d8ff2f] px-4 py-2 text-sm font-black text-black">
                  {formatCurrency(order.totalAmount)}
                </p>
              </div>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.14em] text-white/40">
                  <tr>
                    <th className="py-2">Product</th>
                    <th className="py-2">Qty</th>
                    <th className="py-2">Price</th>
                    <th className="py-2 text-right">Line total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={`${order.id}-${item.productId}`} className="border-t border-white/10 text-white/70">
                      <td className="py-3">{item.name}</td>
                      <td className="py-3">{item.quantity}</td>
                      <td className="py-3">{formatCurrency(item.price)}</td>
                      <td className="py-3 text-right">{formatCurrency(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))
      ) : (
        <div className="rounded-[8px] border border-white/10 bg-white/[0.05] p-10 text-center text-white/55">
          No orders yet.
        </div>
      )}
    </div>
  );
}
