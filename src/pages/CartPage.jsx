// src/pages/CartPage.jsx
import { useState } from "react"
import { Link } from "react-router-dom"
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { motion } from "framer-motion"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart, updateQuantity, clearCart } from "../../lib/redux/slices/cartSlice"

export default function CartPage() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart?.items || [])
  const cartTotal = useSelector((state) => state.cart?.total || 0)
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(cartTotal * 0.1)
    } else {
      setDiscount(0)
      alert("Invalid promo code!")
    }
  }

  const finalTotal = cartTotal - discount
  const tax = finalTotal * 0.14 // 14% VAT in Egypt
  const shippingFee = finalTotal > 500 ? 0 : 49 // Free shipping over 500 EGP

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto"
          >
            <ShoppingBag className="w-32 h-32 text-primary/30 mx-auto mb-8" />
            <h1 className="text-4xl font-black text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-muted-foreground mb-10">
              Looks like you haven't added anything yet.
            </p>
            <Link to="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-10 py-7 shadow-xl">
                Start Shopping
                <ArrowRight className="ml-3 h-5 w-5" />
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
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-black text-center mb-12 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
        >
          Your Shopping Cart
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-6 border-border hover:shadow-lg hover:shadow-xl transition-all duration-300 bg-card/90 backdrop-blur">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-muted ring-4 ring-primary/10">
                      <img
                        src={item.image || "/images/products/placeholder.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                      <p className="text-lg font-semibold text-primary mt-1">
                        {item.price.toFixed(2)} L.E
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-6">
                        <div className="flex items-center border border-border rounded-xl">
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  productId: item.productId,
                                  quantity: Math.max(1, item.quantity - 1),
                                })
                              )
                            }
                            className="p-3 hover:bg-muted rounded-l-xl transition-colors"
                          >
                            <Minus className="h-5 w-5" />
                          </button>
                          <span className="px-6 py-3 font-bold text-lg min-w-16 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))
                            }
                            className="p-3 hover:bg-muted rounded-r-xl transition-colors"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                        </div>

                        <button
                          onClick={() => dispatch(removeFromCart(item.productId))}
                          className="ml-auto p-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all"
                        >
                          <Trash2 className="h-6 w-6" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="mt-6 text-right">
                        <p className="text-2xl font-black text-primary">
                          {(item.price * item.quantity).toFixed(2)} L.E
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            <div className="text-right">
              <Button
                onClick={() => dispatch(clearCart())}
                variant="destructive"
                size="lg"
                className="shadow-lg"
              >
                Clear All Items
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-8 border-border shadow-2xl bg-card/95 backdrop-blur-xl sticky top-24">
                <h2 className="text-3xl font-black mb-8 text-foreground">Order Summary</h2>

                {/* Promo Code */}
                <div className="space-y-4 mb-8">
                  <label className="text-lg font-bold">Have a promo code?</label>
                  <div className="flex gap-3">
                    <Input
                      placeholder="e.g. SAVE10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="h-12 text-lg"
                    />
                    <Button onClick={handleApplyPromo} size="lg" className="px-8">
                      Apply
                    </Button>
                  </div>
                  {discount > 0 && (
                    <Badge className="text-lg py-2 px-4 bg-green-500/20 text-green-600 border-green-500/50">
                      SAVE10 applied — You saved {discount.toFixed(2)} L.E!
                    </Badge>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-4 text-lg border-t border-border pt-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">{cartTotal.toFixed(2)} L.E</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-bold">-{(discount).toFixed(2)} L.E</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT (14%)</span>
                    <span>{tax.toFixed(2)} L.E</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shippingFee === 0 ? "text-green-600 font-bold" : ""}>
                      {shippingFee === 0 ? "FREE" : `${shippingFee} L.E`}
                    </span>
                  </div>

                  {shippingFee === 0 && (
                    <p className="text-sm text-green-600 mt-1">Free shipping applied!</p>
                  )}
                </div>

                <div className="border-t-2 border-dashed border-primary/20 pt-6 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black">Total</span>
                    <span className="text-4xl font-black text-primary">
                      {(finalTotal + tax + shippingFee).toFixed(2)} L.E
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mt-10">
                  <Link to="/checkout" className="block">
                    <Button
                      size="lg"
                      className="w-full h-16 text-xl font-bold bg-primary hover:bg-primary/90 shadow-2xl hover:shadow-primary/30"
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-4 h-6 w-6" />
                    </Button>
                  </Link>

                  <Link to="/shop" className="block">
                    <Button variant="outline" size="lg" className="w-full h-12 border-border">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}