"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, MapPin, CreditCard } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { clearCart } from "@/lib/redux/slices/cartSlice"
import { addOrder } from "@/lib/redux/slices/ordersSlice"
import { Navbar } from "@/components/navbar"

export default function CheckoutPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const cartTotal = useSelector((state: RootState) => state.cart.total)
  const user = useSelector((state: RootState) => state.auth.user)

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

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Please Sign In</h2>
            <p className="text-muted-foreground">You need to be logged in to checkout</p>
            <Link href="/auth/login">
              <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
            <p className="text-muted-foreground">Add items to your cart before checking out</p>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90">Back to Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const tax = cartTotal * 0.08
  const shipping = cartTotal > 50 ? 0 : 5.99
  const finalTotal = cartTotal + tax + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const order = {
        id: Date.now().toString(),
        userId: user.uid,
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: finalTotal,
        status: "pending" as const,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
        paymentMethod: formData.paymentMethod as "cash" | "card" | "wallet",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      dispatch(addOrder(order))
      dispatch(clearCart())
      setOrderPlaced(true)
    } catch (err) {
      console.error("Error placing order:", err)
    } finally {
      setLoading(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[50vh]">
          <Card className="p-12 border-border text-center space-y-6 max-w-md">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-secondary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Order Placed!</h2>
              <p className="text-muted-foreground mb-4">Thank you for your purchase. Your order has been confirmed.</p>
              <p className="text-sm text-muted-foreground mb-6">Order ID: {Date.now().toString().slice(-8)}</p>
            </div>
            <div className="space-y-3 pt-6 border-t border-border">
              <Link href="/profile">
                <Button className="w-full bg-primary hover:bg-primary/90">Track Your Order</Button>
              </Link>
              <Link href="/shop">
                <Button variant="outline" className="w-full border-border bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step === 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                <MapPin className="h-5 w-5" />
              </div>
              <div className="h-1 flex-1 bg-border"></div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step === 2 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                <CreditCard className="h-5 w-5" />
              </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Shipping Information */}
              {step === 1 && (
                <Card className="p-6 border-border space-y-4">
                  <h2 className="text-lg font-bold text-foreground">Shipping Address</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-foreground block mb-1">Full Name</label>
                      <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="bg-card border-border"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-card border-border"
                        required
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
                        required
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
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">City</label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-card border-border"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Zip Code</label>
                      <Input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="bg-card border-border"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-primary hover:bg-primary/90 mt-6"
                  >
                    Continue to Payment
                  </Button>
                </Card>
              )}

              {/* Payment Information */}
              {step === 2 && (
                <Card className="p-6 border-border space-y-4">
                  <h2 className="text-lg font-bold text-foreground">Payment Method</h2>

                  <div className="space-y-3">
                    {[
                      { value: "cash", label: "Cash on Delivery", desc: "Pay when you receive your order" },
                      { value: "card", label: "Credit/Debit Card", desc: "Secure online payment" },
                      { value: "wallet", label: "Digital Wallet", desc: "Use your pharmatish wallet" },
                    ].map((method) => (
                      <label
                        key={method.value}
                        className="flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all"
                        style={{
                          borderColor: formData.paymentMethod === method.value ? "var(--primary)" : "var(--border)",
                          backgroundColor: formData.paymentMethod === method.value ? "var(--primary)" : "var(--card)",
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={formData.paymentMethod === method.value}
                          onChange={handleInputChange}
                          className="h-4 w-4"
                        />
                        <div
                          style={{
                            color:
                              formData.paymentMethod === method.value
                                ? "var(--primary-foreground)"
                                : "var(--foreground)",
                          }}
                        >
                          <p className="font-medium">{method.label}</p>
                          <p className="text-xs opacity-75">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-border">
                    <Button type="button" onClick={() => setStep(1)} variant="outline" className="flex-1 border-border">
                      Back
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-1 bg-primary hover:bg-primary/90">
                      {loading ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </Card>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 border-border space-y-6 sticky top-24">
              <h2 className="font-bold text-foreground text-lg">Order Summary</h2>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} <span className="font-medium">x{item.quantity}</span>
                    </span>
                    <span className="font-medium text-foreground">{(item.price * item.quantity).toFixed(2)} L.E</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">{cartTotal.toFixed(2)} L.E</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium text-foreground">{tax.toFixed(2)} L.E</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">
                    {shipping === 0 ? "FREE" : `${shipping.toFixed(2)} L.E`}
                  </span>
                </div>

                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-lg font-bold text-primary">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
