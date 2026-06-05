"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, ShoppingCart, LogOut, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import type { Product, Order } from "@/lib/types";

type Tab = "products" | "orders";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("unisex");
  const [stock, setStock] = useState("100");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin");
        return;
      }
      await fetchData();
    };
    checkAuth();
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    const [prodRes, orderRes] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
    ]);
    setProducts((prodRes.data as Product[]) || []);
    setOrders((orderRes.data as Order[]) || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  const resetForm = () => {
    setName(""); setDescription(""); setPrice(""); setImageUrl("");
    setCategory("unisex"); setStock("100");
    setEditingProduct(null); setShowForm(false);
  };

  const openEditForm = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setDescription(p.description);
    setPrice((p.price / 100).toString());
    setImageUrl(p.image_url);
    setCategory(p.category);
    setStock(p.stock.toString());
    setShowForm(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      description,
      price: Math.round(parseFloat(price) * 100),
      image_url: imageUrl,
      category,
      stock: parseInt(stock),
    };

    if (editingProduct) {
      await supabase.from("products").update(data).eq("id", editingProduct.id);
    } else {
      await supabase.from("products").insert(data);
    }

    resetForm();
    await fetchData();
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    await fetchData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const totalRevenue = orders.filter(o => o.status === "paid").reduce((s, o) => s + o.total_amount, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-500 hover:text-black">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-50 rounded-xl p-6">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold mt-1">{products.length}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold mt-1">{orders.length}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-bold mt-1">${(totalRevenue / 100).toFixed(2)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-8">
        <button
          onClick={() => setTab("products")}
          className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            tab === "products" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          <Package className="w-4 h-4" /> Products
        </button>
        <button
          onClick={() => setTab("orders")}
          className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            tab === "orders" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          <ShoppingCart className="w-4 h-4" /> Orders
        </button>
      </div>

      {/* Products Tab */}
      {tab === "products" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Inventory</h2>
            <button
              onClick={() => { resetForm(); setShowForm(true); }}
              className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSaveProduct} className="bg-gray-50 rounded-xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (USD)</label>
                <input value={price} onChange={e => setPrice(e.target.value)} type="number" step="0.01" required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input value={imageUrl} onChange={e => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <input value={stock} onChange={e => setStock(e.target.value)} type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
              </div>
              <div className="sm:col-span-2 flex gap-3">
                <button type="submit" className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all">
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
                <button type="button" onClick={resetForm} className="px-6 py-2.5 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-100 transition-all">
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Stock</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-gray-100">
                    <td className="py-4 font-medium">{p.name}</td>
                    <td className="py-4 text-gray-500 capitalize">{p.category}</td>
                    <td className="py-4">${(p.price / 100).toFixed(2)}</td>
                    <td className="py-4">{p.stock}</td>
                    <td className="py-4 text-right">
                      <button onClick={() => openEditForm(p)} className="p-2 text-gray-400 hover:text-black">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {tab === "orders" && (
        <div className="overflow-x-auto">
          {orders.length === 0 ? (
            <p className="text-gray-400 text-center py-16">No orders yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-b border-gray-100">
                    <td className="py-4 font-mono text-xs">{o.id.slice(0, 8)}...</td>
                    <td className="py-4">{o.user_email}</td>
                    <td className="py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        o.status === "paid" ? "bg-green-100 text-green-700" :
                        o.status === "shipped" ? "bg-blue-100 text-blue-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-4">${(o.total_amount / 100).toFixed(2)}</td>
                    <td className="py-4 text-gray-500">{new Date(o.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
