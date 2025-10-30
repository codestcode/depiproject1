"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Truck, Clock, Zap } from "lucide-react"
import { checkoutFormSchema, type CheckoutFormData, deliveryOptions, paymentMethods } from "@/lib/validation"
import { motion } from "framer-motion"

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void
  isSubmitting: boolean
}

export function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const [selectedDelivery, setSelectedDelivery] = useState<string>("")
  const [selectedPayment, setSelectedPayment] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      deliveryOption: "standard",
      paymentMethod: "cash-on-delivery",
    },
  })

  const watchedDelivery = watch("deliveryOption")
  const watchedPayment = watch("paymentMethod")
  const watchedTerms = watch("agreeToTerms")

  const handleDeliveryChange = (value: string) => {
    setSelectedDelivery(value)
    setValue("deliveryOption", value as any)
  }

  const handlePaymentChange = (value: string) => {
    setSelectedPayment(value)
    setValue("paymentMethod", value as any)
  }

  const getDeliveryIcon = (id: string) => {
    switch (id) {
      case "standard":
        return <Truck className="h-5 w-5" />
      case "express":
        return <Zap className="h-5 w-5" />
      case "same-day":
        return <Clock className="h-5 w-5" />
      default:
        return <Truck className="h-5 w-5" />
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Customer Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" {...register("lastName")} className={errors.lastName ? "border-destructive" : ""} />
              {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phone")}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Address */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="streetAddress">Street Address *</Label>
            <Input
              id="streetAddress"
              placeholder="123 Main Street, Apt 4B"
              {...register("streetAddress")}
              className={errors.streetAddress ? "border-destructive" : ""}
            />
            {errors.streetAddress && <p className="text-sm text-destructive mt-1">{errors.streetAddress.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input id="city" {...register("city")} className={errors.city ? "border-destructive" : ""} />
              {errors.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input id="state" {...register("state")} className={errors.state ? "border-destructive" : ""} />
              {errors.state && <p className="text-sm text-destructive mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input id="zipCode" {...register("zipCode")} className={errors.zipCode ? "border-destructive" : ""} />
              {errors.zipCode && <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="deliveryNotes">Delivery Notes (Optional)</Label>
            <Textarea
              id="deliveryNotes"
              placeholder="Special instructions for delivery..."
              {...register("deliveryNotes")}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Delivery Options */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Options</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={watchedDelivery} onValueChange={handleDeliveryChange} className="space-y-3">
            {deliveryOptions.map((option) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                  watchedDelivery === option.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleDeliveryChange(option.id)}
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <div className="flex items-center space-x-3 flex-1">
                  <div className="text-primary">{getDeliveryIcon(option.id)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={option.id} className="font-medium cursor-pointer">
                          {option.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      <div className="text-right">
                        {option.price === 0 ? (
                          <Badge variant="secondary">Free</Badge>
                        ) : (
                          <span className="font-semibold">${option.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </RadioGroup>
          {errors.deliveryOption && <p className="text-sm text-destructive mt-2">{errors.deliveryOption.message}</p>}
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={watchedPayment} onValueChange={handlePaymentChange} className="space-y-3">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                  watchedPayment === method.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onClick={() => handlePaymentChange(method.id)}
              >
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="flex items-center space-x-3 flex-1">
                  <div className="text-2xl">{method.icon}</div>
                  <div>
                    <Label htmlFor={method.id} className="font-medium cursor-pointer">
                      {method.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </RadioGroup>
          {errors.paymentMethod && <p className="text-sm text-destructive mt-2">{errors.paymentMethod.message}</p>}
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreeToTerms"
              {...register("agreeToTerms")}
              onCheckedChange={(checked) => setValue("agreeToTerms", checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="agreeToTerms" className="cursor-pointer">
                I agree to the{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </Label>
              {errors.agreeToTerms && <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !watchedTerms}>
        {isSubmitting ? "Processing Order..." : "Place Order"}
      </Button>
    </form>
  )
}
