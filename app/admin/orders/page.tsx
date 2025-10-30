"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/contexts/admin-context"
import AdminSidebar from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, Package, Clock, CheckCircle, Truck } from "lucide-react"

export default function AdminOrders() {
  const { isAuthenticated } = useAdmin()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin")
      return
    }

    loadOrders()
  }, [isAuthenticated, router])

  const loadOrders = () => {
    const ordersList = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith("order-") || key === "latest-order") {
        try {
          const order = JSON.parse(localStorage.getItem(key) || "{}")
          if (order.id) {
            ordersList.push(order)
          }
        } catch (e) {
          // Skip invalid orders
        }
      }
    }

    // Remove duplicates and sort by date
    const uniqueOrders = ordersList
      .filter((order, index, self) => index === self.findIndex((o) => o.id === order.id))
      .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())

    setOrders(uniqueOrders)
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        const updatedOrder = { ...order, status: newStatus }
        // Update in localStorage
        localStorage.setItem(`order-${orderId}`, JSON.stringify(updatedOrder))
        if (localStorage.getItem("latest-order")) {
          const latestOrder = JSON.parse(localStorage.getItem("latest-order") || "{}")
          if (latestOrder.id === orderId) {
            localStorage.setItem("latest-order", JSON.stringify(updatedOrder))
          }
        }
        return updatedOrder
      }
      return order
    })
    setOrders(updatedOrders)
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 md:ml-64">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600">Manage customer orders and track deliveries</p>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Order #{order.id?.slice(-8)}</h3>
                        <p className="text-sm text-gray-600">
                          {order.customerInfo?.name} • {order.customerInfo?.email}
                        </p>
                        <p className="text-xs text-gray-500">{order.orderDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${order.total?.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{order.items?.length} items</p>
                      </div>

                      <Badge className={getStatusColor(order.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status || "pending"}
                        </div>
                      </Badge>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && <OrderDetails order={selectedOrder} onStatusUpdate={updateOrderStatus} />}
                          </DialogContent>
                        </Dialog>

                        <Select
                          value={order.status || "confirmed"}
                          onValueChange={(value) => updateOrderStatus(order.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function OrderDetails({ order, onStatusUpdate }: { order: any; onStatusUpdate: (id: string, status: string) => void }) {
  return (
    <div className="space-y-6">
      {/* Order Info */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-medium text-gray-900">Order ID</p>
          <p className="text-gray-600">{order.id}</p>
        </div>
        <div>
          <p className="font-medium text-gray-900">Order Date</p>
          <p className="text-gray-600">{order.orderDate}</p>
        </div>
        <div>
          <p className="font-medium text-gray-900">Status</p>
          <Badge
            className={`inline-flex ${order.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
          >
            {order.status || "pending"}
          </Badge>
        </div>
        <div>
          <p className="font-medium text-gray-900">Payment Method</p>
          <p className="text-gray-600">{order.paymentMethod}</p>
        </div>
      </div>

      {/* Customer Info */}
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
        <div className="bg-gray-50 p-3 rounded-lg text-sm">
          <p>
            <strong>Name:</strong> {order.customerInfo?.name}
          </p>
          <p>
            <strong>Email:</strong> {order.customerInfo?.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.customerInfo?.phone}
          </p>
        </div>
      </div>

      {/* Delivery Address */}
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
        <div className="bg-gray-50 p-3 rounded-lg text-sm">
          <p>{order.address?.street}</p>
          <p>
            {order.address?.city}, {order.address?.state} {order.address?.zipCode}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
        <div className="space-y-2">
          {order.items?.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-12 w-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="border-t pt-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${order.subtotal?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{order.deliveryFee === 0 ? "Free" : `$${order.deliveryFee?.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${order.tax?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium text-base border-t pt-2">
            <span>Total</span>
            <span>${order.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Status Update */}
      <div className="flex gap-2">
        <Select value={order.status || "confirmed"} onValueChange={(value) => onStatusUpdate(order.id, value)}>
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
