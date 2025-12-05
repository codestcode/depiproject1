// src/pages/auth/LoginPage.jsx
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, Lock, Chrome, ArrowRight, Shield, CheckCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card } from "../components/ui/card"
import { auth } from "../../lib/firebase"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import { useDispatch } from "react-redux"
import { setUser, setError } from "../../lib/redux/slices/authSlice"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          role: "user",
        })
      )

      navigate("/shop")
    } catch (err) {
      const msg = err.code === "auth/wrong-password" || err.code === "auth/user-not-found"
        ? "Invalid email or password"
        : "Failed to sign in. Please try again."
      setError(msg)
      dispatch(setError(msg))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const user = userCredential.user

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          role: "user",
        })
      )

      navigate("/shop")
    } catch (err) {
      setError("Google sign-in failed. Try again.")
      dispatch(setError("Google sign-in failed"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full items-center">
        {/* Left: Welcome Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block space-y-10"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-2xl shadow-xl ring-4 ring-primary/20">
                Rx
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Pharmtish
              </h1>
            </div>

            <div>
              <h2 className="text-5xl font-black text-foreground mb-4">Welcome Back!</h2>
              <p className="text-xl text-muted-foreground">
                Sign in to access your account, track orders, and get your medicines delivered fast.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Secure & Private</h3>
                <p className="text-muted-foreground">Your data is encrypted and protected</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Trusted by Thousands</h3>
                <p className="text-muted-foreground">Over 100,000 happy customers in Egypt</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="p-10 border-border shadow-2xl bg-card/90 backdrop-blur-xl">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-black text-foreground mb-2">Sign In</h2>
                <p className="text-muted-foreground">Enter your details to continue</p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-destructive/10 border border-destructive/50 rounded-xl text-destructive text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Email/Password Form */}
              <form onSubmit={handleEmailLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-12 h-14 text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative mt-2">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-12 h-14 text-lg"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                variant="outline"
                className="w-full h-14 text-lg border-border hover:bg-muted"
              >
                <Chrome className="mr-3 h-6 w-6" />
                Sign in with Google
              </Button>

              <p className="text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/auth/register" className="font-bold text-primary hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}