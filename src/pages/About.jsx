// src/pages/AboutPage.tsx (or .jsx if you prefer)
import { ArrowRight, Heart, Target, Shield, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            About <span className="text-primary">pharmtish</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted online pharmacy marketplace connecting patients with verified healthcare providers
            across the country.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-24">
        {/* Mission Section */}
        <section className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 text-primary font-semibold">
              <div className="h-1 w-12 bg-primary rounded-full" />
              Our Mission
            </div>
            <h2 className="text-4xl font-bold text-foreground">
              Making Quality Healthcare Accessible to Everyone
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                At pharmtish, we believe that buying medicines should be as easy as ordering food —{" "}
                <span className="text-foreground font-medium">fast, transparent, and 100% safe</span>.
              </p>
              <p>
                We built a marketplace that connects you directly with licensed pharmacies and doctors,
                ensuring every
                product you receive is genuine, properly stored, and delivered with care.
              </p>
              <p>
                No more waiting in lines. No more worrying about counterfeit drugs. Just reliable healthcare at your
                fingertips.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { icon: Target, title: "Revolutionize Access", desc: "Breaking barriers in healthcare delivery" },
              { icon: Shield, title: "Zero Compromise", desc: "On safety, quality authenticity" },
              { icon: Heart, title: "Patient First", desc: "Your health is our only priority" },
              { icon: Zap, title: "Lightning Fast", desc: "Medicines delivered in under 60 mins" },
            ].map((item, i) => (
              <Card
                key={i}
                className="p-6 border-border hover:border-primary/50 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <item.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Trust Transparency",
                desc: "Every pharmacy is verified. Every medicine is traceable. You always know exactly what you're getting.",
              },
              {
                title: "Uncompromising Quality",
                desc: "We partner only with FSSAI-licensed pharmacies and maintain cold-chain delivery for sensitive medicines.",
              },
              {
                title: "Accessibility for All",
                desc: "From cities to small towns — we deliver genuine medicines to every pin code in the country.",
              },
              {
                title: "Customer Obsession",
                desc: "24/7 support, easy returns, free doctor consults — because your peace of mind matters most.",
              },
              {
                title: "Innovation Speed",
                desc: "AI-powered search, real-time inventory, predictive refills — built for modern healthcare needs.",
              },
              {
                title: "Community Health",
                desc: "We donate a portion of every order to rural healthcare programs. Your purchase helps someone in need.",
              },
            ].map((value, i) => (
              <Card
                key={i}
                className="p-8 border-border hover:shadow-xl transition-shadow group"
              >
                <div className="mb-4 text-primary text-5xl font-bold opacity-10 group-hover:opacity-20 transition-opacity">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-3xl p-12 lg:p-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">By The Numbers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {[
              { number: "2.5M+", label: "Happy Customers" },
              { number: "50K+", label: "Daily Orders" },
              { number: "1500+", label: "Partner Pharmacies" },
              { number: "4.9", label: "Average Rating", suffix: " stars" },
            ].map((stat, i) => (
              <div key={i} className="space-y-3">
                <p className="text-5xl font-black text-primary">
                  {stat.number}
                  {stat.suffix && <span className="text-3xl">{stat.suffix}</span>}
                </p>
                <p className="text-lg text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-primary rounded-3xl p-12 lg:p-16 text-center text-primary-foreground">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Join the Future of Healthcare Today
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Experience pharmacy shopping that’s fast, safe, and actually cares about you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-10">
                Start Shopping Now
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-10">
                Create Free Account
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}