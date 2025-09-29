import { Product, Category } from "@/types/product";

// Import product images
import mensJacket1 from "@/assets/products/mens-jacket-1.jpg";
import womensBag1 from "@/assets/products/womens-bag-1.jpg";
import mensSneakers1 from "@/assets/products/mens-sneakers-1.jpg";
import womensTraditionalSaree from "@/assets/products/womens-traditional-saree.jpg";
import mensCasualTshirt from "@/assets/products/mens-casual-tshirt.jpg";
import womensWesternJeans from "@/assets/products/womens-western-jeans.jpg";
import kidsCasualDress from "@/assets/products/kids-casual-dress.jpg";
import mensFormalSuit from "@/assets/products/mens-formal-suit.jpg";
import womensHeels from "@/assets/products/womens-heels.jpg";
import mensLuxuryWatch from "@/assets/products/mens-luxury-watch.jpg";
import womensJewelryNecklace from "@/assets/products/womens-jewelry-necklace.jpg";

// Import new realistic product images
import mensTraditionalKurta from "@/assets/products/mens-traditional-kurta.jpg";
import mensFormalBlazer from "@/assets/products/mens-formal-blazer.jpg";
import womensTraditionalLehenga from "@/assets/products/womens-traditional-lehenga.jpg";
import womensWesternTop from "@/assets/products/womens-western-top.jpg";
import kidsCasualTshirt from "@/assets/products/kids-casual-tshirt.jpg";
import mensFormalShoes from "@/assets/products/mens-formal-shoes.jpg";
import womensSandals from "@/assets/products/womens-sandals.jpg";
import womensLeatherHandbag from "@/assets/products/womens-leather-handbag.jpg";
import womensGoldEarrings from "@/assets/products/womens-gold-earrings.jpg";
import smartphoneBlack from "@/assets/products/smartphone-black.jpg";

