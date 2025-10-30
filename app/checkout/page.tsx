"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummary } from "@/components/order-summary"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import type { CheckoutFormData } from "@/lib/validation"
import { motion } from "framer-motion"

export default function CheckoutPage() {
  const router = useRouter()
  const { state, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("standard")

  // Redirect if cart is empty
  useEffect(() => {
    if (state.items.length === 0) {
      router.push("/cart")
    }
  }, [state.items.length, router])

  const handleSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        items: state.items,
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        },
        address: {
          street: data.streetAddress,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
        },
        delivery: {
          option: data.deliveryOption,
          notes: data.deliveryNotes,
        },
        payment: {
          method: data.paymentMethod,
        },
        createdAt: new Date().toISOString(),
        status: "confirmed",
      }

      // Store order in localStorage (in real app, this would be sent to backend)
      localStorage.setItem("latest-order", JSON.stringify(order))

      // Clear cart
      clearCart()

      // Redirect to confirmation page
      router.push(`/order-confirmation?orderId=${order.id}`)
    } catch (error) {
      console.error("Order submission failed:", error)
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some items to your cart before proceeding to checkout.</p>
            <Button size="lg" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your order by providing your delivery details</p>
          </motion.div>
        </div>

        {/* Checkout Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <OrderSummary selectedDeliveryOption={selectedDeliveryOption} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
