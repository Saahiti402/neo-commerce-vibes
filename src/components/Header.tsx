import { useState } from "react";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/products";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-gold-foreground font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-foreground">EliteStore</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-surface border-border focus:border-gold transition-colors"
              />
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-gold text-gold-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-gold text-gold-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-surface border-border"
            />
          </form>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`border-t border-border ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 py-3">
            {categories.map((category) => (
              <div key={category.id} className="relative group">
                <Link
                  to={`/category/${category.id}`}
                  className="flex items-center space-x-1 py-2 text-foreground hover:text-gold transition-colors duration-200"
                >
                  <span className="font-medium">{category.name}</span>
                </Link>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 w-80 bg-popover border border-border rounded-lg shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-3">{category.name}</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="space-y-2">
                          <Link
                            to={`/category/${category.id}/${subcategory.id}`}
                            className="font-medium text-foreground hover:text-gold transition-colors duration-200 block"
                          >
                            {subcategory.name}
                          </Link>
                          {subcategory.subSubcategories && (
                            <div className="pl-3 space-y-1">
                              {subcategory.subSubcategories.slice(0, 4).map((subSubcategory) => (
                                <Link
                                  key={subSubcategory.id}
                                  to={`/category/${category.id}/${subcategory.id}?filter=${subSubcategory.id}`}
                                  className="block text-sm text-muted-foreground hover:text-gold transition-colors duration-200 py-1"
                                >
                                  {subSubcategory.name}
                                </Link>
                              ))}
                              {subcategory.subSubcategories.length > 4 && (
                                <Link
                                  to={`/category/${category.id}/${subcategory.id}`}
                                  className="block text-sm text-gold hover:underline py-1"
                                >
                                  +{subcategory.subSubcategories.length - 4} more
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};