"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, LogOut, ShoppingBag, Heart, Wallet, Award, Edit2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { logout } from "@/lib/redux/slices/authSlice"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Navbar } from "@/components/navbar"
import ProfileTabs from "@/components/profile-tabs"

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Sign In Required</h2>
            <p className="text-muted-foreground">You need to be logged in to access your profile</p>
            <Link href="/auth/login">
              <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    // Save profile changes to Firebase
    setIsEditing(false)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(logout())
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="mb-8 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">My Account</h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {/* Profile Card */}
          <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{user.displayName || "User"}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {isEditing ? <X className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Full Name</label>
                    <Input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="bg-card border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Phone</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-card border-border"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-foreground block mb-1">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="bg-card border-border opacity-50"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-foreground block mb-1">Address</label>
                    <Input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="bg-card border-border"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveProfile} className="w-full bg-primary hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium text-foreground">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                  <p className="font-medium text-foreground">2025</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium text-foreground">{formData.phone || "Not added"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <p className="font-medium text-foreground">{formData.address || "Not added"}</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="p-6 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-foreground">4</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-primary/40" />
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Wishlist Items</p>
                <p className="text-3xl font-bold text-foreground">2</p>
              </div>
              <Heart className="h-8 w-8 text-destructive/40" />
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Wallet Balance</p>
                <p className="text-3xl font-bold text-foreground">$0.00</p>
              </div>
              <Wallet className="h-8 w-8 text-secondary/40" />
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Loyalty Points</p>
                <p className="text-3xl font-bold text-foreground">250</p>
              </div>
              <Award className="h-8 w-8 text-accent/40" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <ProfileTabs />
      </div>
    </div>
  )
}
