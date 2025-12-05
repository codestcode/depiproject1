// src/pages/LandingPage.jsx
import { useEffect } from "react"
import { motion } from "framer-motion"
import {
  Search,
  ChevronRight,
  Truck,
  Shield,
  Pill,
  Stethoscope,
  CheckCircle2,
  Package,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Card } from "../components/ui/card"

export default function LandingPage() {
  const features = [
    { icon: Truck, title: "Same-Day Delivery", desc: "In major cities", color: "text-green-600" },
    { icon: Shield, title: "100% Genuine", desc: "FSSAI & pharmacy licensed", color: "text-blue-600" },
    { icon: Pill, title: "25,000+ Medicines", desc: "From trusted brands", color: "text-purple-600" },
    { icon: Stethoscope, title: "Free Doctor Consult", desc: "With every order above ₹999", color: "text-pink-600" },
  ]

  const stats = [
    { number: "2.5M+", label: "Happy Customers" },
    { number: "50K+", label: "Daily Orders" },
    { number: "4.8", label: "App Rating", suffix: " stars" },
    { number: "1500+", label: "Partner Pharmacies" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24">
  {/* Soft medical gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-teal-50" />

  <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

    {/* LEFT */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="space-y-8"
    >
      <Badge className="px-4 py-1 text-sm bg-sky-100 text-sky-700 border-sky-200">
        India’s Most Trusted Pharmacy
      </Badge>

      <h1 className="text-5xl sm:text-6xl font-black leading-tight">
        Get Your Medicines
        <br />
        <span className="bg-gradient-to-r from-sky-700 to-teal-500 bg-clip-text text-transparent">
          Delivered Fast & Safely
        </span>
      </h1>

      <p className="text-xl text-gray-600 max-w-xl">
        Verified pharmacies · Genuine products · Affordable care.
      </p>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative max-w-lg"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
        <Input
          type="text"
          placeholder="Search medicines..."
          className="pl-12 pr-32 h-14 text-lg bg-white shadow-md rounded-2xl border-gray-200"
        />
        <Button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 rounded-xl">
          Search
        </Button>
      </motion.div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3">
        {["Paracetamol", "Insulin", "Vitamins", "Skin Care"].map((tag) => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-full bg-sky-50 text-sky-700 border border-sky-100"
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </motion.div>

    {/* RIGHT — IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative"
    >
      <div className="absolute -inset-6 bg-sky-200/30 rounded-3xl blur-2xl" />
      <img
        src="/images/hero.jpg"
        alt="Medical delivery"
        className="relative rounded-3xl border shadow-xl object-cover w-full h-[550px]"
      />
    </motion.div>
  </div>
</section>


      {/* Features Grid */}
<section className="px-4 py-20 bg-sky-50/40">
  <div className="mx-auto max-w-7xl">
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-14"
    >
      <h2 className="text-4xl font-bold text-gray-900">Why Choose Pharmtish?</h2>
      <p className="text-lg text-gray-600 mt-2">
        Trusted healthcare delivered to you.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Card className="p-8 text-center rounded-3xl border border-sky-100 hover:shadow-xl bg-white transition-all">
            <motion.div whileHover={{ scale: 1.1 }}>
              <div className="p-4 inline-flex rounded-2xl bg-sky-100 mb-6">
                <feature.icon className="h-10 w-10 text-sky-600" />
              </div>
            </motion.div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.desc}</p>
          </Card>
        </motion.div>
      ))}
    </div>

  </div>
</section>


      {/* CTA Section */}
<motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-b from-sky-50 to-white border-t border-sky-100 mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-bold text-sky-700 mb-4">Pharmtish</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your trusted online pharmacy.  
              Safe · Fast · Affordable.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-lg font-semibold text-sky-900 mb-3">Pages</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a className="hover:text-sky-600 transition" href="/about">About</a></li>
              <li><a className="hover:text-sky-600 transition" href="/contact">Contact</a></li>
              <li><a className="hover:text-sky-600 transition" href="/faq">FAQ</a></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-lg font-semibold text-sky-900 mb-3">Services</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Medicine Delivery</li>
              <li>Lab Tests</li>
              <li>Doctor Consult</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-lg font-semibold text-sky-900 mb-3">Support</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Email: support@pharmtish.com</li>
              <li>Phone: +20 123 456 789</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-sky-100 mt-10 pt-6 flex flex-col sm:flex-row justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Pharmtish</p>
          <p className="text-sky-700 font-medium">Healthier. Faster. Safer.</p>
        </div>
      </div>
    </motion.footer>


    </div>
  )
}