export const categories: Category[] = [
  {
    id: "fashion",
    name: "Fashion",
    subcategories: [
      { 
        id: "mens-clothing", 
        name: "Men's Clothing", 
        parentCategory: "fashion",
        subSubcategories: [
          { id: "mens-traditional", name: "Traditional Wear", parentSubcategory: "mens-clothing" },
          { id: "mens-western", name: "Western Wear", parentSubcategory: "mens-clothing" },
          { id: "mens-casual", name: "Casual Wear", parentSubcategory: "mens-clothing" },
          { id: "mens-formal", name: "Formal Wear", parentSubcategory: "mens-clothing" },
          { id: "mens-ethnic", name: "Ethnic Wear", parentSubcategory: "mens-clothing" },
        ]
      },
      { 
        id: "womens-clothing", 
        name: "Women's Clothing", 
        parentCategory: "fashion",
        subSubcategories: [
          { id: "womens-traditional", name: "Traditional Wear", parentSubcategory: "womens-clothing" },
          { id: "womens-western", name: "Western Wear", parentSubcategory: "womens-clothing" },
          { id: "womens-casual", name: "Casual Wear", parentSubcategory: "womens-clothing" },
          { id: "womens-formal", name: "Formal Wear", parentSubcategory: "womens-clothing" },
          { id: "womens-ethnic", name: "Ethnic Wear", parentSubcategory: "womens-clothing" },
        ]
      },
      { 
        id: "kids-clothing", 
        name: "Kids' Clothing", 
        parentCategory: "fashion",
        subSubcategories: [
          { id: "kids-traditional", name: "Traditional Wear", parentSubcategory: "kids-clothing" },
          { id: "kids-western", name: "Western Wear", parentSubcategory: "kids-clothing" },
          { id: "kids-casual", name: "Casual Wear", parentSubcategory: "kids-clothing" },
          { id: "kids-formal", name: "Formal Wear", parentSubcategory: "kids-clothing" },
        ]
      },
    ],
  },
  {
    id: "footwear",
    name: "Footwear",
    subcategories: [
      { 
        id: "mens-shoes", 
        name: "Men's Shoes", 
        parentCategory: "footwear",
        subSubcategories: [
          { id: "mens-formal-shoes", name: "Formal Shoes", parentSubcategory: "mens-shoes" },
          { id: "mens-casual-shoes", name: "Casual Shoes", parentSubcategory: "mens-shoes" },
          { id: "mens-sports-shoes", name: "Sports Shoes", parentSubcategory: "mens-shoes" },
          { id: "mens-sandals", name: "Sandals & Slippers", parentSubcategory: "mens-shoes" },
          { id: "mens-boots", name: "Boots", parentSubcategory: "mens-shoes" },
        ]
      },
      { 
        id: "womens-shoes", 
        name: "Women's Shoes", 
        parentCategory: "footwear",
        subSubcategories: [
          { id: "womens-heels", name: "Heels", parentSubcategory: "womens-shoes" },
          { id: "womens-flats", name: "Flats", parentSubcategory: "womens-shoes" },
          { id: "womens-sneakers", name: "Sneakers", parentSubcategory: "womens-shoes" },
          { id: "womens-sandals", name: "Sandals", parentSubcategory: "womens-shoes" },
          { id: "womens-boots", name: "Boots", parentSubcategory: "womens-shoes" },
        ]
      },
      { 
        id: "kids-shoes", 
        name: "Kids' Shoes", 
        parentCategory: "footwear",
        subSubcategories: [
          { id: "kids-school-shoes", name: "School Shoes", parentSubcategory: "kids-shoes" },
          { id: "kids-sports-shoes", name: "Sports Shoes", parentSubcategory: "kids-shoes" },
          { id: "kids-casual-shoes", name: "Casual Shoes", parentSubcategory: "kids-shoes" },
          { id: "kids-sandals", name: "Sandals", parentSubcategory: "kids-shoes" },
        ]
      },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    subcategories: [
      { 
        id: "bags", 
        name: "Bags & Luggage", 
        parentCategory: "accessories",
        subSubcategories: [
          { id: "handbags", name: "Handbags", parentSubcategory: "bags" },
          { id: "backpacks", name: "Backpacks", parentSubcategory: "bags" },
          { id: "travel-bags", name: "Travel Bags", parentSubcategory: "bags" },
          { id: "laptop-bags", name: "Laptop Bags", parentSubcategory: "bags" },
          { id: "wallets", name: "Wallets", parentSubcategory: "bags" },
        ]
      },
      { 
        id: "jewelry", 
        name: "Jewelry", 
        parentCategory: "accessories",
        subSubcategories: [
          { id: "necklaces", name: "Necklaces", parentSubcategory: "jewelry" },
          { id: "earrings", name: "Earrings", parentSubcategory: "jewelry" },
          { id: "rings", name: "Rings", parentSubcategory: "jewelry" },
          { id: "bracelets", name: "Bracelets", parentSubcategory: "jewelry" },
          { id: "jewelry-sets", name: "Jewelry Sets", parentSubcategory: "jewelry" },
        ]
      },
      { 
        id: "watches", 
        name: "Watches", 
        parentCategory: "accessories",
        subSubcategories: [
          { id: "mens-watches", name: "Men's Watches", parentSubcategory: "watches" },
          { id: "womens-watches", name: "Women's Watches", parentSubcategory: "watches" },
          { id: "smart-watches", name: "Smart Watches", parentSubcategory: "watches" },
          { id: "luxury-watches", name: "Luxury Watches", parentSubcategory: "watches" },
          { id: "kids-watches", name: "Kids' Watches", parentSubcategory: "watches" },
        ]
      },
      { 
        id: "eyewear", 
        name: "Eyewear", 
        parentCategory: "accessories",
        subSubcategories: [
          { id: "sunglasses", name: "Sunglasses", parentSubcategory: "eyewear" },
          { id: "prescription-glasses", name: "Prescription Glasses", parentSubcategory: "eyewear" },
          { id: "reading-glasses", name: "Reading Glasses", parentSubcategory: "eyewear" },
          { id: "contact-lenses", name: "Contact Lenses", parentSubcategory: "eyewear" },
        ]
      },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    subcategories: [
      { 
        id: "mobile-phones", 
        name: "Mobile Phones", 
        parentCategory: "electronics",
        subSubcategories: [
          { id: "smartphones", name: "Smartphones", parentSubcategory: "mobile-phones" },
          { id: "feature-phones", name: "Feature Phones", parentSubcategory: "mobile-phones" },
          { id: "phone-accessories", name: "Phone Accessories", parentSubcategory: "mobile-phones" },
        ]
      },
      { 
        id: "laptops", 
        name: "Laptops & Computers", 
        parentCategory: "electronics",
        subSubcategories: [
          { id: "laptops-notebooks", name: "Laptops", parentSubcategory: "laptops" },
          { id: "desktop-computers", name: "Desktop Computers", parentSubcategory: "laptops" },
          { id: "tablets", name: "Tablets", parentSubcategory: "laptops" },
          { id: "computer-accessories", name: "Computer Accessories", parentSubcategory: "laptops" },
        ]
      },
      { 
        id: "audio", 
        name: "Audio & Headphones", 
        parentCategory: "electronics",
        subSubcategories: [
          { id: "headphones", name: "Headphones", parentSubcategory: "audio" },
          { id: "earphones", name: "Earphones", parentSubcategory: "audio" },
          { id: "speakers", name: "Speakers", parentSubcategory: "audio" },
          { id: "sound-systems", name: "Sound Systems", parentSubcategory: "audio" },
        ]
      },
    ],
  },
];

// Featured products with high-quality images
export const featuredProducts: Product[] = [
  {
    id: "featured-1",
    name: "Crafted Leather Bomber Jacket",
    description: "Handcrafted genuine leather bomber jacket with premium finish, modern cut, and superior craftsmanship. Perfect for both casual and formal occasions.",
    price: 24999.99,
    originalPrice: 32999.99,
    image: mensJacket1,
    category: "fashion",
    subcategory: "mens-clothing",
    brand: "StyleCraft Premium",
    rating: 4.8,
    reviewCount: 124,
    colors: ["Black", "Brown", "Dark Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["premium", "leather", "winter", "casual", "formal"],
    inStock: true,
    featured: true,
  },
  {
    id: "featured-2",
    name: "Milano Designer Leather Handbag",
    description: "Elegant Italian designer handbag crafted with premium materials, featuring spacious compartments and sophisticated design for the modern woman.",
    price: 16499.99,
    originalPrice: 24999.99,
    image: womensBag1,
    category: "accessories",
    subcategory: "bags",
    brand: "LuxeBags Elite",
    rating: 4.9,
    reviewCount: 203,
    colors: ["Cream", "Black", "Brown", "Red"],
    tags: ["designer", "luxury", "premium", "handbag", "spacious"],
    inStock: true,
    featured: true,
  },
  {
    id: "featured-3",
    name: "Air Max Pro Sport Sneakers",
    description: "High-performance athletic sneakers with advanced cushioning technology, breathable materials, and modern design for ultimate comfort.",
    price: 10799.99,
    image: mensSneakers1,
    category: "footwear",
    subcategory: "mens-shoes",
    brand: "SportLux Pro",
    rating: 4.8,
    reviewCount: 267,
    colors: ["White", "Black", "Grey", "Navy"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    tags: ["sneakers", "athletic", "comfortable", "breathable", "cushioned"],
    inStock: true,
    featured: true,
  },
  {
    id: "featured-4",
    name: "Royal Banarasi Silk Saree",
    description: "Exquisite handwoven Banarasi silk saree with intricate golden zari patterns and vibrant colors, perfect for weddings and special occasions.",
    price: 14999.99,
    image: womensTraditionalSaree,
    category: "fashion",
    subcategory: "womens-clothing",
    brand: "Heritage Weaves",
    rating: 4.7,
    reviewCount: 89,
    colors: ["Royal Blue", "Maroon", "Golden", "Green"],
    tags: ["traditional", "silk", "handwoven", "ethnic", "festive"],
    inStock: true,
    featured: true,
  },
];

// Generate comprehensive product catalog
const generateProductCatalog = (): Product[] => {
  const products: Product[] = [...featuredProducts];
  
  // Product templates for different categories with Indian rupee pricing
  const productTemplates = {
    "mens-traditional": [
      { name: "Premium Cotton Kurta", basePrice: 3999.99, description: "Handwoven cotton kurta with elegant design and comfortable fit", brands: ["Heritage Craft", "Tradition Plus", "Ethnic Elegance"] },
      { name: "Silk Dhoti Set", basePrice: 2499.99, description: "Traditional silk dhoti with premium fabric and ethnic styling", brands: ["Traditional Craft", "Ethnic Style"] },
      { name: "Royal Wedding Sherwani", basePrice: 16499.99, description: "Luxurious sherwani with intricate embroidery for special occasions", brands: ["Royal Collection", "Wedding Couture"] },
      { name: "Designer Nehru Jacket", basePrice: 6599.99, description: "Contemporary Nehru jacket with modern cut and traditional appeal", brands: ["Classic Style", "Modern Traditional"] },
    ],
    "mens-western": [
      { name: "Premium Oxford Shirt", basePrice: 3299.99, description: "High-quality cotton Oxford shirt for formal and casual wear", brands: ["ComfortWear", "Daily Style", "Urban Fit"] },
      { name: "Stretch Denim Jeans", basePrice: 4999.99, description: "Premium stretchable denim jeans with perfect fit and comfort", brands: ["DenimCo", "Blue Label", "Flex Jeans"] },
      { name: "Organic Cotton T-Shirt", basePrice: 1699.99, description: "Soft organic cotton t-shirt in trendy colors and designs", brands: ["BasicWear", "Cotton Plus", "Comfort Zone"] },
      { name: "Tailored Chino Pants", basePrice: 4099.99, description: "Stylish tailored chinos perfect for smart casual occasions", brands: ["Urban Style", "Casual Fit", "Modern Wear"] },
    ],
    "mens-casual": [
      { name: "Premium Polo Shirt", basePrice: 2899.99, description: "Classic polo shirt with moisture-wicking fabric for active wear", brands: ["Polo Club", "Casual Classic", "Sport Style"] },
      { name: "Multi-Pocket Cargo Pants", basePrice: 3699.99, description: "Durable cargo pants with multiple pockets and comfortable fit", brands: ["Adventure Wear", "Utility Style", "Outdoor Gear"] },
      { name: "Fleece Pullover Hoodie", basePrice: 4599.99, description: "Warm fleece hoodie perfect for cool weather and casual outings", brands: ["Comfort Zone", "Street Style", "Urban Casual"] },
      { name: "Performance Sports Shorts", basePrice: 2099.99, description: "Breathable athletic shorts with moisture-wicking technology", brands: ["Summer Wear", "Cool Comfort", "Active Style"] },
    ],
    "mens-formal": [
      { name: "Executive Business Suit", basePrice: 24999.99, description: "Professional business suit with perfect tailoring and premium fabric", brands: ["Executive Style", "Business Elite", "Corporate Couture"] },
      { name: "Premium Dress Shirt", basePrice: 4099.99, description: "Crisp premium cotton dress shirt for formal occasions", brands: ["Formal Plus", "Executive Shirt", "Business Style"] },
      { name: "Designer Blazer", basePrice: 12499.99, description: "Elegant designer blazer for business meetings and formal events", brands: ["Professional Wear", "Business Class", "Executive Style"] },
      { name: "Tailored Formal Trousers", basePrice: 5799.99, description: "Well-tailored formal trousers with perfect fit", brands: ["Formal Fit", "Business Wear", "Office Style"] },
    ],
    "womens-traditional": [
      { name: "Handloom Silk Saree", basePrice: 7499.99, description: "Beautiful handloom silk saree with traditional motifs", brands: ["Heritage Weaves", "Traditional Silk", "Ethnic Collection"] },
      { name: "Designer Salwar Kameez", basePrice: 5799.99, description: "Elegant salwar kameez set with embroidered dupatta", brands: ["Ethnic Elegance", "Traditional Wear", "Heritage Style"] },
      { name: "Bridal Lehenga Choli", basePrice: 16499.99, description: "Stunning bridal lehenga with heavy embroidery work", brands: ["Bridal Collection", "Festive Wear", "Royal Heritage"] },
      { name: "Cotton Kurti Set", basePrice: 3299.99, description: "Stylish cotton kurti with palazzo for daily traditional wear", brands: ["Daily Traditional", "Ethnic Comfort", "Modern Heritage"] },
    ],
    "womens-western": [
      { name: "Designer Denim Jeans", basePrice: 4999.99, description: "Trendy women's designer jeans with perfect fit and style", brands: ["Fashion Denim", "Style Co", "Trendy Fit"] },
      { name: "Party Cocktail Dress", basePrice: 6599.99, description: "Elegant cocktail dress perfect for parties and events", brands: ["Fashion Forward", "Style Statement", "Elegant Wear"] },
      { name: "Stylish Crop Top", basePrice: 2899.99, description: "Trendy crop top in contemporary design and premium fabric", brands: ["Modern Style", "Fashion Plus", "Trendy Tops"] },
      { name: "A-Line Midi Skirt", basePrice: 3699.99, description: "Fashionable A-line midi skirt in various colors", brands: ["Style Central", "Fashion Hub", "Trendy Wear"] },
    ],
    "womens-casual": [
      { name: "Comfortable Maxi Dress", basePrice: 4099.99, description: "Comfortable maxi dress perfect for everyday casual wear", brands: ["Casual Comfort", "Daily Style", "Easy Wear"] },
      { name: "Stretch Jeggings", basePrice: 3299.99, description: "Super comfortable jeggings with stretch fabric and perfect fit", brands: ["Comfort Fit", "Stretch Style", "Flexible Wear"] },
      { name: "Casual Top", basePrice: 29.99, description: "Relaxed fit top for casual outings", brands: ["Casual Zone", "Comfort Wear", "Relaxed Style"] },
      { name: "Cardigan", basePrice: 54.99, description: "Cozy cardigan for layering", brands: ["Comfort Layer", "Cozy Wear", "Soft Style"] },
    ],
    "kids-casual": [
      { name: "Kids T-Shirt", basePrice: 14.99, description: "Fun and colorful t-shirt for kids", brands: ["Kids Fun", "Playful Style", "Junior Wear"] },
      { name: "Kids Jeans", basePrice: 29.99, description: "Durable jeans for active kids", brands: ["Kids Denim", "Play Wear", "Junior Style"] },
      { name: "Kids Dress", basePrice: 24.99, description: "Adorable dress for little girls", brands: ["Little Princess", "Kids Fashion", "Cute Wear"] },
      { name: "Kids Shorts", basePrice: 19.99, description: "Comfortable shorts for play time", brands: ["Active Kids", "Play Comfort", "Junior Active"] },
    ],
  };

  // Generate products for each subcategory
  categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      if (subcategory.subSubcategories) {
        subcategory.subSubcategories.forEach(subSubcategory => {
          const templates = productTemplates[subSubcategory.id as keyof typeof productTemplates];
          if (templates) {
            templates.forEach((template, templateIndex) => {
              // Generate 8-10 variations of each product template
              for (let i = 0; i < 9; i++) {
                const priceVariation = Math.random() * 0.3 + 0.85; // 85% to 115% of base price
                const price = Math.round(template.basePrice * priceVariation * 100) / 100;
                const originalPrice = Math.random() > 0.6 ? Math.round(price * 1.25 * 100) / 100 : undefined;
                const rating = 3.5 + Math.random() * 1.4; // 3.5 to 4.9
                const reviewCount = Math.floor(Math.random() * 300) + 20;
                
                const productId = `${subSubcategory.id}-${templateIndex}-${i}`;
                
                products.push({
                  id: productId,
                  name: `${template.name} ${i + 1}`,
                  description: template.description,
                  price: price,
                  originalPrice: originalPrice,
                  image: getProductImage(category.id, subcategory.id, subSubcategory.id),
                  category: category.id,
                  subcategory: subcategory.id,
                  brand: template.brands[Math.floor(Math.random() * template.brands.length)],
                  rating: Math.round(rating * 10) / 10,
                  reviewCount: reviewCount,
                  colors: getColorsForCategory(category.id, subSubcategory.id),
                  sizes: getSizesForCategory(category.id, subSubcategory.id),
                  tags: getTagsForSubcategory(subSubcategory.id),
                  inStock: Math.random() > 0.05, // 95% in stock
                  featured: Math.random() > 0.85, // 15% featured
                });
              }
            });
          }
        });
      }
    });
  });

  return products;
};

