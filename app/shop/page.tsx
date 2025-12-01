"use client"

import { useState, useMemo } from "react"
import { Heart, ShoppingCart, Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/lib/redux/slices/wishlistSlice"
import { setFilters } from "@/lib/redux/slices/productsSlice"
import { Navbar } from "@/components/navbar"
import { MOCK_PRODUCTS, CATEGORIES, BRANDS } from "@/lib/mock-data"

export default function ShopPage() {
  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.products.filters)
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Filter and search products
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !filters.category || product.category === filters.category
      const matchesBrand = !filters.brand || product.brand === filters.brand
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      const matchesStock = filters.inStock === null || product.inStock === filters.inStock

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock
    })
  }, [searchQuery, filters])

  const isWishlisted = (productId: string) => {
    return wishlistItems.some((item) => item.productId === productId)
  }

  const handleAddToCart = (product: (typeof MOCK_PRODUCTS)[0]) => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      }),
    )
  }

  const handleToggleWishlist = (product: (typeof MOCK_PRODUCTS)[0]) => {
    if (isWishlisted(product.id)) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(
        addToWishlist({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          addedAt: Date.now(),
        }),
      )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Medicine & Health Products</h1>
          <p className="text-muted-foreground">Browse our wide selection of authentic medicines and health products</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
            <div className="sticky top-20 space-y-6">
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              <Card className="p-6 border-border space-y-6">
                {/* Search */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-card border-border"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Category</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => dispatch(setFilters({ category: "" }))}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        !filters.category
                          ? "bg-primary/20 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      All Categories
                    </button>
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => dispatch(setFilters({ category }))}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          filters.category === category
                            ? "bg-primary/20 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Brand</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => dispatch(setFilters({ brand: "" }))}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        !filters.brand
                          ? "bg-primary/20 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      All Brands
                    </button>
                    {BRANDS.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => dispatch(setFilters({ brand }))}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          filters.brand === brand
                            ? "bg-primary/20 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">L.E</span>
                      <Input
                        type="number"
                        min="0"
                        value={filters.priceRange[0]}
                        onChange={(e) =>
                          dispatch(setFilters({ priceRange: [Number.parseInt(e.target.value), filters.priceRange[1]] }))
                        }
                        className="h-8 bg-card border-border text-sm"
                        placeholder="Min"
                      />
                      <span className="text-muted-foreground">-</span>
                      <Input
                        type="number"
                        max="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          dispatch(setFilters({ priceRange: [filters.priceRange[0], Number.parseInt(e.target.value)] }))
                        }
                        className="h-8 bg-card border-border text-sm"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Availability</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => dispatch(setFilters({ inStock: null }))}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        filters.inStock === null
                          ? "bg-primary/20 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      All Products
                    </button>
                    <button
                      onClick={() => dispatch(setFilters({ inStock: true }))}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        filters.inStock === true
                          ? "bg-primary/20 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      In Stock
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filter Toggle and Results Info */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <Card className="p-12 text-center border-border">
                <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    dispatch(
                      setFilters({
                        category: "",
                        brand: "",
                        priceRange: [0, 1000],
                        inStock: null,
                      }),
                    )
                  }}
                  variant="outline"
                  className="border-border"
                >
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={isWishlisted(product.id)}
                    onAddToCart={() => handleAddToCart(product)}
                    onToggleWishlist={() => handleToggleWishlist(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({
  product,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
}: {
  product: (typeof MOCK_PRODUCTS)[0]
  isWishlisted: boolean
  onAddToCart: () => void
  onToggleWishlist: () => void
}) {
  return (
    <Card className="overflow-hidden border-border hover:shadow-lg transition-all group">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted aspect-square">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={onToggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-card/90 hover:bg-card transition-colors shadow-md"
        >
          <Heart
            className={`h-5 w-5 ${isWishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
          />
        </button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-xs font-semibold text-primary uppercase">{product.category}</p>
            <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">{product.brand}</span>
          </div>
          <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? "⭐" : "☆"}`}>
                {i < Math.floor(product.rating) ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-lg font-bold text-foreground"> {product.price.toFixed(2)} L.E</span>
          <button
            onClick={onAddToCart}
            disabled={!product.inStock}
            className={`p-2 rounded-lg transition-colors ${
              product.inStock
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Card>
  )
}
