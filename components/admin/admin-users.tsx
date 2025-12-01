"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Trash2 } from "lucide-react"

const MOCK_USERS = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john@example.com",
    joinDate: "2025-01-15",
    orders: 5,
    totalSpent: "$245.99",
  },
  {
    id: "user-2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    joinDate: "2025-01-10",
    orders: 3,
    totalSpent: "$123.45",
  },
  {
    id: "user-3",
    name: "Michael Chen",
    email: "michael@example.com",
    joinDate: "2025-01-08",
    orders: 8,
    totalSpent: "$567.89",
  },
  {
    id: "user-4",
    name: "Emma Davis",
    email: "emma@example.com",
    joinDate: "2025-01-05",
    orders: 2,
    totalSpent: "$89.99",
  },
]

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Users Management</h2>
        <p className="text-muted-foreground">Total Users: {MOCK_USERS.length}</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      {/* Users Table */}
      <Card className="p-6 border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Join Date</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Orders</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Total Spent</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-4 font-medium text-foreground">{user.name}</td>
                <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                <td className="py-3 px-4 text-muted-foreground">{user.joinDate}</td>
                <td className="py-3 px-4 text-foreground">{user.orders}</td>
                <td className="py-3 px-4 font-medium text-foreground">{user.totalSpent}</td>
                <td className="py-3 px-4">
                  <button className="p-2 rounded hover:bg-destructive/10 text-destructive transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
