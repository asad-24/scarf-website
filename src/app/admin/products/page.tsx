import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ProductManager from "@/components/admin/ProductManager";
import Product from "@/models/Product";
import { getAdminFromCookies } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { serializeProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const admin = await getAdminFromCookies();
  if (!admin) {
    redirect("/admin/login");
  }

  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });

  return (
    <AdminShell email={admin.email}>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d8ff2f]">Products</p>
        <h1 className="font-display text-6xl leading-none text-white">Manage scarfs</h1>
      </div>
      <ProductManager initialProducts={products.map(serializeProduct)} />
    </AdminShell>
  );
}
