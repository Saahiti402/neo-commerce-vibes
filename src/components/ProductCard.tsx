import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart, onAddToWishlist }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product);
  };

  return (
    <Card className="group relative overflow-hidden bg-card border-border hover:shadow-card transition-all duration-300 hover:scale-[1.02]">
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-surface">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop';
            }}
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
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
          {!product.inStock && (
            <Badge variant="outline" className="bg-background/80">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 hover:bg-background border border-border shadow-sm"
            onClick={handleWishlistClick}
          >
            <Heart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-gold text-gold' : 'text-foreground'}`} 
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 hover:bg-background border border-border shadow-sm"
            asChild
          >
            <Link to={`/product/${product.id}`}>
              <Eye className="h-4 w-4 text-foreground" />
            </Link>
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Brand */}
        <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground hover:text-gold transition-colors duration-200 line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-gold text-gold' 
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">Colors:</span>
            <div className="flex gap-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-border"
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
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
              )}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          variant="cart"
          className="w-full"
          disabled={!product.inStock}
          onClick={() => onAddToCart?.(product)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardContent>
    </Card>
  );
};