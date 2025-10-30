"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("pharmacy_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Demo authentication - in real app, this would be an API call
    if (email === "admin@pharmacy.com" && password === "admin123") {
      const adminUser = {
        id: "1",
        email: "admin@pharmacy.com",
        name: "Admin User",
        role: "admin" as const,
      }
      setUser(adminUser)
      localStorage.setItem("pharmacy_user", JSON.stringify(adminUser))
      setIsLoading(false)
      return true
    } else if (email === "user@pharmacy.com" && password === "user123") {
      const regularUser = {
        id: "2",
        email: "user@pharmacy.com",
        name: "John Doe",
        role: "user" as const,
      }
      setUser(regularUser)
      localStorage.setItem("pharmacy_user", JSON.stringify(regularUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)

    // Demo registration - in real app, this would be an API call
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      role: "user" as const,
    }

    setUser(newUser)
    localStorage.setItem("pharmacy_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pharmacy_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
