"use client"

import Link from "next/link"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Menu } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const user = useSelector((state: RootState) => state.auth.user)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            Rx
          </div>
          <span className="hidden sm:inline text-xl text-foreground">Pharmtish</span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Heart className="h-6 w-6" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs text-accent-foreground flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <Link href="/profile">
                <Button size="sm" variant="outline" className="border-border bg-transparent">
                  {user.displayName || "Account"}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button size="sm" variant="ghost">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card space-y-2 px-4 py-4">
          <Link href="/shop" className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
            Shop
          </Link>
          <Link href="/doctors" className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
            Doctors
          </Link>
          <Link href="/about" className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
            About
          </Link>
          <Link href="/contact" className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
            Contact
          </Link>
        </div>
      )}
    </nav>
  )
}
