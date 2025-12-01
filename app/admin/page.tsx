"use client"

import { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSelector, shallowEqual } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/redux/store"
import { BarChart3, Package, Users, ShoppingBag, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton" // if you have it, or create one
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import AdminTestSetup from "@/app/admin/AdminTestSetup"

// Dynamic imports with proper loading skeletons + preload support
const AdminProducts = dynamic(() => import("@/components/admin/admin-products"), {
  ssr: false,
  loading: () => <ProductsSkeleton />,
})

const AdminOrders = dynamic(() => import("@/components/admin/admin-orders"), {
  ssr: false,
  loading: () => <OrdersSkeleton />,
})

const AdminUsers = dynamic(() => import("@/components/admin/admin-users"), {
  ssr: false,
  loading: () => <UsersSkeleton />,
})

// Memoized selector — only recalculates when counts actually change
const selectDashboardStats = createSelector(
  (state: RootState) => state.orders.items.length,
  (state: RootState) => state.products.items.length,
  (totalOrders, totalProducts) => ({
    totalOrders,
    totalProducts,
  })
)

// Optional: Simple skeleton components (you can customize)
function ProductsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-32 w-full rounded-lg" />
          </Card>
        ))}
      </div>
    </div>
  )
}

function OrdersSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-64" />
      <Card className="overflow-hidden">
        <div className="p-6 space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function UsersSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-56" />
      <div className="grid gap-4">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.auth.user)

  // Only get counts — never the full arrays
  const { totalOrders, totalProducts } = useSelector(selectDashboardStats, shallowEqual)

  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/")
  }

  // Hardcoded or fetched from API — avoid Redux bloat
  const stats = useMemo(
    () => [
      { label: "Total Orders", value: totalOrders.toLocaleString(), icon: ShoppingBag, color: "text-blue-600" },
      { label: "Total Products", value: totalProducts.toLocaleString(), icon: Package, color: "text-green-600" },
      { label: "Active Users", value: "1,243", icon: Users, color: "text-purple-600" },
      { label: "Revenue", value: "$45.2K", icon: BarChart3, color: "text-red-600" },
    ],
    [totalOrders, totalProducts]
  )

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "products", label: "Products", icon: Package, preload: () => AdminProducts.preload() },
    { id: "orders", label: "Orders", icon: ShoppingBag, preload: () => AdminOrders.preload() },
    { id: "users", label: "Users", icon: Users, preload: () => AdminUsers.preload() },
  ]

  return (
    <>
      <AdminTestSetup />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-card">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-muted lg:hidden"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <h1 className="text-xl font-bold">pharmatish Admin</h1>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm" className="text-destructive border-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-30 border-r bg-card transition-transform duration-300 lg:relative lg:translate-x-0 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } w-64 overflow-y-auto pt-20 lg:pt-0`}
          >
            <nav className="space-y-2 p-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
                  onMouseEnter={item.preload} // Preload on hover → feels instant!
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8 min-h-screen">
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
                  <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat, i) => (
                    <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                        <stat.icon className={`h-8 w-8 opacity-40 ${stat.color}`} />
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="mt-12">
                  <h3 className="text-2xl font-semibold mb-6">Recent Activity</h3>
                  {/* Add mini charts or recent orders here */}
                  <Card className="p-8 text-center text-muted-foreground">
                    <p>More analytics coming soon...</p>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "products" && <AdminProducts />}
            {activeTab === "orders" && <AdminOrders />}
            {activeTab === "users" && <AdminUsers />}
          </main>
        </div>
      </div>
    </>
  )
}