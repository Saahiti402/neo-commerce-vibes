import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { allProducts, categories } from "@/data/products";
import { Product } from "@/types/product";

const CategoryPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSubSubcategories, setSelectedSubSubcategories] = useState<string[]>(
    filterParam ? [filterParam] : []
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const category = categories.find(cat => cat.id === categoryId);
  const subcategory = category?.subcategories.find(sub => sub.id === subcategoryId);

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter(product => {
      if (subcategoryId) {
        return product.subcategory === subcategoryId;
      }
      return product.category === categoryId;
    });

    // Apply sub-subcategory filter
    if (selectedSubSubcategories.length > 0) {
      // For now, we'll filter by tags since our product structure doesn't have subSubcategory field
      // In a real app, you'd add subSubcategory field to Product type
      products = products.filter(product => 
        selectedSubSubcategories.some(subSubcat => 
          product.tags.some(tag => 
            subSubcat.includes(tag) || tag.includes(subSubcat.split('-')[1] || '')
          )
        )
      );
    }

    // Apply other filters
    if (selectedBrands.length > 0) {
      products = products.filter(product => selectedBrands.includes(product.brand));
    }

    if (selectedColors.length > 0) {
      products = products.filter(product => 
        product.colors?.some(color => selectedColors.includes(color))
      );
    }

    products = products.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        products.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return products;
  }, [categoryId, subcategoryId, selectedSubSubcategories, sortBy, priceRange, selectedBrands, selectedColors]);

  const brands = useMemo(() => {
    const brandSet = new Set(
      allProducts
        .filter(product => subcategoryId ? product.subcategory === subcategoryId : product.category === categoryId)
        .map(product => product.brand)
    );
    return Array.from(brandSet);
  }, [categoryId, subcategoryId]);

  const colors = useMemo(() => {
    const colorSet = new Set(
      allProducts
        .filter(product => subcategoryId ? product.subcategory === subcategoryId : product.category === categoryId)
        .flatMap(product => product.colors || [])
    );
    return Array.from(colorSet);
  }, [categoryId, subcategoryId]);

  const pageTitle = subcategory ? subcategory.name : category?.name || "Products";
  const subSubcategories = subcategory?.subSubcategories || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">Home</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{category?.name}</span>
            {subcategory && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground font-medium">{subcategory.name}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedBrands([]);
                      setSelectedColors([]);
                      setSelectedSubSubcategories([]);
                      setPriceRange({ min: 0, max: 1000 });
                    }}
                  >
                    Clear All
                  </Button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">$0</span>
                      <div className="flex-1 h-2 bg-muted rounded-full relative">
                        <div 
                          className="absolute h-full bg-gradient-primary rounded-full"
                          style={{ width: `${(priceRange.max / 1000) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">$1000+</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-20 px-2 py-1 text-sm bg-surface border border-border rounded"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      />
                      <span className="text-muted-foreground">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-20 px-2 py-1 text-sm bg-surface border border-border rounded"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Sub-subcategories */}
                {subSubcategories.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-foreground mb-3">Categories</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {subSubcategories.map((subSubcategory) => (
                        <label key={subSubcategory.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-border"
                            checked={selectedSubSubcategories.includes(subSubcategory.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSubSubcategories(prev => [...prev, subSubcategory.id]);
                              } else {
                                setSelectedSubSubcategories(prev => prev.filter(id => id !== subSubcategory.id));
                              }
                            }}
                          />
                          <span className="text-sm text-foreground">{subSubcategory.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <Separator className="my-6" />
                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-3">Brands</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-border"
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBrands(prev => [...prev, brand]);
                            } else {
                              setSelectedBrands(prev => prev.filter(b => b !== brand));
                            }
                          }}
                        />
                        <span className="text-sm text-foreground">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Colors */}
                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-3">Colors</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColors.includes(color) 
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
                        onClick={() => {
                          if (selectedColors.includes(color)) {
                            setSelectedColors(prev => prev.filter(c => c !== color));
                          } else {
                            setSelectedColors(prev => [...prev, color]);
                          }
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {pageTitle}
                </h1>
                <p className="text-muted-foreground">
                  {filteredProducts.length} products found
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <Button
                  variant="filter"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-surface border border-border rounded-md text-foreground focus:border-gold"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedBrands.length > 0 || selectedColors.length > 0 || selectedSubSubcategories.length > 0 || priceRange.min > 0 || priceRange.max < 1000) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedSubSubcategories.map((subSubcategoryId) => {
                  const subSubcategory = subSubcategories.find(s => s.id === subSubcategoryId);
                  return (
                    <Badge key={subSubcategoryId} variant="outline" className="flex items-center gap-2">
                      {subSubcategory?.name}
                      <button
                        onClick={() => setSelectedSubSubcategories(prev => prev.filter(id => id !== subSubcategoryId))}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  );
                })}
                {selectedBrands.map((brand) => (
                  <Badge key={brand} variant="outline" className="flex items-center gap-2">
                    {brand}
                    <button
                      onClick={() => setSelectedBrands(prev => prev.filter(b => b !== brand))}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {selectedColors.map((color) => (
                  <Badge key={color} variant="outline" className="flex items-center gap-2">
                    {color}
                    <button
                      onClick={() => setSelectedColors(prev => prev.filter(c => c !== color))}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {(priceRange.min > 0 || priceRange.max < 1000) && (
                  <Badge variant="outline" className="flex items-center gap-2">
                    ${priceRange.min} - ${priceRange.max}
                    <button
                      onClick={() => setPriceRange({ min: 0, max: 1000 })}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Products Grid */}
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "space-y-4"
            }>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(product) => console.log("Add to cart:", product)}
                  onAddToWishlist={(product) => console.log("Add to wishlist:", product)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedColors([]);
                    setSelectedSubSubcategories([]);
                    setPriceRange({ min: 0, max: 1000 });
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;