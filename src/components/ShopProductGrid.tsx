"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { ProductView } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ShopProductGrid({ products }: { products: ProductView[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((product) => product.category)))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch =
        !needle ||
        product.name.toLowerCase().includes(needle) ||
        product.description.toLowerCase().includes(needle) ||
        product.category.toLowerCase().includes(needle);
      return matchesCategory && matchesSearch;
    });
  }, [category, products, search]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-white/10 py-5 md:flex-row md:items-center md:justify-between">
        <label className="relative block md:w-[360px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search scarves"
            className="h-12 w-full rounded-full border border-white/12 bg-white/[0.06] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#d8ff2f]/70"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`h-10 rounded-full px-4 text-xs font-black uppercase tracking-[0.12em] transition ${
                category === item
                  ? "bg-[#d8ff2f] text-[#080807]"
                  : "border border-white/12 bg-white/[0.06] text-white/64 hover:text-white"
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length ? (
        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[8px] border border-white/10 bg-white/[0.05] p-10 text-center text-white/58">
          No scarves match your search.
        </div>
      )}
    </div>
  );
}
