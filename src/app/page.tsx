import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center bg-gray-50 overflow-hidden">
        {/* Placeholder for hero image */}
        <div className="absolute inset-0 z-0 bg-gray-200">
          <img 
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=2000" 
            alt="Person wearing stylish glasses" 
            className="w-full h-full object-cover opacity-90"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
            See the World,<br/> Beautifully.
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mb-10 drop-shadow-md">
            Premium, handcrafted eyewear designed for the modern aesthetic. Discover your perfect frame today.
          </p>
          <Link 
            href="/products" 
            className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-xl"
          >
            Shop the Collection
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-16">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/products?category=women" className="group relative h-96 rounded-2xl overflow-hidden bg-gray-100 block">
            <img 
              src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1000" 
              alt="Women's glasses" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <h3 className="text-3xl font-bold text-white mb-2">Women's</h3>
              <p className="text-white/90">Bold frames, timeless style.</p>
            </div>
          </Link>
          <Link href="/products?category=men" className="group relative h-96 rounded-2xl overflow-hidden bg-gray-100 block">
            <img 
              src="https://images.unsplash.com/photo-1583141170695-1f95a5fcc180?auto=format&fit=crop&q=80&w=1000" 
              alt="Men's glasses" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <h3 className="text-3xl font-bold text-white mb-2">Men's</h3>
              <p className="text-white/90">Sharp, modern, and classic.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Value Prop */}
      <section className="w-full bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-16">The Iris & Aisle Standard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">👓</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Materials</h3>
              <p className="text-gray-400">Hand-polished cellulose acetate and ultra-lightweight titanium frames.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Prescription Ready</h3>
              <p className="text-gray-400">Anti-reflective, scratch-resistant lenses included with every pair.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Free Returns</h3>
              <p className="text-gray-400">Try them on at home. Not perfect? Return them for free within 30 days.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
