// src/components/ProfileTabs.jsx
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Package, Heart, Truck, ArrowRight, Clock, CheckCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useSelector } from "react-redux"

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("orders")
  const orders = useSelector((state) => state.orders?.items || [])
  const wishlistItems = useSelector((state) => state.wishlist?.items || [])

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30",
      confirmed: "bg-blue-500/10 text-blue-700 border-blue-500/30",
      shipped: "bg-purple-500/10 text-purple-700 border-purple-500/30",
      delivered: "bg-green-500/10 text-green-700 border-green-500/30",
      cancelled: "bg-red-500/10 text-red-700 border-red-500/30",
    }
    return styles[status] || "bg-muted text-muted-foreground"
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 h-16 rounded-2xl bg-muted/50 p-2">
        <TabsTrigger
          value="orders"
          className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-lg font-semibold transition-all"
        >
          <Package className="mr-3 h-5 w-5" />
          Orders ({orders.length})
        </TabsTrigger>
        <TabsTrigger
          value="wishlist"
          className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-lg font-semibold transition-all"
        >
          <Heart className="mr-3 h-5 w-5" />
          Wishlist ({wishlistItems.length})
        </TabsTrigger>
      </TabsList>

      {/* Orders Tab */}
      <TabsContent value="orders" className="mt-8">
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-16 text-center"
          >
            <Package className="w-24 h-24 text-primary/20 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">No orders yet</h3>
            <p className="text-muted-foreground mb-8">
              Your order history will appear here once you start shopping
            </p>
            <Link to="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-xl">
                Start Shopping
                <ArrowRight className="ml-3 h-5 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-8 border-border hover:shadow-xl transition-all bg-card/95 backdrop-blur">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xl font-bold">Order #{order.id}</h3>
                        <Badge className={getStatusBadge(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-semibold">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Items</p>
                          <p className="font-semibold">{order.items.length}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total</p>
                          <p className="font-semibold text-primary text-lg">
                            {order.total.toFixed(2)} L.E
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Payment</p>
                          <p className="font-semibold capitalize">{order.paymentMethod}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border/50">
                        <p className="font-medium mb-2">Items:</p>
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {item.name} × {item.quantity}
                              </span>
                              <span className="font-medium">
                                {(item.price * item.quantity).toFixed(2)} L.E
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 self-end">
                      <Button variant="outline" size="lg">
                        <Truck className="mr-2 h-5 w-5" />
                        Track
                      </Button>
                      <Button size="lg">
                        View Details
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </TabsContent>

      {/* Wishlist Tab */}
      <TabsContent value="wishlist" className="mt-8">
        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-16 text-center"
          >
            <Heart className="w-24 h-24 text-pink-500/20 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-8">
              Save your favorite items to buy later
            </p>
            <Link to="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-xl">
                Browse Products
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((item) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden rounded-2xl border-border hover:shadow-2xl transition-all bg-card/90 backdrop-blur">
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={item.image || "/images/products/placeholder.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-pink-500/20 text-pink-600 border-pink-500/30">
                        Wishlisted
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="font-bold text-lg line-clamp-2">{item.name}</h3>
                    <p className="text-2xl font-black text-primary">
                      {item.price.toFixed(2)} L.E
                    </p>
                    <Link to={`/product/${item.productId}`} className="block">
                      <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg">
                        View Product
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}