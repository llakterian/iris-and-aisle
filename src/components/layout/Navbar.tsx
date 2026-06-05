"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function Navbar() {
  const { count } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <button className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-black">
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="text-xl font-bold tracking-tight text-black">
            Iris & Aisle
          </Link>
          <div className="hidden lg:flex gap-6 ml-6">
            <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Shop All
            </Link>
            <Link href="/products?category=men" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Men
            </Link>
            <Link href="/products?category=women" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Women
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 text-gray-600 hover:text-black transition-colors">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="p-2 text-gray-600 hover:text-black transition-colors relative">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