// Helper functions
const getProductImage = (categoryId: string, subcategoryId: string, subSubcategoryId: string): string => {
  // Map specific products to their generated images
  const imageMap: { [key: string]: string } = {
    "mens-casual": mensCasualTshirt,
    "mens-traditional": mensTraditionalKurta,
    "mens-formal": mensFormalBlazer,
    "womens-western": womensWesternTop,
    "womens-traditional": womensTraditionalLehenga,
    "kids-casual": kidsCasualTshirt,
    "mens-formal-shoes": mensFormalShoes,
    "womens-heels": womensHeels,
    "womens-sandals": womensSandals,
    "luxury-watches": mensLuxuryWatch,
    "necklaces": womensJewelryNecklace,
    "earrings": womensGoldEarrings,
    "handbags": womensLeatherHandbag,
    "smartphones": smartphoneBlack,
  };

  if (imageMap[subSubcategoryId]) {
    return imageMap[subSubcategoryId];
  }

  // Use Unsplash for variety with category-specific images
  const imageQueries = {
    "fashion": ["fashion", "clothing", "apparel", "style", "outfit"],
    "footwear": ["shoes", "footwear", "sneakers", "boots", "sandals"],
    "accessories": ["accessories", "jewelry", "bags", "watches", "sunglasses"],
    "electronics": ["electronics", "gadgets", "technology", "devices"],
  };

  const queries = imageQueries[categoryId as keyof typeof imageQueries] || ["product"];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  const randomId = Math.floor(Math.random() * 1000) + 1;
  
  return `https://images.unsplash.com/photo-${1500000000000 + randomId * 100000}?w=400&h=400&fit=crop&auto=format&q=${randomQuery}`;
};

