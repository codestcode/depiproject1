"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Heart, ShoppingCart, ChevronLeft, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/lib/redux/slices/wishlistSlice"
import { Navbar } from "@/components/navbar"
import { MOCK_PRODUCTS } from "@/lib/mock-data"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const productId = params.id as string
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  const product = MOCK_PRODUCTS.find((p) => p.id === productId)
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const isWishlisted = wishlistItems.some((item) => item.productId === productId)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Product not found</h2>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90">Back to Shop</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      }),
    )
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(productId))
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

  // Find related products
  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(
    0,
    4,
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="px-4 py-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/shop"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors w-fit"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative bg-muted rounded-lg overflow-hidden aspect-square">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`View ${i + 1}`}
                    className="w-full h-full object-cover aspect-square"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-primary uppercase mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">
                    {i < Math.floor(product.rating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-4xl font-bold text-foreground">${product.price.toFixed(2)}</p>
            </div>

            {/* Stock Status */}
            <div
              className={`flex items-center gap-2 px-4 py-3 rounded-lg ${product.inStock ? "bg-secondary/10" : "bg-destructive/10"}`}
            >
              <AlertCircle className="h-5 w-5" />
              <span className={product.inStock ? "text-secondary" : "text-destructive"}>
                {product.inStock ? "In Stock - Ready to Ship" : "Out of Stock"}
              </span>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Brand</p>
              <p className="text-lg text-muted-foreground">{product.brand}</p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Quantity</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 h-12 ${addedToCart ? "bg-secondary" : "bg-primary hover:bg-primary/90"} text-primary-foreground font-semibold`}
              >
                {addedToCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>
              <button
                onClick={handleToggleWishlist}
                className="px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${isWishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <Card className="p-6 border-border">
            <h3 className="font-bold text-foreground mb-4">Dosage Information</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{product.dosage}</p>
          </Card>

          <Card className="p-6 border-border">
            <h3 className="font-bold text-foreground mb-4">Active Ingredients</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{product.activeIngredients}</p>
          </Card>

          <Card className="p-6 border-border">
            <h3 className="font-bold text-foreground mb-4">Instructions for Use</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{product.instructions}</p>
          </Card>

          <Card className="p-6 border-border">
            <h3 className="font-bold text-foreground mb-4">Side Effects</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{product.sideEffects}</p>
          </Card>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/shop/${relatedProduct.id}`}>
                  <Card className="h-full overflow-hidden border-border hover:shadow-lg transition-all group cursor-pointer">
                    <div className="relative overflow-hidden bg-muted aspect-square">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-foreground line-clamp-2">{relatedProduct.name}</h3>
                      <p className="text-lg font-bold text-foreground">${relatedProduct.price.toFixed(2)}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
