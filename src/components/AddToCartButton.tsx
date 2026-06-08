"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { ProductView } from "@/lib/products";
import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({
  product,
  quantity = 1,
  className,
}: {
  product: ProductView;
  quantity?: number;
  className?: string;
}) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      className={
        className ??
        "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#d8ff2f] px-6 text-sm font-black uppercase tracking-[0.12em] text-[#080807] transition hover:bg-white"
      }
      onClick={() =>
        addItem(
          {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            imageUrl: product.imageUrl,
          },
          quantity
        )
      }
    >
      <ShoppingBag className="h-4 w-4" />
      Add to cart
    </button>
  );
}

export function ProductQuantityActions({ product }: { product: ProductView }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-8 space-y-5">
      <div className="flex w-fit items-center rounded-full border border-white/12 bg-white/[0.06] p-1">
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full text-xl text-white transition hover:bg-white/10"
          onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="grid h-10 min-w-12 place-items-center text-sm font-black text-white">
          {quantity}
        </span>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full text-xl text-white transition hover:bg-white/10"
          onClick={() => setQuantity((value) => value + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <AddToCartButton product={product} quantity={quantity} />
    </div>
  );
}
