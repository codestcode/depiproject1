// src/pages/ShopPage.jsx
import { useState, useMemo } from "react"
import { Link } from "react-router-dom" // ← ADDED THIS!
import { Heart, ShoppingCart, Search, Filter, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../lib/redux/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "../../lib/redux/slices/wishlistSlice"
import { setFilters } from "../../lib/redux/slices/productsSlice"

export default function ShopPage() {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.products?.filters || {})
  const wishlistItems = useSelector((state) => state.wishlist?.items || [])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Read from Redux
  const products = useSelector((state) => state.products?.items || [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = !filters.category || product.category === filters.category
      const matchesBrand = !filters.brand || product.brand === filters.brand
      const matchesPrice =
        product.price >= (filters.priceRange?.[0] || 0) &&
        product.price <= (filters.priceRange?.[1] || 10000)
      const matchesStock = filters.inStock === null || product.inStock === filters.inStock

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock
    })
  }, [products, searchQuery, filters])

  const isWishlisted = (productId) => {
    return wishlistItems.some((item) => item.productId === productId)
  }

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image || "/placeholder.jpg",
      })
    )
  }

  const handleToggleWishlist = (product) => {
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
        })
      )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-12">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
            Find Your Medicine
          </h1>
          <p className="text-xl text-muted-foreground">
            Genuine products • Best prices • Delivered in 60 mins
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <Card className="p-6 border-border shadow-lg">
                {/* Search */}
                <div className="mb-8">
                  <label className="text-sm font-semibold text-foreground mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Paracetamol, Insulin..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 bg-card"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                  <h3 className="font-bold text-foreground">Category</h3>
                  <div className="space-y-2">
                    <FilterButton active={!filters.category} onClick={() => dispatch(setFilters({ category: "" }))}>
                      All Categories
                    </FilterButton>
                    {["Pain Relief", "Vitamins", "Diabetes", "Cold & Flu", "Skin Care"].map((cat) => (
                      <FilterButton
                        key={cat}
                        active={filters.category === cat}
                        onClick={() => dispatch(setFilters({ category: cat }))}
                      >
                        {cat}
                      </FilterButton>
                    ))}
                  </div>
                </div>

                {/* Stock */}
                <div className="space-y-4 mt-8">
                  <h3 className="font-bold text-foreground">Availability</h3>
                  <FilterButton active={filters.inStock === null} onClick={() => dispatch(setFilters({ inStock: null }))}>
                    All Products
                  </FilterButton>
                  <FilterButton active={filters.inStock === true} onClick={() => dispatch(setFilters({ inStock: true }))}>
                    In Stock Only
                  </FilterButton>
                </div>
              </Card>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <strong className="text-foreground">{filteredProducts.length}</strong> products
              </p>
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:bg-muted"
              >
                <Filter className="h-5 w-5" />
                Filters
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <Card className="p-16 text-center">
                <p className="text-xl text-muted-foreground mb-6">No products found</p>
                <Button onClick={() => {
                  setSearchQuery("")
                  dispatch(setFilters({ category: "", brand: "", priceRange: [0, 10000], inStock: null }))
                }}>
                  Clear All Filters
                </Button>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

// Reusable filter button
function FilterButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
        active
          ? "bg-primary text-primary-foreground shadow-md"
          : "hover:bg-muted text-foreground/80"
      }`}
    >
      {children}
    </button>
  )
}

// Product Card Component — NOW CLICKABLE!
function ProductCard({ product, isWishlisted, onAddToCart, onToggleWishlist }) {
  return (
    <Card className="group overflow-hidden rounded-2xl border border-border bg-card shadow-md hover:shadow-xl transition-all duration-300">
      {/* CLICKABLE IMAGE → opens product details */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder-medicine.jpg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Wishlist Button — stops link when clicked */}
        <button
          onClick={(e) => {
            e.preventDefault()
            onToggleWishlist()
          }}
          className="absolute right-3 top-3 z-10 rounded-full bg-card/90 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:scale-110"
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </button>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </Link>

      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <span className="text-xs text-muted-foreground">{product.brand}</span>
        </div>

        <h3 className="font-bold text-foreground line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.round(product.rating || 4.5) ? "text-yellow-500" : "text-muted"}>
              ★
            </span>
          ))}
          <span className="ml-2 text-xs text-muted-foreground">({product.reviews || 0})</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <span className="text-2xl font-black text-foreground">
            {product.price.toFixed(2)} L.E
          </span>
          <Button
            size="sm"
            onClick={onAddToCart}
            disabled={!product.inStock}
            className="rounded-xl"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
}