"use client"

import Link from "next/link"
import { ArrowRight, Heart, Target, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">About pharmtish</h1>
          <p className="text-xl text-muted-foreground">
            Your trusted online pharmacy marketplace connecting patients with verified healthcare providers
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
        {/* Mission */}
        <section className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At pharmtish, our mission is to make quality healthcare and pharmaceutical products accessible to
              everyone. We believe that buying medicines should be convenient, transparent, and safe.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By connecting patients with verified pharmacies and healthcare professionals, we're building a marketplace
              that prioritizes health, safety, and convenience.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { icon: Target, title: "Our Goal", desc: "Revolutionize online pharmacy" },
              { icon: Shield, title: "Our Promise", desc: "Safe and authentic products" },
              { icon: Heart, title: "Our Focus", desc: "Patient wellbeing" },
              { icon: Zap, title: "Our Service", desc: "Fast and reliable" },
            ].map((item, i) => (
              <Card key={i} className="p-6 border-border">
                <item.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-foreground text-center">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Trust & Transparency",
                description:
                  "We verify every pharmacy and healthcare provider to ensure you get authentic products and reliable services.",
              },
              {
                title: "Accessibility",
                description:
                  "Healthcare should be accessible to everyone. We work to make quality medicines and expert advice available to all.",
              },
              {
                title: "Quality & Safety",
                description:
                  "We maintain the highest standards of quality assurance to ensure every product meets international safety guidelines.",
              },
              {
                title: "Customer Focus",
                description:
                  "Your health and satisfaction are our top priorities. We continuously improve based on your feedback.",
              },
              {
                title: "Innovation",
                description:
                  "We leverage technology to make pharmacy shopping faster, easier, and more convenient for everyone.",
              },
              {
                title: "Community",
                description:
                  "We believe in building a community of trusted healthcare providers working together for better health outcomes.",
              },
            ].map((value, i) => (
              <Card key={i} className="p-6 border-border">
                <h3 className="font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-12 space-y-8">
          <h2 className="text-3xl font-bold text-foreground text-center">By The Numbers</h2>
          <div className="grid gap-8 md:grid-cols-4 text-center">
            {[
              { number: "50K+", label: "Products" },
              { number: "1000+", label: "Verified Pharmacies" },
              { number: "100K+", label: "Happy Customers" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground rounded-lg p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Join Us?</h2>
          <p className="text-lg text-primary-foreground/90">
            Start shopping from trusted pharmacies today and experience the difference.
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Browse Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>
      </div>
    </div>
  )
}
