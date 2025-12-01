"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useDispatch } from "react-redux"
import { setUser, setError } from "@/lib/redux/slices/authSlice"
import { Mail, Lock, Chrome, ArrowRight, Shield } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoadingState] = useState(false)
  const [error, setErrorState] = useState("")
  const router = useRouter()
  const dispatch = useDispatch()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingState(true)
    setErrorState("")

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: "user",
        }),
      )

      router.push("/shop")
    } catch (err: any) {
      const errorMessage = err.message || "Failed to sign in"
      setErrorState(errorMessage)
      dispatch(setError(errorMessage))
    } finally {
      setLoadingState(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoadingState(true)
    setErrorState("")

    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const user = userCredential.user

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: "user",
        }),
      )

      router.push("/shop")
    } catch (err: any) {
      const errorMessage = err.message || "Failed to sign in with Google"
      setErrorState(errorMessage)
      dispatch(setError(errorMessage))
    } finally {
      setLoadingState(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 max-w-6xl w-full items-center">
        {/* Left side - Info */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                Rx
              </div>
              <span className="text-2xl font-bold text-foreground">Pharmacist</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-xl text-muted-foreground">
              Sign in to access your pharmacy marketplace account and manage your orders.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Shield,
                title: "Secure Authentication",
                desc: "Your account is protected with industry-standard security",
              },
              { icon: Mail, title: "Easy Access", desc: "Sign in with email or Google for quick account access" },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Form */}
        <div>
          <Card className="w-full max-w-md mx-auto p-8 border-border">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Sign In</h2>
                <p className="text-sm text-muted-foreground mt-1">Enter your credentials to continue</p>
              </div>

              {error && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-card border-border"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-card border-border"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  {loading ? "Signing In..." : "Sign In"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">or</span>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                variant="outline"
                className="w-full border-border text-foreground hover:bg-muted bg-transparent"
              >
                <Chrome className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href="/auth/register" className="font-semibold text-primary hover:underline">
                  Create one now
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
