"use client"

import Link from "next/link"
import { Heart, ShoppingCart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { removeFromWishlist, clearWishlist } from "@/lib/redux/slices/wishlistSlice"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import { Navbar } from "@/components/navbar"

export default function WishlistPage() {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

  const handleAddToCart = (item: (typeof wishlistItems)[0]) => {
    dispatch(
      addToCart({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
      }),
    )
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <div className="text-center space-y-6">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto" />
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">Save your favorite items for later</p>
            </div>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90">
                Start Exploring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
          <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {wishlistItems.map((item) => (
            <Card key={item.productId} className="overflow-hidden border-border hover:shadow-lg transition-all group">
              <div className="relative overflow-hidden bg-muted aspect-square">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-2">{item.name}</h3>
                  <p className="text-lg font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => dispatch(removeFromWishlist(item.productId))}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                    Remove
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={() => dispatch(clearWishlist())}
            variant="outline"
            className="border-border text-destructive hover:bg-destructive/10"
          >
            Clear Wishlist
          </Button>
        </div>
      </div>
    </div>
  )
}
