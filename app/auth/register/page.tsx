"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"
import { useDispatch } from "react-redux"
import { setUser, setError } from "@/lib/redux/slices/authSlice"
import { Mail, Lock, User, Chrome, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setErrorState] = useState("")
  const [step, setStep] = useState(1)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required"
    if (!formData.email.includes("@")) return "Valid email is required"
    if (formData.password.length < 6) return "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) return "Passwords do not match"
    return null
  }

  const isDemoMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateForm()

    if (validationError) {
      setErrorState(validationError)
      return
    }

    setLoading(true)
    setErrorState("")

    try {
      if (isDemoMode) {
        console.log("[v0] Demo mode: Creating account locally", formData)

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Store in localStorage for demo
        const demoUser = {
          uid: `demo_${Date.now()}`,
          email: formData.email,
          displayName: formData.name,
          photoURL: null,
          role: "user",
        }
        localStorage.setItem("demoUser", JSON.stringify(demoUser))

        dispatch(setUser(demoUser))
        setStep(2)
        setTimeout(() => router.push("/shop"), 2000)
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        const user = userCredential.user

        await updateProfile(user, { displayName: formData.name })

        // Create user document in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: formData.name,
          email: formData.email,
          role: "user",
          createdAt: new Date(),
          wallet: 0,
          loyaltyPoints: 0,
        })

        dispatch(
          setUser({
            uid: user.uid,
            email: user.email || "",
            displayName: formData.name,
            photoURL: null,
            role: "user",
          }),
        )

        setStep(2)
        setTimeout(() => router.push("/shop"), 2000)
      }
    } catch (firebaseError: any) {
      // Parse Firebase error codes for better UX
      let userFriendlyError = firebaseError.message || "Failed to create account"

      if (firebaseError.code === "auth/email-already-in-use") {
        userFriendlyError = "This email is already registered. Please log in or use a different email."
      } else if (firebaseError.code === "auth/weak-password") {
        userFriendlyError = "Password is too weak. Use at least 6 characters with a mix of letters and numbers."
      } else if (firebaseError.code === "auth/invalid-email") {
        userFriendlyError = "Invalid email address. Please check and try again."
      } else if (firebaseError.code === "auth/invalid-credential" || firebaseError.code === "auth/invalid-api-key") {
        userFriendlyError =
          "Firebase is not properly configured. Please add your Firebase credentials to Vars section or use demo mode."
      }

      console.error("[v0] Firebase registration error:", firebaseError)
      setErrorState(userFriendlyError)
      dispatch(setError(userFriendlyError))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    if (isDemoMode) {
      setErrorState("Google Sign-In requires Firebase configuration")
      return
    }

    setLoading(true)
    setErrorState("")

    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const user = userCredential.user

      // Create user document in Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName || "User",
          email: user.email,
          role: "user",
          createdAt: new Date(),
          wallet: 0,
          loyaltyPoints: 0,
        },
        { merge: true },
      )

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
      let userFriendlyError = err.message || "Failed to sign up with Google"

      if (err.code === "auth/invalid-credential" || err.code === "auth/invalid-api-key") {
        userFriendlyError = "Firebase is not properly configured. Add your credentials to proceed."
      }

      console.error("[v0] Google registration error:", userFriendlyError)
      setErrorState(userFriendlyError)
      dispatch(setError(userFriendlyError))
    } finally {
      setLoading(false)
    }
  }

  if (step === 2) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-8 border-border text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Account Created!</h2>
            <p className="text-xl text-muted-foreground">
              Welcome to pharmatish! Your account has been successfully created. Redirecting you to start shopping...
            </p>
          </div>
        </Card>
      </div>
    )
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
              <span className="text-2xl font-bold text-foreground">pharmatish</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground">Get Started</h1>
            <p className="text-xl text-muted-foreground">
              Join our community and access quality medicines from verified pharmacies.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: CheckCircle, title: "Quick Setup", desc: "Create your account in just a few seconds" },
              { icon: Mail, title: "Easy Sign Up", desc: "Use email or Google to register instantly" },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-secondary" />
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
                <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
                <p className="text-sm text-muted-foreground mt-1">Join parmatishtoday</p>
              </div>

              {isDemoMode && (
                <div className="p-4 rounded-lg">
                  {/* <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" /> */}
                  <div>
                    {/* <p className="font-semibold">Demo Mode Active</p>
                    <p className="text-xs mt-1">
                      Using local storage. To enable Firebase, add your credentials to the <strong>Vars</strong>{" "}
                      section:
                    </p> */}
                    {/* <ul className="text-xs mt-2 space-y-1 ml-2 list-disc">
                      <li>NEXT_PUBLIC_FIREBASE_API_KEY</li>
                      <li>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</li>
                      <li>NEXT_PUBLIC_FIREBASE_PROJECT_ID</li>
                      <li>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</li>
                      <li>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</li>
                      <li>NEXT_PUBLIC_FIREBASE_APP_ID</li>
                    </ul> */}
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleEmailRegister} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 bg-card border-border"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-card border-border"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 bg-card border-border"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 bg-card border-border"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                >
                  {loading ? "Creating Account..." : "Create Account"}
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
                onClick={handleGoogleRegister}
                disabled={loading || isDemoMode}
                variant="outline"
                className="w-full border-border text-foreground hover:bg-muted bg-transparent"
              >
                <Chrome className="mr-2 h-4 w-4" />
                Sign up with Google
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/auth/login" className="font-semibold text-secondary hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
