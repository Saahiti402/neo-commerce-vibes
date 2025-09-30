import React from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent } from "@/components/ui/card";
import { allProducts, categories } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import heroBanner from "@/assets/hero-banner.jpg";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react";

const Index = () => {
  const { addToCart, addToWishlist, user } = useCart();

  const featuredProducts = allProducts.filter(product => product.featured).slice(0, 8);

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);
  };

  const handleAddToWishlist = async (productId: string) => {
    await addToWishlist(productId);
  };

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over ₹4,000"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Customer support available 24/7"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="h-[500px] bg-gradient-hero overflow-hidden">
          <img
            src={heroBanner}
            alt="Hero Banner"
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=500&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-6 px-4">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground animate-fade-in">
                  Discover Your Style
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in">
                  Premium fashion and lifestyle products
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                {!user && (
                  <Button variant="cart" size="xl" asChild>
                    <Link to="/auth">
                      Login to Shop <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                )}
                <Button variant="outline" size="xl" asChild>
                  <Link to="/category/fashion">
                    Explore Fashion
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our wide range of premium products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card 
                key={category.id} 
                className="group relative overflow-hidden bg-gradient-surface border-border hover:shadow-card transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-gold-foreground">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.subcategories.length} subcategories
                    </p>
                  </div>
                  
                  <Button variant="category" className="w-full" asChild>
                    <Link to={`/category/${category.id}`}>
                      Explore {category.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-surface/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground">
              Handpicked premium items just for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product.id)}
                onAddToWishlist={() => handleAddToWishlist(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-lg hover:bg-surface/50 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="h-6 w-6 text-gold-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-gold-foreground font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold text-foreground">EliteStore</span>
              </div>
              <p className="text-muted-foreground">
                Your premium destination for fashion, footwear, and accessories.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="block text-muted-foreground hover:text-gold transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Customer Service</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Contact Us
                </a>
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Shipping Info
                </a>
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Returns
                </a>
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Size Guide
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  About Us
                </a>
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Careers
                </a>
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 EliteStore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="h-[500px] bg-gradient-hero overflow-hidden">
          <img
            src={heroBanner}
            alt="Hero Banner"
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=500&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-6 px-4">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground animate-fade-in">
                  Discover Your Style
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in">
                  Premium fashion and lifestyle products
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Button variant="cart" size="xl" asChild>
                  <Link to="/category/fashion">
                    Shop Fashion <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/category/footwear">
                    Explore Footwear
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our wide range of premium products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card 
                key={category.id} 
                className="group relative overflow-hidden bg-gradient-surface border-border hover:shadow-card transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-gold-foreground">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.subcategories.length} subcategories
                    </p>
                  </div>
                  
                  <Button variant="category" className="w-full" asChild>
                    <Link to={`/category/${category.id}`}>
                      Explore {category.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-surface/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground">
              Handpicked premium items just for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-lg hover:bg-surface/50 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="h-6 w-6 text-gold-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-gold-foreground font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold text-foreground">EliteStore</span>
              </div>
              <p className="text-muted-foreground">
                Your premium destination for fashion, footwear, and accessories.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="block text-muted-foreground hover:text-gold transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Customer Service</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Contact Us
                </a>
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Shipping Info
                </a>
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Returns
                </a>
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Size Guide
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  About Us
                </a>
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Careers
                </a>
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 EliteStore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;