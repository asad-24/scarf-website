import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ProductQuantityActions } from "@/components/AddToCartButton";
import { formatCurrency } from "@/lib/format";
import { getPublicProductBySlug } from "@/lib/products";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug).catch(() => null);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#080807] text-[#f8f4ea]">
      <Navbar />
      <main className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] border border-white/10 bg-black">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>

          <div className="lg:sticky lg:top-28">
            <Link
              href="/shop"
              className="text-sm font-black uppercase tracking-[0.18em] text-[#d8ff2f] transition hover:text-white"
            >
              Back to shop
            </Link>
            <p className="mt-8 w-fit rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/60">
              {product.category}
            </p>
            <h1 className="mt-5 font-display text-6xl leading-[0.9] text-white sm:text-8xl">
              {product.name}
            </h1>
            <p className="mt-5 text-3xl font-black text-[#d8ff2f]">
              {formatCurrency(product.price)}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/64 sm:text-lg">
              {product.description}
            </p>
            <ProductQuantityActions product={product} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
