import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, 
  Minus, Plus, Share, ChevronLeft, ChevronRight 
} from "lucide-react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { allProducts } from "@/data/products";

const ProductDetail = () => {
  const { productId } = useParams();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = allProducts.find(p => p.id === productId);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(p => p.id !== product.id && p.subcategory === product.subcategory)
      .slice(0, 4);
  }, [product]);

  const discountPercentage = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const images = product?.images || [product?.image].filter(Boolean) || [];

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link to="/" className="text-gold hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-gold">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link to={`/category/${product.category}`} className="text-muted-foreground hover:text-gold">
              {product.category}
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to={`/category/${product.category}/${product.subcategory}`} className="text-muted-foreground hover:text-gold">
              {product.subcategory}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-surface rounded-lg overflow-hidden group">
              <img
                src={images[currentImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop';
                }}
              />
              
              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discountPercentage > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    -{discountPercentage}%
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="bg-gold text-gold-foreground">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 bg-surface rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? 'border-gold' : 'border-border hover:border-gold/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=80&h=80&fit=crop';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-gold text-gold' 
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-success text-white">
                  Save {discountPercentage}%
                </Badge>
              )}
            </div>

            <Separator />

            {/* Product Description */}
            <div>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">
                  Color: <span className="font-normal text-muted-foreground">{selectedColor || "Select a color"}</span>
                </h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color 
                          ? 'border-gold shadow-glow' 
                          : 'border-border hover:border-gold/50'
                      }`}
                      style={{ 
                        backgroundColor: color.toLowerCase() === 'black' ? '#000' : 
                                       color.toLowerCase() === 'white' ? '#fff' :
                                       color.toLowerCase() === 'grey' ? '#9ca3af' :
                                       color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                       color.toLowerCase() === 'brown' ? '#92400e' :
                                       color.toLowerCase() === 'red' ? '#dc2626' :
                                       color.toLowerCase() === 'blue' ? '#2563eb' :
                                       '#6b7280'
                      }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">
                  Size: <span className="font-normal text-muted-foreground">{selectedSize || "Select a size"}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md transition-all ${
                        selectedSize === size
                          ? 'border-gold bg-gold text-gold-foreground'
                          : 'border-border hover:border-gold text-foreground'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-border rounded-md">
                  <button
                    className="p-2 hover:bg-surface transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    className="p-2 hover:bg-surface transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  variant="cart"
                  className="flex-1"
                  disabled={!product.inStock}
                  onClick={() => console.log("Add to cart:", { product, quantity, selectedColor, selectedSize })}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="wishlist"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="buy" className="w-full" disabled={!product.inStock}>
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <Card className="bg-surface/50 border-border">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-gold" />
                    <span className="text-sm text-foreground">Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gold" />
                    <span className="text-sm text-foreground">Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="h-4 w-4 text-gold" />
                    <span className="text-sm text-foreground">Easy Returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground leading-relaxed">
                      {product.description}
                    </p>
                    <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Features</h3>
                    <ul className="space-y-2">
                      {product.tags.map((tag, index) => (
                        <li key={index} className="text-muted-foreground">
                          • {tag.charAt(0).toUpperCase() + tag.slice(1)} quality materials
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Product Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Brand:</span>
                          <span className="text-foreground">{product.brand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Category:</span>
                          <span className="text-foreground">{product.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subcategory:</span>
                          <span className="text-foreground">{product.subcategory}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Available Options</h4>
                      <div className="space-y-2">
                        {product.colors && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Colors:</span>
                            <span className="text-foreground">{product.colors.join(", ")}</span>
                          </div>
                        )}
                        {product.sizes && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Sizes:</span>
                            <span className="text-foreground">{product.sizes.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <div className="flex items-center justify-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 ${
                              i < Math.floor(product.rating) 
                                ? 'fill-gold text-gold' 
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-2xl font-bold text-foreground ml-4">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      Based on {product.reviewCount} reviews
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={(product) => console.log("Add to cart:", product)}
                  onAddToWishlist={(product) => console.log("Add to wishlist:", product)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;