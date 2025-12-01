"use client"

import { Heart, Package, Shield, Zap, Search, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              Rx
            </div>
            <span className="text-xl font-bold text-foreground">pharmtish</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/doctors" className="text-foreground hover:text-primary transition-colors">
              Doctors
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                  Your Trusted <span className="text-primary">Online Pharmacy</span> Marketplace
                </h1>
                <p className="text-lg text-muted-foreground">
                  Buy authentic medicines and health products from verified pharmacies. Fast delivery, competitive
                  prices, and expert guidance.
                </p>
              </div>

              {/* Search Bar */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search medicines, vitamins, health products..."
                    className="pl-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Aspirin", "Vitamins", "Pain Relief", "Cold & Flu"].map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm hover:bg-accent/20 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Shopping
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/doctors">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 bg-transparent"
                  >
                    Find a Doctor
                  </Button>
                </Link>
              </div>
            </div>

           {/* Hero Section */}
<div className="relative w-full h-screen flex items-center justify-center bg-gray-50">
  {/* Background gradient blur */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl z-0" />

  {/* Hero card */}
  <div className="relative bg-card rounded-2xl border border-border shadow-xl overflow-hidden max-w-4xl w-full mx-4 lg:mx-0">
    {/* Hero image */}
    <img
      src="/alexandr-podvalny-tE7_jvK-_YU-unsplash (1).jpg"
      alt="Hero"
      className="w-full h-96 lg:h-[500px] object-cover"
    />

    {/* Overlay text */}
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white p-6 text-center">
      <h1 className="text-3xl lg:text-5xl font-bold mb-4">
        Medications Delivered Safely
      </h1>
      <p className="text-lg lg:text-xl max-w-2xl">
        Get your prescriptions delivered right to your doorstep quickly and safely.
      </p>
    </div>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Choose pharmtish?</h2>
            <p className="text-lg text-muted-foreground">Reliable pharmacy services with trusted providers</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Zap, title: "Fast Delivery", desc: "Get medicines within 24 hours" },
              { icon: Shield, title: "Verified Pharmacies", desc: "All sellers are verified and licensed" },
              { icon: Package, title: "Wide Selection", desc: "Thousands of authentic products" },
              { icon: Heart, title: "Expert Support", desc: "Get advice from licensed pharmacists" },
            ].map((feature, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-6 space-y-3 hover:shadow-lg hover:border-primary/50 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Shop?</h2>
            <p className="text-lg text-primary-foreground/90">
              Join thousands of satisfied customers getting their medicines from trusted pharmacies.
            </p>
          </div>
          <Link href="/register">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Create Account & Start Shopping
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                  Rx
                </div>
                <span className="font-bold text-foreground">pharmtish</span>
              </div>
              <p className="text-sm text-muted-foreground">Your trusted online pharmacy marketplace.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-primary transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              &copy; 2025 pharmtish. All rights reserved. Licensed and regulated pharmaceutical marketplace.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
