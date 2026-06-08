import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import OrderManager from "@/components/admin/OrderManager";
import Order from "@/models/Order";
import { getAdminFromCookies } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { serializeOrder } from "@/lib/orders";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const admin = await getAdminFromCookies();
  if (!admin) {
    redirect("/admin/login");
  }

  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });

  return (
    <AdminShell email={admin.email}>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d8ff2f]">Orders</p>
        <h1 className="font-display text-6xl leading-none text-white">Customer orders</h1>
      </div>
      <OrderManager initialOrders={orders.map(serializeOrder)} />
    </AdminShell>
  );
}
