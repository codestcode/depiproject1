"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Eye, Check } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { addItem, getItemQuantity } = useCart()
  const itemQuantity = getItemQuantity(product.id)

  const handleAddToCart = async () => {
    if (!product.inStock) return

    setIsAdding(true)
    addItem(product)

    // Show success state briefly
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.badge && (
                <Badge
                  variant={product.badge === "Sale" ? "destructive" : product.badge === "New" ? "secondary" : "default"}
                >
                  {product.badge}
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="outline" className="bg-background/80">
                  Out of Stock
                </Badge>
              )}
              {itemQuantity > 0 && (
                <Badge variant="default" className="bg-primary">
                  {itemQuantity} in cart
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
              <Link href={`/products/${product.id}`}>
                <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Quick Add to Cart - appears on hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20,
              }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-3 right-3"
            >
              <Button className="w-full" size="sm" disabled={!product.inStock || isAdding} onClick={handleAddToCart}>
                {isAdding ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.brand}</p>
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price and Stock */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-primary">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>
              <span className={`text-xs font-medium ${product.inStock ? "text-accent" : "text-destructive"}`}>
                {product.inStock ? `${product.stockCount} in stock` : "Out of Stock"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
