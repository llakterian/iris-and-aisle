"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { useState } from "react";

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold tracking-tight mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-6">${(product.price / 100).toFixed(2)}</p>
          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          <button
            onClick={handleAdd}
            disabled={added}
            className={`flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-medium transition-all duration-300 ${
              added
                ? "bg-green-600 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {added ? (
              <><Check className="w-5 h-5" /> Added to Cart</>
            ) : (
              <><ShoppingBag className="w-5 h-5" /> Add to Cart</>
            )}
          </button>

          <div className="mt-10 border-t border-gray-200 pt-8 space-y-3">
            <p className="text-sm text-gray-500">✓ Prescription-ready lenses included</p>
            <p className="text-sm text-gray-500">✓ Free shipping on all orders</p>
            <p className="text-sm text-gray-500">✓ 30-day free returns</p>
          </div>
        </div>
      </div>
    </div>
  );
}
