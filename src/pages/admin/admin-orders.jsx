// src/pages/admin/AdminOrders.jsx
import { useState } from "react"
import { motion } from "framer-motion"
import { FAKE_ORDERS } from "../../../lib/mock-data"  // ← Import here
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Search } from "lucide-react"

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredOrders = FAKE_ORDERS.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30",
      confirmed: "bg-blue-500/10 text-blue-700 border-blue-500/30",
      shipped: "bg-purple-500/10 text-purple-700 border-purple-500/30",
      delivered: "bg-green-500/10 text-green-700 border-green-500/30",
      cancelled: "bg-red-500/10 text-red-700 border-red-500/30",
    }
    return colors[status] || "bg-gray-500/10 text-gray-700"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">
              Orders Management
            </h1>
            <p className="text-lg text-muted-foreground">
              {FAKE_ORDERS.length} total orders
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          <Input
            placeholder="Search by order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-16 h-14 text-lg bg-card/80 backdrop-blur border-border"
          />
        </div>

        {/* Orders Table */}
        <Card className="border-border shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left py-6 px-8 font-bold">Order ID</th>
                  <th className="text-left py-6 px-8 font-bold">Customer</th>
                  <th className="text-left py-6 px-8 font-bold">Items</th>
                  <th className="text-left py-6 px-8 font-bold">Total</th>
                  <th className="text-left py-6 px-8 font-bold">Status</th>
                  <th className="text-left py-6 px-8 font-bold">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-border/50 hover:bg-muted/30"
                  >
                    <td className="py-6 px-8">
                      <p className="font-bold text-lg text-primary">#{order.id}</p>
                    </td>
                    <td className="py-6 px-8">
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </td>
                    <td className="py-6 px-8 text-center">
                      {order.items.length}
                    </td>
                    <td className="py-6 px-8">
                      <p className="text-xl font-black text-primary">
                        {order.total.toFixed(2)} L.E
                      </p>
                    </td>
                    <td className="py-6 px-8">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-6 px-8 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No orders found</p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}