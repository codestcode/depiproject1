// src/pages/WishlistPage.jsx
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { removeFromWishlist, clearWishlist } from "../../lib/redux/slices/wishlistSlice"
import { addToCart } from "../../lib/redux/slices/cartSlice"

export default function WishlistPage() {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state) => state.wishlist?.items || [])

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
      })
    )
    // Optional: auto-remove from wishlist after adding to cart
    // dispatch(removeFromWishlist(item.productId))
  }

  // Empty Wishlist
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg mx-auto"
          >
            <Heart className="w-32 h-32 text-primary/20 mx-auto mb-8" />
            <h1 className="text-5xl font-black text-foreground mb-4">Your Wishlist is Empty</h1>
            <p className="text-xl text-muted-foreground mb-10">
              Save your favorite medicines and products for later
            </p>
            <Link to="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-xl px-12 py-8 shadow-2xl">
                Explore Products
                <ArrowRight className="ml-4 h-6 w-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            My Wishlist
          </h1>
          <p className="text-xl text-muted-foreground">
            <strong className="text-primary">{wishlistItems.length}</strong> item{wishlistItems.length !== 1 ? "s" : ""} saved
          </p>
        </motion.div>

        {/* Wishlist Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="overflow-hidden rounded-2xl border-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 bg-card/90 backdrop-blur">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={item.image || "/images/products/placeholder.jpg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      Saved
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-foreground line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-2xl font-black text-primary mt-2">
                      {item.price.toFixed(2)} L.E
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl text-lg py-6"
                    >
                      <ShoppingCart className="mr-3 h-5 w-5" />
                      Add to Cart
                    </Button>

                    <Button
                      onClick={() => dispatch(removeFromWishlist(item.productId))}
                      variant="outline"
                      className="w-full border-destructive/30 text-destructive hover:bg-destructive/5"
                    >
                      <Heart className="mr-3 h-5 w-5 fill-current" />
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Clear All Button */}
        <div className="text-center mt-16">
          <Button
            onClick={() => dispatch(clearWishlist())}
            variant="destructive"
            size="lg"
            className="px-12 py-7 text-lg font-bold shadow-xl"
          >
            Clear Wishlist
          </Button>
        </div>
      </div>
    </div>
  )
}