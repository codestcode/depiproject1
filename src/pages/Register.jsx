// src/pages/auth/RegisterPage.jsx
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Mail,
  Lock,
  User,
  Chrome,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Shield,
  Package,
  Sparkles,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card } from "../components/ui/card"
import { auth, db } from "../../lib/firebase"
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useDispatch } from "react-redux"
import { setUser, setError } from "../../lib/redux/slices/authSlice"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) return "Full name is required"
    if (!formData.email.includes("@")) return "Valid email required"
    if (formData.password.length < 6) return "Password must be 6+ characters"
    if (formData.password !== formData.confirmPassword) return "Passwords don't match"
    return null
  }

  const handleEmailRegister = async (e) => {
    e.preventDefault()
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError("")

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      const user = userCredential.user

      await updateProfile(user, { displayName: formData.name })

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        role: "user",
        createdAt: new Date().toISOString(),
        wallet: 0,
        loyaltyPoints: 0,
      })

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email || "",
          displayName: formData.name,
          photoURL: user.photoURL || "",
          role: "user",
        })
      )

      setSuccess(true)
      setTimeout(() => navigate("/shop"), 5000)
    } catch (err) {
      let msg = "Failed to create account"
      if (err.code === "auth/email-already-in-use") msg = "Email already registered"
      if (err.code === "auth/weak-password") msg = "Password too weak"
      setError(msg)
      dispatch(setError(msg))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setLoading(true)
    setError("")
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName || "User",
          email: user.email,
          photoURL: user.photoURL,
          role: "user",
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      )

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          role: "user",
        })
      )

      setSuccess(true)
      setTimeout(() => navigate("/shop"), 5000)
    } catch (err) {
      setError("Google sign-up failed")
    } finally {
      setLoading(false)
    }
  }

  // SUCCESS SCREEN — Beautiful!
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-emerald-50 flex items-center justify-center p-4 overflow-hidden">
        {/* Confetti Animation */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 1 }}
              animate={{
                y: 1200,
                opacity: 0,
                x: Math.sin(i) * 200,
                rotate: Math.random() * 720,
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                delay: i * 0.05,
                repeat: Infinity,
                repeatDelay: 8,
              }}
              className="absolute w-4 h-4 rounded-full"
              style={{
                backgroundColor: ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"][i % 5],
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl relative z-10"
        >
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-40 h-40 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-10 shadow-2xl flex items-center justify-center"
          >
            <CheckCircle className="w-24 h-24 text-white" />
          </motion.div>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-black mb-6 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent"
          >
            Welcome to Pharmtish!
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-foreground mb-12"
          >
            Your account has been created successfully
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-card/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-border/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="font-bold text-lg">100% Secure</p>
              </div>
              <div className="text-center">
                <Package className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="font-bold text-lg">Fast Delivery</p>
              </div>
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="font-bold text-lg">Exclusive Offers</p>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-lg text-muted-foreground mt-12"
          >
            Redirecting you to shopping in a few seconds...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  // MAIN REGISTRATION FORM
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full items-center">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block space-y-10"
        >
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-black text-3xl shadow-2xl ring-8 ring-primary/20">
                Rx
              </div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Pharmtish
              </h1>
            </div>

            <div>
              <h2 className="text-5xl font-black text-foreground mb-6">
                Join the Future of Pharmacy
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Get medicines delivered in 60 minutes from verified pharmacies across Egypt.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">100% Genuine Medicines</h3>
                  <p className="text-muted-foreground">From licensed pharmacies only</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Secure & Private</h3>
                  <p className="text-muted-foreground">Your health data is fully protected</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-lg mx-auto"
        >
          <Card className="p-10 border-border shadow-2xl bg-card/95 backdrop-blur-xl">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-black text-foreground mb-2">Create Account</h2>
                <p className="text-lg text-muted-foreground">
                  Join thousands getting medicines delivered fast
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-destructive/10 border border-destructive/50 rounded-xl text-destructive flex items-center gap-3"
                >
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleEmailRegister} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ahmed Mohamed"
                      required
                      className="pl-12 h-14 text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ahmed@example.com"
                      required
                      className="pl-12 h-14 text-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        className="pl-12 h-14 text-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        className="pl-12 h-14 text-lg"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 text-xl font-bold bg-primary hover:bg-primary/90 shadow-2xl"
                >
                  {loading ? "Creating Account..." : "Create My Account"}
                  <ArrowRight className="ml-4 h-6 w-6" />
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-6 bg-card text-muted-foreground">or continue with</span>
                </div>
              </div>

              <Button
                onClick={handleGoogleRegister}
                disabled={loading}
                variant="outline"
                className="w-full h-14 text-lg border-border hover:bg-muted"
              >
                <Chrome className="mr-4 h-6 w-6" />
                Continue with Google
              </Button>

              <p className="text-center text-muted-foreground">
                Already have an account?{" "}
                <Link to="/auth/login" className="font-bold text-primary hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}