import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";
import ProductDetail from "./ProductDetail";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) return notFound();

  return <ProductDetail product={product as Product} />;
}
