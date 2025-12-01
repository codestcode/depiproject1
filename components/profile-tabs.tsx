"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { Package, Heart, Truck, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("orders")
  const orders = useSelector((state: RootState) => state.orders.items)
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "⏳"
      case "confirmed":
        return "✓"
      case "shipped":
        return "📦"
      case "delivered":
        return "✓✓"
      case "cancelled":
        return "✕"
      default:
        return "○"
    }
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-border">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "orders"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Package className="inline mr-2 h-4 w-4" />
          Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "wishlist"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Heart className="inline mr-2 h-4 w-4" />
          Wishlist ({wishlistItems.length})
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <Card className="p-12 text-center border-border">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No orders yet</p>
              <Link href="/shop">
                <Button className="bg-primary hover:bg-primary/90">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id} className="p-6 border-border hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-semibold text-foreground">{order.id}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Items</p>
                    <p className="font-medium text-foreground">{order.items.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="font-medium text-foreground">${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Payment</p>
                    <p className="font-medium text-foreground capitalize">{order.paymentMethod}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium text-foreground">Items:</p>
                  <div className="space-y-1">
                    {order.items.map((item, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="border-border bg-transparent" size="sm">
                    <Truck className="mr-2 h-4 w-4" />
                    Track Order
                  </Button>
                  <Button variant="outline" className="border-border bg-transparent" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Wishlist Tab */}
      {activeTab === "wishlist" && (
        <div className="space-y-4">
          {wishlistItems.length === 0 ? (
            <Card className="p-12 text-center border-border">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No items in your wishlist</p>
              <Link href="/shop">
                <Button className="bg-primary hover:bg-primary/90">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {wishlistItems.map((item) => (
                <Card key={item.productId} className="overflow-hidden border-border hover:shadow-lg transition-all">
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-2">{item.name}</h3>
                      <p className="text-lg font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <Link href={`/shop/${item.productId}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                        View Product
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
