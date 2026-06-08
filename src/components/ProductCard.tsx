"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ProductView } from "@/lib/products";
import { formatCurrency } from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";

type ProductCardProps = {
  product: ProductView;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-white/10 bg-[#11110f] shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-black">
        <Image
          src={product.imageUrl}
          alt={`${product.name} by Monkey Scarfs`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/82 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d8ff2f] backdrop-blur">
          {product.category}
        </div>
        <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-black backdrop-blur">
          {formatCurrency(product.price)}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-5 p-6">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-display text-4xl leading-[0.95] text-[#f8f4ea] transition hover:text-[#d8ff2f]">
              {product.name}
            </h3>
          </Link>
          <p className="mt-4 min-h-14 text-sm leading-7 text-white/58">
            {product.description}
          </p>
        </div>
        <AddToCartButton
          product={product}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#d8ff2f] px-4 text-sm font-black text-[#080807] transition hover:bg-white"
        />
      </div>
    </motion.article>
  );
}
