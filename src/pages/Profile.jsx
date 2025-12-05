// src/pages/ProfilePage.jsx
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  User,
  LogOut,
  ShoppingBag,
  Heart,
  Wallet,
  Award,
  Edit2,
  Bell,
  X,
  MapPin,
  Mail,
  Phone,
  Shield,
  Package,
  Clock,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useDispatch, useSelector } from "react-redux"
import { logout} from "../../lib/redux/slices/authSlice"
import { signOut } from "firebase/auth"
import { auth } from "../../lib/firebase"
import ProfileTabs from "../components/Profiletabs.jsx"
export default function ProfilePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth?.user)

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In real app: update Firebase profile + Firestore
    setIsEditing(false)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(logout())
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto"
          >
            <Shield className="w-32 h-32 text-primary/20 mx-auto mb-8" />
            <h1 className="text-5xl font-black mb-4">Sign In Required</h1>
            <p className="text-xl text-muted-foreground mb-10">
              Please log in to view your profile
            </p>
            <Link to="/auth/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-xl px-12 py-8 shadow-2xl">
                Sign In Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            My Account
          </h1>
          <p className="text-xl text-muted-foreground">
            Welcome back, <span className="text-primary font-bold">{user.displayName || "User"}</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="p-8 border-border shadow-2xl bg-card/95 backdrop-blur-xl sticky top-24">
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 ring-8 ring-primary/10 flex items-center justify-center mb-6">
                  <User className="w-20 h-20 text-primary" />
                </div>
                <h2 className="text-3xl font-black text-foreground">
                  {user.displayName || "User"}
                </h2>
                <p className="text-muted-foreground mt-2">{user.email}</p>
                <Badge className="mt-4" variant="secondary">
                  Verified Member
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{formData.phone || "Not added"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery Address</p>
                    <p className="font-medium">{formData.address || "Not set"}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="w-full mt-8 h-12"
              >
                {isEditing ? (
                  <>
                    <X className="mr-2 h-5 w-5" /> Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className="mr-2 h-5 w-5" /> Edit Profile
                  </>
                )}
              </Button>

              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full mt-4 h-12"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign Out
              </Button>
            </Card>
          </motion.div>

          {/* Right: Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-xl transition-shadow">
                <ShoppingBag className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                <p className="text-3xl font-black text-foreground">12</p>
                <p className="text-muted-foreground">Total Orders</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-xl transition-shadow">
                <Heart className="w-16 h-16 text-pink-500/30 mx-auto mb-4" />
                <p className="text-3xl font-black text-foreground">8</p>
                <p className="text-muted-foreground">Wishlist Items</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-xl transition-shadow">
                <Wallet className="w-16 h-16 text-green-600/30 mx-auto mb-4" />
                <p className="text-3xl font-black text-foreground">0 L.E</p>
                <p className="text-muted-foreground">Wallet Balance</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-xl transition-shadow">
                <Award className="w-16 h-16 text-yellow-500/30 mx-auto mb-4" />
                <p className="text-3xl font-black text-foreground">320</p>
                <p className="text-muted-foreground">Loyalty Points</p>
              </Card>
            </div>

            {/* Tabs */}
            <Card className="border-border shadow-xl">
              <Tabs defaultValue="orders" className="w-full">
                <TabsList className="grid w-full grid-cols-3 rounded-t-2xl">
                  <TabsTrigger value="orders" className="text-lg py-4 cursor-pointer">
                    <Package className="mr-2 h-5 w-5" />
                    Orders
                  </TabsTrigger>
                  <TabsTrigger value="addresses" className="text-lg py-4 cursor-pointer">
                    <MapPin className="mr-2 h-5 w-5" />
                    Addresses
                  </TabsTrigger>
                 
                </TabsList>

                <TabsContent value="orders" className="p-8">
                  <div className="text-center py-16">
                    <Package className="w-24 h-24 text-primary/20 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">No orders yet</h3>
                    <p className="text-muted-foreground mb-8">
                      Your order history will appear here once you start shopping
                    </p>
                    <Link to="/shop">
                      <Button size="lg" className="bg-primary hover:bg-primary/90">
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="addresses" className="p-8">
                  <div className="space-y-4">
                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20">
                      <h4 className="font-bold text-lg mb-2">Default Address</h4>
                      <p className="text-foreground">123 Main Street, Apt 4B</p>
                      <p className="text-muted-foreground">Cairo, Egypt 11511</p>
                      <Button variant="outline" size="sm" className="mt-4">
                        Edit Address
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Account Settings</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="mr-3 h-5 w-5" />
                        Change Email
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="mr-3 h-5 w-5" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Bell className="mr-3 h-5 w-5" />
                        Notification Preferences
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>
        <ProfileTabs />
      </div>
    </div>
  )
}