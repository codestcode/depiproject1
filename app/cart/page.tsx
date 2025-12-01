"use client"

import { useState } from "react"
import Link from "next/link"
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { removeFromCart, updateQuantity, clearCart } from "@/lib/redux/slices/cartSlice"
import { Navbar } from "@/components/navbar"

export default function CartPage() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const cartTotal = useSelector((state: RootState) => state.cart.total)
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const handleApplyPromo = () => {
    if (promoCode === "SAVE10") {
      setDiscount(cartTotal * 0.1)
    } else {
      setDiscount(0)
    }
  }

  const finalTotal = cartTotal - discount
  const tax = finalTotal * 0.08
  const shippingFee = finalTotal > 50 ? 0 : 5.99

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <div className="text-center space-y-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto" />
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
            </div>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.productId} className="p-4 border-border flex gap-4">
                <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({ productId: item.productId, quantity: Math.max(1, item.quantity - 1) }),
                        )
                      }
                      className="p-1 rounded border border-border hover:bg-muted"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))
                      }
                      className="p-1 rounded border border-border hover:bg-muted"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right space-y-4">
                  <p className="text-lg font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.productId))}
                    className="p-2 rounded text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </Card>
            ))}

            <Button
              onClick={() => dispatch(clearCart())}
              variant="outline"
              className="w-full border-border text-destructive hover:bg-destructive/10"
            >
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Card className="p-6 border-border space-y-6">
              <h2 className="font-bold text-foreground text-lg">Order Summary</h2>

              {/* Promo Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="bg-card border-border text-sm"
                  />
                  <Button onClick={handleApplyPromo} size="sm" className="bg-primary hover:bg-primary/90">
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Tip: Try "SAVE10" for 10% off</p>
              </div>

              {/* Summary Details */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">${cartTotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm text-secondary">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">
                    {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                {shippingFee > 0 && <p className="text-xs text-muted-foreground">Free shipping on orders over $50</p>}

                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-lg font-bold text-primary">${(finalTotal + tax + shippingFee).toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90 h-12">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/shop" className="w-full">
                <Button variant="outline" className="w-full border-border bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
