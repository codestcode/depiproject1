"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Menu, X, User, Heart, LogOut, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { AuthModal } from "@/components/auth-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { getTotalItems, toggleCart } = useCart()
  const { user, logout } = useAuth()

  const navigationItems = [
    { name: "Medicines", href: "/medicines" },
    { name: "Supplements", href: "/supplements" },
    { name: "Personal Care", href: "/personal-care" },
    { name: "Equipment", href: "/equipment" },
    { name: "First Aid", href: "/first-aid" },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b glass-strong">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg">
                <span className="text-lg font-bold">P</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PharmaCare
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/products"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                All Products
              </Link>
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={`/products?category=${item.href.replace("/", "")}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search medicines, supplements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 glass"
                />
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Heart className="h-5 w-5" />
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-strong">
                    <DropdownMenuItem className="font-medium">{user.name}</DropdownMenuItem>
                    <DropdownMenuItem className="text-xs text-muted-foreground">{user.email}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {user.role === "admin" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="flex items-center">
                            <Shield className="mr-2 h-4 w-4" />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}

              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10" onClick={toggleCart}>
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-primary to-secondary">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 glass"
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t glass"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/products"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    All Products
                  </Link>
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={`/products?category=${item.href.replace("/", "")}`}
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex items-center space-x-4 pt-4 border-t">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <Heart className="h-4 w-4" />
                      <span>Wishlist</span>
                    </Button>

                    {user ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{user.name}</span>
                        {user.role === "admin" && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin" className="flex items-center space-x-2">
                              <Shield className="h-4 w-4" />
                              <span>Admin</span>
                            </Link>
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={logout}>
                          <LogOut className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2"
                        onClick={() => setIsAuthModalOpen(true)}
                      >
                        <User className="h-4 w-4" />
                        <span>Sign In</span>
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 relative"
                      onClick={toggleCart}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Cart</span>
                      {getTotalItems() > 0 && (
                        <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-primary to-secondary">
                          {getTotalItems()}
                        </Badge>
                      )}
                    </Button>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
