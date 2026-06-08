import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { getAdminFromCookies } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/format";
import { serializeOrder } from "@/lib/orders";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const admin = await getAdminFromCookies();
  if (!admin) {
    redirect("/admin/login");
  }

  await connectDB();
  const [totalProducts, totalOrders, recentOrders, revenue] = await Promise.all([
    Product.countDocuments(),
    Order.countDocuments(),
    Order.find().sort({ createdAt: -1 }).limit(5),
    Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
  ]);

  const orders = recentOrders.map(serializeOrder);

  return (
    <AdminShell email={admin.email}>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d8ff2f]">Dashboard</p>
        <h1 className="font-display text-6xl leading-none text-white">Store overview</h1>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { label: "Total products", value: totalProducts },
          { label: "Total orders", value: totalOrders },
          { label: "Order value", value: formatCurrency(revenue[0]?.total ?? 0) },
        ].map((stat) => (
          <div key={stat.label} className="rounded-[8px] border border-white/10 bg-white/[0.05] p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-white/45">{stat.label}</p>
            <p className="mt-4 font-display text-5xl leading-none text-[#d8ff2f]">{stat.value}</p>
          </div>
        ))}
      </div>
      <section className="mt-10 rounded-[8px] border border-white/10 bg-white/[0.05] p-6">
        <h2 className="text-xl font-black text-white">Recent orders</h2>
        <div className="mt-5 space-y-3">
          {orders.length ? (
            orders.map((order) => (
              <div key={order.id} className="flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-white">{order.customerName}</p>
                  <p className="text-sm text-white/45">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-white/12 px-3 py-1 text-xs font-bold text-white/60">
                    {order.status}
                  </span>
                  <span className="font-black text-[#d8ff2f]">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-white/55">No orders yet.</p>
          )}
        </div>
      </section>
    </AdminShell>
  );
}
