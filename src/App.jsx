// src/App.jsx
import React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"  // ← ADD THIS LINE
import { setProducts } from "../lib/redux/slices/productsSlice"  // ← Import the action
import { MOCK_PRODUCTS } from "../lib/mock-data"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AboutPage from "./pages/About"
import Navbar from "./components/navbar"
import Shop from "./pages/Shop"
import Doctors from "./pages/Doctors"
import Contact from "./pages/Contact"
import Cart from "./pages/CartPage"
import Wishlist from "./pages/wish"
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Admin from "./pages/admin/Admin"
import ProductDetails from "./pages/productdet"


function App() {
  const dispatch = useDispatch()  // ← NOW IT WORKS!

  useEffect(() => {
    const saved = localStorage.getItem("adminProducts")
    if (saved) {
      dispatch(setProducts(JSON.parse(saved)))
    } else {
      dispatch(setProducts(MOCK_PRODUCTS))  
    }
  }, [dispatch])

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/product/:id" element={<ProductDetails />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App