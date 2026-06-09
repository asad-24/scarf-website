"use client";

import Image from "next/image";
import { Edit3, Plus, Trash2, Upload } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import type { ProductView } from "@/lib/products";
import { formatCurrency } from "@/lib/format";

type FormState = {
  id?: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  imagePublicId: string;
  category: string;
  status: "active" | "draft";
  featured: boolean;
};

type ApiErrorPayload = {
  error?: string;
  details?: Record<string, string[]>;
};

type FormError = {
  message: string;
  details: Record<string, string[]>;
};

const emptyForm: FormState = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  imagePublicId: "",
  category: "Drop 005",
  status: "active",
  featured: false,
};

function parseFormError(data: ApiErrorPayload): FormError {
  return {
    message: data.error || "Could not save product.",
    details: data.details ?? {},
  };
}

export default function ProductManager({ initialProducts }: { initialProducts: ProductView[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState<FormError | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ProductView | null>(null);
  const [deleting, setDeleting] = useState(false);

  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.name.localeCompare(b.name)),
    [products]
  );

  function editProduct(product: ProductView) {
    setFormError(null);
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: String(product.price),
      imageUrl: product.imageUrl,
      imagePublicId: product.imagePublicId ?? "",
      category: product.category,
      status: product.status,
      featured: product.featured,
    });
  }

  async function uploadImage(file?: File) {
    if (!file) {
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Upload failed.");
      }
      setForm((current) => ({
        ...current,
        imageUrl: data.imageUrl,
        imagePublicId: data.imagePublicId,
      }));
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        imageUrl: form.imageUrl,
        imagePublicId: form.imagePublicId,
        category: form.category,
        status: form.status,
        featured: form.featured,
      };
      const response = await fetch(form.id ? `/api/products/${form.id}` : "/api/products", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        setFormError(parseFormError(data));
        return;
      }
      setProducts((current) =>
        form.id
          ? current.map((product) => (product.id === data.product.id ? data.product : product))
          : [data.product, ...current]
      );
      setForm(emptyForm);
      toast.success("Product saved");
    } catch (error) {
      setFormError({
        message: error instanceof Error ? error.message : "Could not save product.",
        details: {},
      });
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct() {
    if (!deleteTarget) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/products/${deleteTarget.id}`, { method: "DELETE" });
      if (response.ok) {
        setProducts((current) => current.filter((item) => item.id !== deleteTarget.id));
        setDeleteTarget(null);
        toast.message("Product deleted");
      } else {
        toast.error("Could not delete product.");
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      <form onSubmit={saveProduct} className="h-fit rounded-[8px] border border-white/10 bg-white/[0.05] p-5">
        <h2 className="flex items-center gap-2 text-xl font-black text-white">
          <Plus className="h-5 w-5 text-[#d8ff2f]" />
          {form.id ? "Edit product" : "Add product"}
        </h2>
        {formError ? (
          <div
            className="mt-4 rounded-[8px] border border-red-400/35 bg-red-500/10 p-4 text-sm text-red-100"
            role="alert"
            aria-live="polite"
          >
            <p className="font-black">{formError.message}</p>
            {Object.entries(formError.details).length ? (
              <ul className="mt-2 space-y-1 text-red-100/85">
                {Object.entries(formError.details).flatMap(([field, messages]) =>
                  messages.map((message) => (
                    <li key={`${field}-${message}`}>
                      <span className="font-bold capitalize">{field}</span>: {message}
                    </li>
                  ))
                )}
              </ul>
            ) : null}
          </div>
        ) : null}
        <div className="mt-5 space-y-4">
          <input required placeholder="Product name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="h-11 w-full rounded-[8px] border border-white/12 bg-black px-4 text-sm text-white outline-none" />
          <input required placeholder="Price" type="number" min="1" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} className="h-11 w-full rounded-[8px] border border-white/12 bg-black px-4 text-sm text-white outline-none" />
          <input required placeholder="Category" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} className="h-11 w-full rounded-[8px] border border-white/12 bg-black px-4 text-sm text-white outline-none" />
          <textarea required placeholder="Description" rows={5} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className="w-full rounded-[8px] border border-white/12 bg-black px-4 py-3 text-sm text-white outline-none" />
          <input required placeholder="Image URL" value={form.imageUrl} onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))} className="h-11 w-full rounded-[8px] border border-white/12 bg-black px-4 text-sm text-white outline-none" />
          <label className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/12 text-sm font-black uppercase tracking-[0.12em] text-white/70 transition hover:border-[#d8ff2f]/60 hover:text-[#d8ff2f]">
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading..." : "Upload image"}
            <input type="file" accept="image/*" className="hidden" onChange={(event) => uploadImage(event.target.files?.[0])} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as FormState["status"] }))} className="h-11 rounded-[8px] border border-white/12 bg-black px-3 text-sm text-white outline-none">
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
            <label className="flex h-11 items-center gap-2 rounded-[8px] border border-white/12 bg-black px-3 text-sm text-white/70">
              <input type="checkbox" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} />
              Featured
            </label>
          </div>
        </div>
        <div className="mt-5 flex gap-3">
          <button disabled={saving} className="h-11 flex-1 rounded-full bg-[#d8ff2f] text-sm font-black uppercase tracking-[0.12em] text-black disabled:opacity-60">
            {saving ? "Saving..." : "Save"}
          </button>
          {form.id ? (
            <button type="button" onClick={() => { setForm(emptyForm); setFormError(null); }} className="h-11 rounded-full border border-white/12 px-5 text-sm font-black text-white/70">
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="overflow-hidden rounded-[8px] border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse bg-white/[0.03] text-left text-sm">
            <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.14em] text-white/45">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => (
                <tr key={product.id} className="border-t border-white/10">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-14 overflow-hidden rounded-[8px] bg-black">
                        <Image src={product.imageUrl} alt={product.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-black text-white">{product.name}</p>
                        <p className="text-xs text-white/45">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white/70">{formatCurrency(product.price)}</td>
                  <td className="p-4 text-white/70">{product.status}</td>
                  <td className="p-4 text-white/70">{product.featured ? "Yes" : "No"}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => editProduct(product)} className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-white/70 hover:text-[#d8ff2f]" aria-label={`Edit ${product.name}`}>
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => setDeleteTarget(product)} className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-white/70 hover:text-red-300" aria-label={`Delete ${product.name}`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {deleteTarget ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 px-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-product-title"
            className="w-full max-w-md rounded-[8px] border border-white/10 bg-[#10100e] p-6 text-[#f8f4ea] shadow-[0_30px_120px_rgba(0,0,0,0.5)]"
          >
            <div className="grid h-12 w-12 place-items-center rounded-full bg-red-500/12 text-red-300">
              <Trash2 className="h-5 w-5" />
            </div>
            <h2 id="delete-product-title" className="mt-5 text-2xl font-black text-white">
              Are you sure?
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Delete <span className="font-bold text-white">{deleteTarget.name}</span>? This will
              remove the product from the shop and admin catalog.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/12 px-5 text-sm font-black text-white/70 transition hover:border-white/30 hover:text-white disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteProduct}
                disabled={deleting}
                className="inline-flex h-11 items-center justify-center rounded-full bg-red-400 px-5 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-red-300 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete product"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
