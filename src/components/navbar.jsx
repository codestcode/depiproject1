// src/components/Navbar.jsx
import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import {
  Heart,
  ShoppingCart,
  Menu,
  X,
  User,
  LogIn,
  Pill,
  Stethoscope,
  Info,
  Phone,
  UserCircle,
} from "lucide-react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart?.items || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const user = useSelector((state) => state.auth?.user);

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const navLinks = [
    { to: "/shop", label: "Shop", icon: Pill },
    { to: "/doctors", label: "Doctors", icon: Stethoscope },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold text-xl">
              Rx
            </div>
            <span className="hidden sm:block text-xl font-semibold text-[#0B3B40]">
              Pharmtish
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[#0B3B40]/80 hover:text-teal-600 transition font-medium flex items-center gap-2"
              >
                <link.icon className="h-5 w-5 text-teal-600" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4">

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <Heart className="h-6 w-6 text-[#0B3B40]/70" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <ShoppingCart className="h-6 w-6 text-[#0B3B40]/70" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {user ? (
              <Link
                to="/profile"
                className="hidden sm:flex items-center gap-3 px-3 py-2 border rounded-lg hover:border-teal-500 transition"
              >
                <div className="h-8 w-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold">
                  {user.displayName?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user.displayName}</span>
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button variant="ghost" className="text-[#0B3B40]">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    Create Account
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
            >
              <Menu className="h-6 w-6 text-[#0B3B40]" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-0 bg-white z-50 shadow-xl"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-lg font-semibold text-[#0B3B40]">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* LINKS */}
            <div className="px-6 py-6 space-y-6 text-[#0B3B40]">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-lg"
                >
                  <link.icon className="h-6 w-6 text-teal-600" />
                  {link.label}
                </Link>
              ))}

              <hr className="border-gray-200" />

              {/* Wishlist */}
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-lg"
              >
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  Wishlist
                </div>
                {wishlistItems.length > 0 && (
                  <span className="bg-red-500 text-white text-sm px-2 rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-lg"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-6 w-6 text-teal-600" />
                  Cart
                </div>
                {cartCount > 0 && (
                  <span className="bg-teal-600 text-white text-sm px-2 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Auth */}
              {!user ? (
                <div className="space-y-4 pt-4">
                  <Link to="/login">
                    <Button variant="outline" className="w-full h-12 text-[#0B3B40]">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white">
                      Create Account
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link
                  to="/profile"
                  className="flex items-center gap-3 py-4 px-3 border rounded-lg mt-4"
                >
                  <div className="h-10 w-10 bg-teal-600 rounded-full text-white flex items-center justify-center font-semibold">
                    {user.displayName?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-lg">{user.displayName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
