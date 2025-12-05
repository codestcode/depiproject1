// src/pages/admin/AdminUsers.jsx
import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { toast } from "sonner"
import { MOCK_USERS } from "../../../lib/mock-data"

import {
  Search,
  Trash2,
  UserCheck,
  Mail,
  Calendar,
  ShoppingBag,
  DollarSign,
} from "lucide-react"

// Fake users — you can move this to mock-data.js later


export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id) => {
    if (confirm("Delete this user permanently?")) {
      toast.success("User deleted")
      // In real app: delete from Firebase
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">
              Users Management
            </h1>
            <p className="text-lg text-muted-foreground">
              {MOCK_USERS.length} registered customers
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-16 h-16 text-lg bg-card/80 backdrop-blur border-border shadow-xl"
          />
        </div>

        {/* Users Table */}
        <Card className="border-border shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left py-6 px-8 font-bold text-foreground">Customer</th>
                  <th className="text-left py-6 px-8 font-bold text-foreground">Status</th>
                  <th className="text-left py-6 px-8 font-bold text-foreground">Join Date</th>
                  <th className="text-left py-6 px-8 font-bold text-foreground">Orders</th>
                  <th className="text-left py-6 px-8 font-bold text-foreground">Total Spent</th>
                  <th className="text-left py-6 px-8 font-bold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-20">
                      <UserCheck className="w-20 h-20 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-xl text-muted-foreground">No users found</p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-4 ring-primary/10">
                            <Mail className="h-7 w-7 text-primary" />
                          </div>
                          <div>
                            <p className="font-bold text-lg">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <Badge
                          className={
                            user.status === "vip"
                              ? "bg-purple-500/10 text-purple-700 border-purple-500/30"
                              : user.status === "new"
                              ? "bg-green-500/10 text-green-700 border-green-500/30"
                              : "bg-blue-500/10 text-blue-700 border-blue-500/30"
                          }
                        >
                          {user.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {user.joinDate}
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="h-5 w-5 text-primary" />
                          <span className="font-bold text-lg">{user.orders}</span>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          <span className="text-xl font-black text-green-600">
                            {user.totalSpent}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex gap-3">
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(user.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}