import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-lg font-bold tracking-tight text-black">Iris & Aisle</span>
            <p className="mt-4 text-sm text-gray-500">
              Premium eyewear designed for the modern aesthetic. Clear vision, sharp style.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/products" className="text-sm text-gray-500 hover:text-black">Men's Glasses</Link></li>
              <li><Link href="/products" className="text-sm text-gray-500 hover:text-black">Women's Glasses</Link></li>
              <li><Link href="/products" className="text-sm text-gray-500 hover:text-black">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-black">FAQ</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-black">Returns & Exchanges</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-black">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-black">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-black">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Iris & Aisle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
