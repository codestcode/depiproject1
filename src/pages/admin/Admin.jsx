// src/pages/admin/AdminDashboard.jsx
import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Package,
  Users,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  User,
  Settings,
  Bell,
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { useSelector } from "react-redux"
import { signOut } from "firebase/auth"
import { auth } from "../../../lib/firebase"
import { useNavigate } from "react-router-dom"

// Lazy load admin pages
import { lazy, Suspense } from "react"
const AdminProducts = lazy(() => import("../admin/admin-products"))
const AdminOrders = lazy(() => import("../admin/admin-orders"))
const AdminUsers = lazy(() => import("../admin/admin-users"))

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="space-y-8">
    <div className="h-12 bg-muted/50 rounded-xl animate-pulse" />
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-8">
          <div className="h-20 bg-muted/30 rounded-xl animate-pulse" />
        </Card>
      ))}
    </div>
  </div>
)

export default function AdminDashboard() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth?.user)

  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = [
    { label: "Total Orders", value: "1,847", icon: ShoppingBag, color: "text-blue-600" },
    { label: "Active Products", value: "342", icon: Package, color: "text-green-600" },
    { label: "Total Users", value: "8,291", icon: Users, color: "text-purple-600" },
    { label: "Revenue (EGP)", value: "1.2M", icon: BarChart3, color: "text-orange-600" },
  ]

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "users", label: "Users", icon: Users },
  ]

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-muted lg:hidden"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-2xl shadow-xl ring-4 ring-primary/20">
                Rx
              </div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Pharmtish Admin
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500" />
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="hidden sm:flex border-destructive text-destructive hover:bg-destructive/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-border bg-card/95 backdrop-blur transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="mt-20 lg:mt-8 px-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground shadow-xl"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-6 w-6" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground">{user?.displayName || "Admin"}</p>
                <p className="text-sm text-muted-foreground">admin@pharmtish.com</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-5xl font-black mb-4">Welcome back, Admin!</h2>
                <p className="text-xl text-muted-foreground">
                  Here's what's happening with your pharmacy today
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-8 hover:shadow-2xl transition-shadow bg-card/90 backdrop-blur">
                      <div className="flex items-center justify-between mb-4">
                        <stat.icon className={`h-12 w-12 ${stat.color} opacity-70`} />
                        <Badge variant="secondary" className="text-lg">
                          +12%
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-lg mb-2">{stat.label}</p>
                      <p className="text-5xl font-black text-foreground">{stat.value}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-16">
                <h3 className="text-3xl font-bold mb-8">Quick Actions</h3>
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="p-8 text-center hover:shadow-xl transition-all cursor-pointer bg-gradient-to-br from-primary/10 to-primary/5">
                    <Package className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Add New Product</h4>
                    <p className="text-muted-foreground">Expand your inventory</p>
                  </Card>
                  <Card className="p-8 text-center hover:shadow-xl transition-all cursor-pointer bg-gradient-to-br from-green-500/10 to-green-500/5">
                    <Users className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">View Users</h4>
                    <p className="text-muted-foreground">Manage customers</p>
                  </Card>
                  <Card className="p-8 text-center hover:shadow-xl transition-all cursor-pointer bg-gradient-to-br from-purple-500/10 to-purple-500/5">
                    <ShoppingBag className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Process Orders</h4>
                    <p className="text-muted-foreground">Handle pending deliveries</p>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {/* Lazy Loaded Pages */}
          <Suspense fallback={<LoadingSkeleton />}>
            {activeTab === "products" && <AdminProducts />}
            {activeTab === "orders" && <AdminOrders />}
            {activeTab === "users" && <AdminUsers />}
          </Suspense>
        </main>
      </div>
    </div>
  )
}