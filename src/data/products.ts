import { Product, Category } from "@/types/product";
import mensJacket1 from "@/assets/products/mens-jacket-1.jpg";
import womensBag1 from "@/assets/products/womens-bag-1.jpg";
import mensSneakers1 from "@/assets/products/mens-sneakers-1.jpg";

export const categories: Category[] = [
  {
    id: "fashion",
    name: "Fashion",
    subcategories: [
      { id: "mens-clothing", name: "Men's Clothing", parentCategory: "fashion" },
      { id: "womens-clothing", name: "Women's Clothing", parentCategory: "fashion" },
      { id: "kids-clothing", name: "Kids' Clothing", parentCategory: "fashion" },
    ],
  },
  {
    id: "footwear",
    name: "Footwear",
    subcategories: [
      { id: "mens-shoes", name: "Men's Shoes", parentCategory: "footwear" },
      { id: "womens-shoes", name: "Women's Shoes", parentCategory: "footwear" },
      { id: "kids-shoes", name: "Kids' Shoes", parentCategory: "footwear" },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    subcategories: [
      { id: "bags", name: "Bags & Handbags", parentCategory: "accessories" },
      { id: "jewelry", name: "Jewelry", parentCategory: "accessories" },
      { id: "watches", name: "Watches", parentCategory: "accessories" },
    ],
  },
];

export const products: Product[] = [
  // Men's Clothing
  {
    id: "1",
    name: "Premium Leather Jacket",
    description: "Luxury genuine leather jacket with premium finish and modern cut",
    price: 299.99,
    originalPrice: 399.99,
    image: mensJacket1,
    category: "fashion",
    subcategory: "mens-clothing",
    brand: "StyleCraft",
    rating: 4.8,
    reviewCount: 124,
    colors: ["Black", "Brown", "Dark Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["premium", "leather", "winter", "casual"],
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Classic Cotton Shirt",
    description: "Comfortable cotton shirt perfect for office and casual wear",
    price: 49.99,
    image: "/src/assets/products/mens-shirt-1.jpg",
    category: "fashion",
    subcategory: "mens-clothing",
    brand: "ComfortWear",
    rating: 4.5,
    reviewCount: 89,
    colors: ["White", "Blue", "Light Blue", "Grey"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["cotton", "casual", "office", "comfortable"],
    inStock: true,
  },
  {
    id: "3",
    name: "Slim Fit Jeans",
    description: "Modern slim fit denim jeans with stretch fabric for comfort",
    price: 79.99,
    image: "/src/assets/products/mens-jeans-1.jpg",
    category: "fashion",
    subcategory: "mens-clothing",
    brand: "DenimCo",
    rating: 4.6,
    reviewCount: 156,
    colors: ["Dark Blue", "Light Blue", "Black"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    tags: ["denim", "slim-fit", "stretch", "casual"],
    inStock: true,
  },
  // Women's Clothing
  {
    id: "4",
    name: "Designer Handbag",
    description: "Elegant designer handbag made with premium materials",
    price: 199.99,
    originalPrice: 299.99,
    image: womensBag1,
    category: "accessories",
    subcategory: "bags",
    brand: "LuxeBags",
    rating: 4.9,
    reviewCount: 203,
    colors: ["Cream", "Black", "Brown", "Red"],
    tags: ["designer", "luxury", "premium", "handbag"],
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "Elegant Evening Dress",
    description: "Sophisticated evening dress perfect for special occasions",
    price: 149.99,
    image: "/src/assets/products/womens-dress-1.jpg",
    category: "fashion",
    subcategory: "womens-clothing",
    brand: "ElegantStyle",
    rating: 4.7,
    reviewCount: 92,
    colors: ["Black", "Navy", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["elegant", "evening", "formal", "dress"],
    inStock: true,
  },
  // Footwear
  {
    id: "6",
    name: "Premium Sneakers",
    description: "Comfortable premium sneakers with modern design and cushioning",
    price: 129.99,
    image: mensSneakers1,
    category: "footwear",
    subcategory: "mens-shoes",
    brand: "SportLux",
    rating: 4.8,
    reviewCount: 267,
    colors: ["White", "Black", "Grey", "Navy"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    tags: ["sneakers", "comfortable", "athletic", "casual"],
    inStock: true,
    featured: true,
  },
  // More products to reach 30+ per category...
  {
    id: "7",
    name: "Wool Blend Coat",
    description: "Warm wool blend coat for winter season",
    price: 249.99,
    image: "/src/assets/products/mens-coat-1.jpg",
    category: "fashion",
    subcategory: "mens-clothing",
    brand: "WinterWear",
    rating: 4.6,
    reviewCount: 78,
    colors: ["Grey", "Black", "Navy"],
    sizes: ["M", "L", "XL"],
    tags: ["wool", "winter", "coat", "warm"],
    inStock: true,
  },
  {
    id: "8",
    name: "Casual T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear",
    price: 24.99,
    image: "/src/assets/products/mens-tshirt-1.jpg",
    category: "fashion",
    subcategory: "mens-clothing",
    brand: "BasicWear",
    rating: 4.4,
    reviewCount: 145,
    colors: ["White", "Black", "Grey", "Navy", "Red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["cotton", "casual", "basic", "comfortable"],
    inStock: true,
  },
];

// Generate more products for each category
const generateMoreProducts = () => {
  const moreProducts: Product[] = [];
  const basePrice = [29.99, 49.99, 79.99, 99.99, 149.99, 199.99, 249.99];
  const brands = ["StyleCraft", "ComfortWear", "LuxeBrand", "ModernStyle", "ClassicWear"];
  
  categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      for (let i = 0; i < 30; i++) {
        const productId = `${category.id}-${subcategory.id}-${i + 1}`;
        const price = basePrice[Math.floor(Math.random() * basePrice.length)];
        
        moreProducts.push({
          id: productId,
          name: `${subcategory.name} Item ${i + 1}`,
          description: `High-quality ${subcategory.name.toLowerCase()} with premium materials and modern design`,
          price: price,
          originalPrice: Math.random() > 0.7 ? price * 1.3 : undefined,
          image: `https://images.unsplash.com/photo-${1440000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=400&fit=crop&auto=format`,
          category: category.id,
          subcategory: subcategory.id,
          brand: brands[Math.floor(Math.random() * brands.length)],
          rating: 4.0 + Math.random() * 1.0,
          reviewCount: Math.floor(Math.random() * 200) + 10,
          colors: ["Black", "White", "Grey", "Navy"],
          sizes: ["S", "M", "L", "XL"],
          tags: ["quality", "modern", "style"],
          inStock: Math.random() > 0.1,
          featured: Math.random() > 0.8,
        });
      }
    });
  });
  
  return moreProducts;
};

export const allProducts = [...products, ...generateMoreProducts()];