const getColorsForCategory = (categoryId: string, subSubcategoryId: string): string[] => {
  const colorMap: { [key: string]: string[] } = {
    "mens": ["Black", "White", "Navy", "Grey", "Brown"],
    "womens": ["Black", "White", "Red", "Pink", "Blue", "Green", "Purple"],
    "kids": ["Red", "Blue", "Pink", "Yellow", "Green", "Purple", "Orange"],
    "traditional": ["Maroon", "Gold", "Royal Blue", "Green", "Pink"],
    "formal": ["Black", "White", "Navy", "Grey", "Charcoal"],
    "casual": ["Blue", "Black", "White", "Grey", "Red"],
  };

  // Determine color set based on subcategory
  if (subSubcategoryId.includes("mens")) return colorMap["mens"];
  if (subSubcategoryId.includes("womens")) return colorMap["womens"];
  if (subSubcategoryId.includes("kids")) return colorMap["kids"];
  if (subSubcategoryId.includes("traditional")) return colorMap["traditional"];
  if (subSubcategoryId.includes("formal")) return colorMap["formal"];
  if (subSubcategoryId.includes("casual")) return colorMap["casual"];

  return colorMap["mens"]; // default
};

const getSizesForCategory = (categoryId: string, subSubcategoryId: string): string[] => {
  if (categoryId === "footwear") {
    return ["6", "7", "8", "9", "10", "11", "12"];
  }
  
  if (subSubcategoryId.includes("kids")) {
    return ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"];
  }
  
  return ["XS", "S", "M", "L", "XL", "XXL"];
};

const getTagsForSubcategory = (subSubcategoryId: string): string[] => {
  const tagMap: { [key: string]: string[] } = {
    "traditional": ["traditional", "ethnic", "cultural", "handwoven"],
    "western": ["modern", "trendy", "contemporary", "stylish"],
    "casual": ["comfortable", "relaxed", "everyday", "easy-wear"],
    "formal": ["professional", "elegant", "sophisticated", "business"],
    "luxury": ["premium", "luxury", "high-end", "exclusive"],
    "sports": ["athletic", "performance", "active", "breathable"],
  };

  // Find matching tags
  for (const [key, tags] of Object.entries(tagMap)) {
    if (subSubcategoryId.includes(key)) {
      return tags;
    }
  }

  return ["quality", "comfortable", "stylish", "durable"];
};

// Export all products
export const allProducts = generateProductCatalog();

// Export products by category for easy filtering
export const getProductsByCategory = (categoryId: string) => {
  return allProducts.filter(product => product.category === categoryId);
};

export const getProductsBySubcategory = (subcategoryId: string) => {
  return allProducts.filter(product => product.subcategory === subcategoryId);
};