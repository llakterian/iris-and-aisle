"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useEffect } from "react";

export default function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8 text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      <p className="text-gray-500 mb-8">
        Your payment was successful. We'll send a confirmation email shortly with your order details and tracking info.
      </p>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
