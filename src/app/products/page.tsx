import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;

  let query = supabase.from("products").select("*").order("created_at", { ascending: false });
  if (category) query = query.eq("category", category);

  const { data: products } = await query;

  const label = category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)}'s Eyewear`
    : "All Eyewear";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{label}</h1>
      <p className="text-gray-500 mb-12">
        {(products ?? []).length} product{(products ?? []).length !== 1 ? "s" : ""}
      </p>
      <ProductGrid products={(products as Product[]) ?? []} />
    </div>
  );
}
