import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ShopProductGrid from "@/components/ShopProductGrid";
import { getPublicProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

async function loadProducts() {
  try {
    return await getPublicProducts();
  } catch {
    return [];
  }
}

export default async function ShopPage() {
  const products = await loadProducts();

  return (
    <div className="min-h-screen bg-[#080807] text-[#f8f4ea]">
      <Navbar />
      <main className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#d8ff2f]">
            Shop Collection
          </p>
          <div className="mt-4 max-w-3xl">
            <h1 className="font-display text-6xl leading-[0.9] text-white sm:text-8xl">
              Scarfs for every color mood
            </h1>
            <p className="mt-5 text-base leading-8 text-white/62">
              Browse live products from MongoDB, search by name or category, and add your favorite
              scarfs to the cart.
            </p>
          </div>

          <div className="mt-10">
            <ShopProductGrid products={products} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
