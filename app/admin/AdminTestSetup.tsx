'use client'

import { useDispatch } from "react-redux"
import { setUser } from "@/lib/redux/slices/authSlice"

export default function AdminTestSetup() {
  const dispatch = useDispatch()

  // Set the admin user immediately, before any render
  dispatch(setUser({
    uid: "admin123",
    email: "admin@example.com",
    displayName: "Admin",
    photoURL: null,
    role: "admin",
  }))

  return null
}
