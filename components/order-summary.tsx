"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { deliveryOptions } from "@/lib/validation"

interface OrderSummaryProps {
  selectedDeliveryOption?: string
}

export function OrderSummary({ selectedDeliveryOption = "standard" }: OrderSummaryProps) {
  const { state, getTotalItems, getTotalPrice } = useCart()

  const selectedDelivery = deliveryOptions.find((option) => option.id === selectedDeliveryOption)
  const deliveryFee = selectedDelivery?.price || 0
  const subtotal = getTotalPrice()
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + deliveryFee + tax

  if (state.items.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Your cart is empty</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order Summary</span>
          <Badge variant="secondary">{getTotalItems()} items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cart Items */}
        <div className="space-y-3">
          {state.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <img
                src={item.product.image || "/placeholder.svg"}
                alt={item.product.name}
                className="w-12 h-12 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity} × ${item.product.price}
                </p>
              </div>
              <span className="font-semibold text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Delivery ({selectedDelivery?.name})</span>
            <span>
              {deliveryFee === 0 ? <span className="text-green-600">Free</span> : `$${deliveryFee.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>

        {/* Delivery Estimate */}
        {selectedDelivery && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Estimated Delivery:</span>
              <span className="text-primary font-medium">{selectedDelivery.estimatedDays} days</span>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-4 pt-4 border-t space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            Secure checkout
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            30-day return policy
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            Licensed pharmacy
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
