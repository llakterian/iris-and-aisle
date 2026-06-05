"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between">
        <div>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-black">{product.name}</h3>
          </Link>
          <p className="mt-1 text-sm text-gray-500">${(product.price / 100).toFixed(2)}</p>
        </div>
        <button
          onClick={() => addItem(product)}
          className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-200"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
