export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviewCount: number;
  colors?: string[];
  sizes?: string[];
  tags: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
  image?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  parentCategory: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}