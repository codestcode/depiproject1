// src/pages/ProductDetails.jsx
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { toast } from "sonner"
import {
  ShoppingCart,
  Heart,
  ArrowLeft,
  Star,
  Package,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { addToCart } from "../../lib/redux/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "../../lib/redux/slices/wishlistSlice"
import { MOCK_PRODUCTS } from "../../lib/mock-data"

export default function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state) => state.wishlist?.items || [])

  // Find product by ID
  const product = MOCK_PRODUCTS.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-20 h-20 text-destructive mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isWishlisted = wishlistItems.some((item) => item.productId === product.id)

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      })
    )
    toast.success("Added to cart!")
  }

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id))
      toast.success("Removed from wishlist")
    } else {
      dispatch(
        addToWishlist({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        })
      )
      toast.success("Added to wishlist!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted shadow-2xl">
              <img
                src={product.image || "/images/products/placeholder.jpg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Badge className="text-2xl px-8 py-4 bg-red-600">
                  Out of Stock
                </Badge>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <Badge variant="secondary" className="mb-4">
                {product.category}
              </Badge>
              <h1 className="text-5xl font-black text-foreground mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.round(product.rating)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-6">
                <p className="text-5xl font-black text-primary">
                  {product.price.toFixed(2)} L.E
                </p>
                {product.inStock ? (
                  <Badge className="bg-green-500/10 text-green-700 border-green-500/30">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 h-16 text-xl font-bold bg-primary hover:bg-primary/90 shadow-xl"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-3 h-7 w-7" />
                Add to Cart
              </Button>

              <Button
                size="lg"
                variant={isWishlisted ? "secondary" : "outline"}
                className="h-16 px-8"
                onClick={handleToggleWishlist}
              >
                <Heart className={`h-7 w-7 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Details Tabs */}
            <div className="space-y-6 mt-12">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <Package className="h-6 w-6 text-primary" />
                  Product Details
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <strong>Active Ingredients:</strong> {product.activeIngredients}
                  </div>
                  <div>
                    <strong>Dosage:</strong> {product.dosage}
                  </div>
                  <div>
                    <strong>Instructions:</strong> {product.instructions}
                  </div>
                  <div>
                    <strong>Side Effects:</strong> {product.sideEffects}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}