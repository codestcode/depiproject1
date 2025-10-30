"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Pill, Heart, Sparkles, Stethoscope, Badge as Bandage, Baby } from "lucide-react"

const categories = [
  {
    name: "Medicines",
    description: "Prescription & OTC drugs",
    icon: Pill,
    href: "/medicines",
    color: "bg-primary/10 text-primary",
    count: "500+ products",
  },
  {
    name: "Supplements",
    description: "Vitamins & minerals",
    icon: Sparkles,
    href: "/supplements",
    color: "bg-accent/10 text-accent",
    count: "200+ products",
  },
  {
    name: "Personal Care",
    description: "Beauty & hygiene",
    icon: Heart,
    href: "/personal-care",
    color: "bg-pink-100 text-pink-600",
    count: "300+ products",
  },
  {
    name: "Medical Equipment",
    description: "Devices & instruments",
    icon: Stethoscope,
    href: "/equipment",
    color: "bg-blue-100 text-blue-600",
    count: "150+ products",
  },
  {
    name: "First Aid",
    description: "Emergency supplies",
    icon: Bandage,
    href: "/first-aid",
    color: "bg-red-100 text-red-600",
    count: "100+ products",
  },
  {
    name: "Baby Care",
    description: "Infant health products",
    icon: Baby,
    href: "/baby-care",
    color: "bg-yellow-100 text-yellow-600",
    count: "80+ products",
  },
]

export function CategoriesGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you need from our comprehensive range of healthcare products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={category.href}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${category.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-2">{category.description}</p>
                          <p className="text-xs text-primary font-medium">{category.count}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
