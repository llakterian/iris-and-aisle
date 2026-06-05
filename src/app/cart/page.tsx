"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            image_url: i.product.image_url,
          })),
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!count) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any frames yet.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all"
        >
          Browse Eyewear <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-6 p-4 border border-gray-200 rounded-xl">
              <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/products/${product.id}`} className="font-medium hover:underline">
                    {product.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">${(product.price / 100).toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3 border border-gray-200 rounded-full px-1 py-1">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 h-fit sticky top-24">
          <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal ({count} items)</span>
              <span className="font-medium">${(total / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between text-base">
              <span className="font-semibold">Total</span>
              <span className="font-bold">${(total / 100).toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-8 w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
            ) : (
              "Proceed to Checkout"
            )}
          </button>
          <p className="text-xs text-gray-400 text-center mt-4">Secure checkout powered by Stripe</p>
        </div>
      </div>
    </div>
  );
}
