"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/contexts/admin-context"
import AdminSidebar from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

export default function AdminDashboard() {
  const { isAuthenticated, user } = useAdmin()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    recentOrders: [] as any[],
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin")
      return
    }

    // Load dashboard data
    loadDashboardData()
  }, [isAuthenticated, router])

  const loadDashboardData = () => {
    // Get products count
    const products = JSON.parse(localStorage.getItem("admin-products") || "[]")

    // Get orders from localStorage
    const orders = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith("order-")) {
        const order = JSON.parse(localStorage.getItem(key) || "{}")
        orders.push(order)
      }
    }

    // Calculate stats
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)
    const recentOrders = orders.slice(-5).reverse()

    setStats({
      totalProducts: products.length || 24, // Default to existing products
      totalOrders: orders.length,
      totalCustomers: new Set(orders.map((o) => o.customerInfo?.email)).size,
      totalRevenue,
      recentOrders,
    })
  }

  if (!isAuthenticated) {
    return null
  }

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: Users,
      change: "+23%",
      changeType: "positive" as const,
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: "+15%",
      changeType: "positive" as const,
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 md:ml-64">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="flex items-center text-xs text-gray-600">
                    {stat.changeType === "positive" ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                      {stat.change}
                    </span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentOrders.length > 0 ? (
                    stats.recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <ShoppingCart className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Order #{order.id?.slice(-8)}</p>
                            <p className="text-xs text-gray-500">{order.customerInfo?.name || "Customer"}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">${order.total?.toFixed(2)}</p>
                          <Badge variant={order.status === "confirmed" ? "default" : "secondary"}>
                            {order.status || "pending"}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      <p>No recent orders</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={() => router.push("/admin/products")}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Manage Products
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={() => router.push("/admin/orders")}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Orders
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={() => router.push("/admin/customers")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Customer Management
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={() => router.push("/admin/analytics")}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
