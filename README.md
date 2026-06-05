# Iris & Aisle - Premium Eyewear E-Commerce

A modern, full-stack e-commerce platform built specifically for premium eyewear brands. This project features a consumer-facing storefront, a persistent shopping cart, Stripe payment integration, and a secure admin dashboard for inventory management.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security, Auth)
- **Payments:** Stripe (Checkout Sessions & Webhooks)
- **Tracking:** Facebook Pixel

## Features

### 🛒 Storefront
- Dynamic product catalog fetched directly from Supabase.
- Category filtering (`?category=men`, `?category=women`).
- Persistent local shopping cart using React Context and `localStorage`.
- Server-side Stripe Checkout session generation for secure payments.

### 🛡️ Admin Dashboard (`/admin`)
- Secure login protected by Supabase Authentication.
- **Inventory Management:** Full CRUD (Create, Read, Update, Delete) capabilities for products. Changes reflect instantly on the live storefront.
- **Order Tracking:** View all customer orders, total revenue, and order statuses (Pending, Paid, Shipped) updated automatically via Stripe webhooks.

## Architecture Highlights
- **Security:** All database interactions are protected by Row Level Security (RLS). Public users can only read products, while only authenticated admins can mutate inventory or view orders.
- **Webhooks:** Includes an `/api/webhook` route that securely listens to Stripe events to update order status in real-time.
- **Marketing:** The layout is injected with the Facebook Pixel Conversion snippet to track `PageView` events natively within the Next.js routing lifecycle.

## Getting Started Locally

1. Clone the repository.
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and add your keys:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `STRIPE_SECRET_KEY`
4. Run the development server: `npm run dev`
