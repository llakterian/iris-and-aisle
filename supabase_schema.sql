-- Run this entire script in your Supabase SQL Editor

-- 1. Create the products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- Stored in cents (e.g., $149.00 = 14900)
  image_url TEXT,
  category TEXT DEFAULT 'unisex',
  stock INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT, -- We store email for guest checkout
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'cancelled')),
  stripe_session_id TEXT UNIQUE,
  total_amount INTEGER NOT NULL, -- In cents
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create the order items table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price_at_time INTEGER NOT NULL -- The price they paid at checkout, in case it changes later
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- 5. Policies
-- Anyone can view products
CREATE POLICY "Public products are viewable by everyone." 
ON products FOR SELECT USING (true);

-- Only authenticated admins can modify products
CREATE POLICY "Only admins can modify products" 
ON products FOR ALL USING (auth.role() = 'authenticated');

-- Anyone can insert an order (via the API during checkout)
CREATE POLICY "Anyone can create an order"
ON orders FOR INSERT WITH CHECK (true);

-- Only admins can view/update all orders
CREATE POLICY "Only admins can view/update orders"
ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Only admins can update orders"
ON orders FOR UPDATE USING (auth.role() = 'authenticated');

-- Anyone can insert an order item
CREATE POLICY "Anyone can create order items"
ON order_items FOR INSERT WITH CHECK (true);

-- Only admins can view order items
CREATE POLICY "Only admins can view order items"
ON order_items FOR SELECT USING (auth.role() = 'authenticated');

-- 6. Insert some placeholder mock products
INSERT INTO products (name, description, price, image_url, category) VALUES
('The Classic Tortoise', 'A timeless round frame made from hand-polished Italian acetate.', 12500, 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1000', 'women'),
('The Aviator Matte', 'Sleek, lightweight titanium frames built for durability and comfort.', 14500, 'https://images.unsplash.com/photo-1583141170695-1f95a5fcc180?auto=format&fit=crop&q=80&w=1000', 'men'),
('The Clear Crystal', 'Modern transparent frames that match any outfit perfectly.', 11000, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1000', 'unisex');
