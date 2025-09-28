import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  rating: number;
  inStock: boolean;
}

export default function Wishlist() {
  const { toast } = useToast();
  
  // Mock wishlist data - in real app this would come from context/database
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      name: "Premium Leather Jacket",
      price: 299.99,
      originalPrice: 399.99,
      image: "/placeholder.svg",
      brand: "StyleCraft Premium",
      rating: 4.8,
      inStock: true
    },
    {
      id: "2",
      name: "Designer Handbag Collection", 
      price: 199.99,
      originalPrice: 299.99,
      image: "/placeholder.svg",
      brand: "LuxeBags Elite",
      rating: 4.9,
      inStock: true
    },
    {
      id: "3",
      name: "Traditional Silk Saree",
      price: 179.99,
      image: "/placeholder.svg", 
      brand: "Heritage Weaves",
      rating: 4.7,
      inStock: false
    }
  ]);

  const removeFromWishlist = (id: string) => {
    const item = wishlistItems.find(item => item.id === id);
    setWishlistItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Removed from wishlist",
      description: `${item?.name} has been removed from your wishlist.`
    });
  };

  const addToCart = (item: WishlistItem) => {
    if (!item.inStock) {
      toast({
        title: "Out of stock",
        description: "This item is currently out of stock.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`
    });
  };

  const moveAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    if (inStockItems.length === 0) {
      toast({
        title: "No items available",
        description: "All items in your wishlist are currently out of stock.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Items added to cart",
      description: `${inStockItems.length} items have been added to your cart.`
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-20">
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
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold">My Wishlist ({wishlistItems.length} items)</h1>
          </div>
          
          {wishlistItems.some(item => item.inStock) && (
            <Button onClick={moveAllToCart} className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Move All to Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{item.brand}</p>
                  <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">₹{item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <>
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{item.originalPrice.toFixed(2)}
                        </span>
                        <Badge variant="destructive" className="text-xs">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                        </Badge>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(item.rating) ? "★" : "☆"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({item.rating})</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                <Button 
                  className="w-full" 
                  onClick={() => addToCart(item)}
                  disabled={!item.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Link to={`/product/${item.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}