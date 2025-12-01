import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
  uid: string
  email: string
  displayName: string | null
  photoURL: string | null
  role: "user" | "admin" | "pharmacist"
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.error = null
    },
  },
})

export const { setUser, setLoading, setError, setToken, logout } = authSlice.actions
export default authSlice.reducer
