// src/pages/CheckoutPage.jsx
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { MapPin, CreditCard, CheckCircle, Truck, Shield, ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { clearCart } from "../../lib/redux/slices/cartSlice"
import { addOrder } from "../../lib/redux/slices/ordersSlice"

export default function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart?.items || [])
  const cartTotal = useSelector((state) => state.cart?.total || 0)
  const user = useSelector((state) => state.auth?.user)

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "cash",
  })
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Egyptian pricing
  const tax = cartTotal * 0.14 // 14% VAT
  const shipping = cartTotal >= 500 ? 0 : 49
  const finalTotal = cartTotal + tax + shipping

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const order = {
        id: "ORD-" + Date.now(),
        userId: user?.uid || "guest",
        items: cartItems,
        total: finalTotal,
        status: "pending",
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
        paymentMethod: formData.paymentMethod,
        createdAt: Date.now(),
      }

      dispatch(addOrder(order))
      dispatch(clearCart())
      setOrderPlaced(true)
    } catch (err) {
      console.error("Order failed:", err)
    } finally {
      setLoading(false)
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
            <Shield className="w-24 h-24 text-primary/30 mx-auto mb-8" />
            <h1 className="text-4xl font-black mb-4">Sign In Required</h1>
            <p className="text-xl text-muted-foreground mb-10">
              You need to be logged in to complete your purchase
            </p>
            <Link to="/auth/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-xl px-12 py-8">
                Sign In to Continue
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  // Empty cart
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto px-4 py-24 text-center">
          <Truck className="w-32 h-32 text-primary/20 mx-auto mb-8" />
          <h1 className="text-5xl font-black mb-4">Your Cart is Empty</h1>
          <p className="text-xl text-muted-foreground mb-10">
            Add medicines to your cart first
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-xl px-12 py-8">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Order Success
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-green-50 to-background">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-20 h-20 text-green-600" />
            </motion.div>

            <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Order Confirmed!
            </h1>
            <p className="text-2xl text-foreground mb-4">
              Thank you for your purchase
            </p>
            <p className="text-lg text-muted-foreground mb-10">
              Your order has been placed successfully. We'll deliver it soon!
            </p>

            <div className="bg-card rounded-2xl p-8 shadow-xl mb-10">
              <p className="text-sm text-muted-foreground mb-2">Order ID</p>
              <p className="text-3xl font-bold text-primary">ORD-{Date.now().toString().slice(-8)}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/profile">
                <Button size="lg" className="bg-primary hover:bg-primary/90 px-10 py-7 text-lg">
                  Track Order
                </Button>
              </Link>
              <Link to="/shop">
                <Button size="lg" variant="outline" className="border-border px-10 py-7 text-lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-center mb-12 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              <div className={`flex items-center ${step === 1 ? "text-primary" : "text-muted-foreground"}`}>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold">1</div>
                <span className="ml-4 text-xl font-bold">Shipping</span>
              </div>
              <div className="w-32 h-1 bg-border mx-8"></div>
              <div className={`flex items-center ${step === 2 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${step === 2 ? "bg-primary text-primary-foreground" : "bg-muted"} font-bold`}>2</div>
                <span className="ml-4 text-xl font-bold">Payment</span>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-8">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="p-8 border-border shadow-xl">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                      <MapPin className="h-8 w-8 text-primary" />
                      Shipping Address
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block font-semibold mb-2">Full Name</label>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Ahmed Mohamed"
                          required
                          className="h-14 text-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">Email</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-14 text-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">Phone</label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+20 1XX XXX XXXX"
                          required
                          className="h-14 text-lg"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block font-semibold mb-2">Street Address</label>
                        <Input
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="123 El-Geish Street"
                          required
                          className="h-14 text-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">City</label>
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Cairo"
                          required
                          className="h-14 text-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">ZIP Code</label>
                        <Input
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          placeholder="12345"
                          required
                          className="h-14 text-lg"
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full mt-10 h-16 text-xl font-bold bg-primary hover:bg-primary/90 shadow-xl"
                    >
                      Continue to Payment
                    </Button>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="p-8 border-border shadow-xl">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                      <CreditCard className="h-8 w-8 text-primary" />
                      Payment Method
                    </h2>

                    <div className="space-y-4">
                      {[
                        { value: "cash", label: "Cash on Delivery", desc: "Pay when you receive", icon: "cash" },
                        { value: "card", label: "Credit/Debit Card", desc: "Secure online payment", icon: "card" },
                        { value: "wallet", label: "Pharmtish Wallet", desc: "Fast & easy", icon: "wallet" },
                      ].map((method) => (
                        <label
                          key={method.value}
                          className={`flex items-center gap-5 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                            formData.paymentMethod === method.value
                              ? "border-primary bg-primary/5 shadow-lg"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.value}
                            checked={formData.paymentMethod === method.value}
                            onChange={handleChange}
                            className="w-5 h-5 text-primary"
                          />
                          <div className="flex-1">
                            <p className="font-bold text-lg">{method.label}</p>
                            <p className="text-muted-foreground">{method.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-10">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1 h-14"
                      >
                        <ArrowLeft className="mr-2" /> Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 h-14 text-xl font-bold bg-primary hover:bg-primary/90 shadow-xl"
                      >
                        {loading ? "Processing Order..." : "Place Order"}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-8 border-border shadow-2xl sticky top-24 bg-card/95 backdrop-blur-xl">
                <h2 className="text-3xl font-black mb-8">Order Summary</h2>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex justify-between py-3 border-b border-border/30">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                      </div>
                      <p className="font-bold text-lg">{(item.price * item.quantity).toFixed(2)} L.E</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-4 border-t-2 border-dashed border-primary/20 pt-6">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal</span>
                    <span className="font-bold">{cartTotal.toFixed(2)} L.E</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>VAT (14%)</span>
                    <span>{tax.toFixed(2)} L.E</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-bold" : ""}>
                      {shipping === 0 ? "FREE" : `${shipping} L.E`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t-2 border-primary">
                    <span className="text-2xl font-black">Total</span>
                    <span className="text-4xl font-black text-primary">
                      {finalTotal.toFixed(2)} L.E
                    </span>
                  </div>
                </div>

                {shipping === 0 && (
                  <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                    <p className="text-green-600 font-bold">Free Shipping Applied!</p>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}