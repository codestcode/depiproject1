"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin" | "manager"
}

interface AdminContextType {
  user: AdminUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for existing admin session
    const adminSession = localStorage.getItem("admin-session")
    if (adminSession) {
      const userData = JSON.parse(adminSession)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple demo authentication - in real app, this would be an API call
    if (email === "admin@pharmacy.com" && password === "admin123") {
      const adminUser: AdminUser = {
        id: "1",
        email: "admin@pharmacy.com",
        name: "Admin User",
        role: "admin",
      }
      setUser(adminUser)
      setIsAuthenticated(true)
      localStorage.setItem("admin-session", JSON.stringify(adminUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("admin-session")
  }

  return <AdminContext.Provider value={{ user, login, logout, isAuthenticated }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
