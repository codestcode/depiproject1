"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.8,
    reviews: 124,
    image: "/paracetamol-medicine-bottle.png",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: 2,
    name: "Vitamin D3 Tablets",
    category: "Supplements",
    price: 24.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: "/vitamin-d3-supplement-bottle.png",
    badge: "New",
    inStock: true,
  },
  {
    id: 3,
    name: "Digital Thermometer",
    category: "Medical Equipment",
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.7,
    reviews: 156,
    image: "/digital-medical-thermometer.png",
    badge: "Sale",
    inStock: true,
  },
  {
    id: 4,
    name: "Hand Sanitizer 500ml",
    category: "Personal Care",
    price: 8.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 203,
    image: "/hand-sanitizer-bottle.png",
    badge: null,
    inStock: true,
  },
  {
    id: 5,
    name: "First Aid Kit",
    category: "First Aid",
    price: 34.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 67,
    image: "/first-aid-kit-medical-supplies.png",
    badge: "Popular",
    inStock: true,
  },
  {
    id: 6,
    name: "Omega-3 Fish Oil",
    category: "Supplements",
    price: 29.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 145,
    image: "/omega-3-capsules.png",
    badge: "Premium",
    inStock: true,
  },
]

export function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular and trusted healthcare products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
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
                    {product.badge && (
                      <Badge
                        className="absolute top-3 left-3"
                        variant={
                          product.badge === "Sale" ? "destructive" : product.badge === "New" ? "secondary" : "default"
                        }
                      >
                        {product.badge}
                      </Badge>
                    )}
                    <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>

                    {/* Quick Add to Cart - appears on hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        y: hoveredProduct === product.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-3 left-3 right-3"
                    >
                      <Button className="w-full" size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="mb-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
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

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-xs text-accent font-medium">
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
