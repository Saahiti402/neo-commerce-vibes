import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Header } from "@/components/Header";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, addToCart, user } = useCart();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Heart className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold mb-4">Please login to view your wishlist</h1>
            <p className="text-muted-foreground mb-8">You need to be logged in to manage your wishlist.</p>
            <Link to="/auth">
              <Button size="lg" className="animate-pulse">
                Login to Continue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Heart className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8">Save items you love for later by clicking the heart icon.</p>
            <Link to="/">
              <Button size="lg" className="animate-pulse">
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Heart className="h-4 w-4" />
            <span>Back to Store</span>
          </Link>
        </div>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-gold fill-gold" />
            <h1 className="text-3xl font-bold">My Wishlist ({wishlistItems.length} items)</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => {
            const discountPercentage = item.original_price 
              ? Math.round(((item.original_price - item.price) / item.original_price) * 100)
              : 0;
            
            return (
              <Card key={item.id} className="group relative overflow-hidden hover:shadow-card transition-all duration-300 border-border">
                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                {/* Product Image */}
                <div className="relative overflow-hidden bg-surface">
                  <Link to={`/product/${item.product_id}`}>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop';
                      }}
                    />
                  </Link>

                  {/* Badges */}
                  {discountPercentage > 0 && (
                    <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                      -{discountPercentage}%
                    </Badge>
                  )}
                  {!item.in_stock && (
                    <Badge className="absolute bottom-2 left-2 bg-muted text-muted-foreground">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                    <Link to={`/product/${item.product_id}`}>
                      <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(item.rating) 
                              ? 'fill-gold text-gold' 
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({item.rating.toFixed(1)})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">
                        ₹{item.price.toFixed(2)}
                      </span>
                      {item.original_price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{item.original_price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                  <Button 
                    className="w-full" 
                    onClick={() => addToCart(item.product_id)}
                    disabled={!item.in_stock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {item.in_stock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Link to={`/product/${item.product_id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
