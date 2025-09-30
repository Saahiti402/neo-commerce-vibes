-- Change product_id from uuid to text in all tables to match the frontend data structure

-- Drop foreign key constraints first
ALTER TABLE cart_items DROP CONSTRAINT IF EXISTS cart_items_product_id_fkey;
ALTER TABLE wishlist_items DROP CONSTRAINT IF EXISTS wishlist_items_product_id_fkey;

-- Drop unique constraints that reference product_id
ALTER TABLE cart_items DROP CONSTRAINT IF EXISTS cart_items_user_id_product_id_selected_color_selected_size_key;
ALTER TABLE wishlist_items DROP CONSTRAINT IF EXISTS wishlist_items_user_id_product_id_key;

-- Change column types
ALTER TABLE products ALTER COLUMN id TYPE text;
ALTER TABLE cart_items ALTER COLUMN product_id TYPE text;
ALTER TABLE wishlist_items ALTER COLUMN product_id TYPE text;

-- Recreate unique constraints
ALTER TABLE cart_items ADD CONSTRAINT cart_items_user_id_product_id_key 
  UNIQUE (user_id, product_id, selected_color, selected_size);

ALTER TABLE wishlist_items ADD CONSTRAINT wishlist_items_user_id_product_id_key 
  UNIQUE (user_id, product_id);

-- Add foreign key constraints
ALTER TABLE cart_items ADD CONSTRAINT cart_items_product_id_fkey 
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

ALTER TABLE wishlist_items ADD CONSTRAINT wishlist_items_product_id_fkey 
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;