import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface LineItem {
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: LineItem[] } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: item.image_url ? [item.image_url] : [],
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      success_url: `${req.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
