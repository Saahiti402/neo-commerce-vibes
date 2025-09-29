import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

interface CartItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  original_price?: number;
  image_url: string;
  quantity: number;
  selected_color?: string;
  selected_size?: string;
  brand: string;
}

interface WishlistItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  original_price?: number;
  image_url: string;
  brand: string;
  rating: number;
  in_stock: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  user: User | null;
  loading: boolean;
  addToCart: (productId: string, quantity?: number, selectedColor?: string, selectedSize?: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateCartQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (itemId: string) => Promise<void>;
  moveToWishlist: (cartItemId: string) => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCartItems(session.user.id);
        fetchWishlistItems(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchCartItems(session.user.id);
          fetchWishlistItems(session.user.id);
        } else {
          setCartItems([]);
          setWishlistItems([]);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchCartItems = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          selected_color,
          selected_size,
          products (
            name,
            price,
            original_price,
            image_url,
            brand
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;

      const formattedItems: CartItem[] = data.map(item => ({
        id: item.id,
        product_id: item.product_id,
        name: item.products.name,
        price: Number(item.products.price),
        original_price: item.products.original_price ? Number(item.products.original_price) : undefined,
        image_url: item.products.image_url,
        quantity: item.quantity,
        selected_color: item.selected_color,
        selected_size: item.selected_size,
        brand: item.products.brand,
      }));

      setCartItems(formattedItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const fetchWishlistItems = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select(`
          id,
          product_id,
          products (
            name,
            price,
            original_price,
            image_url,
            brand,
            rating,
            in_stock
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;

      const formattedItems: WishlistItem[] = data.map(item => ({
        id: item.id,
        product_id: item.product_id,
        name: item.products.name,
        price: Number(item.products.price),
        original_price: item.products.original_price ? Number(item.products.original_price) : undefined,
        image_url: item.products.image_url,
        brand: item.products.brand,
        rating: Number(item.products.rating),
        in_stock: item.products.in_stock,
      }));

      setWishlistItems(formattedItems);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  const addToCart = async (productId: string, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to add items to cart.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: user.id,
          product_id: productId,
          quantity,
          selected_color: selectedColor,
          selected_size: selectedSize,
        }, {
          onConflict: 'user_id,product_id,selected_color,selected_size'
        });

      if (error) throw error;

      await fetchCartItems(user.id);
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart.",
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      await fetchCartItems(user.id);
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartQuantity = async (itemId: string, quantity: number) => {
    if (!user || quantity < 1) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;

      await fetchCartItems(user.id);
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const addToWishlist = async (productId: string) => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to add items to wishlist.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          product_id: productId,
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already in wishlist",
            description: "This item is already in your wishlist.",
          });
          return;
        }
        throw error;
      }

      await fetchWishlistItems(user.id);
      toast({
        title: "Added to wishlist",
        description: "Item has been added to your wishlist.",
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add item to wishlist.",
        variant: "destructive",
      });
    }
  };

  const removeFromWishlist = async (itemId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      await fetchWishlistItems(user.id);
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const moveToWishlist = async (cartItemId: string) => {
    if (!user) return;

    try {
      // Get cart item details
      const cartItem = cartItems.find(item => item.id === cartItemId);
      if (!cartItem) return;

      // Add to wishlist
      await addToWishlist(cartItem.product_id);
      
      // Remove from cart
      await removeFromCart(cartItemId);

      toast({
        title: "Moved to wishlist",
        description: "Item has been moved to your wishlist.",
      });
    } catch (error) {
      console.error('Error moving to wishlist:', error);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value: CartContextType = {
    cartItems,
    wishlistItems,
    user,
    loading,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    moveToWishlist,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};