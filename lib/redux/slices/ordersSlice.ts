import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Order {
  id: string
  userId: string
  items: Array<{
    productId: string
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  shippingAddress: string
  paymentMethod: "cash" | "card" | "wallet"
  createdAt: number
  updatedAt: number
}

interface OrdersState {
  items: Order[]
  loading: boolean
  error: string | null
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.items.push(action.payload)
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.items.findIndex((order) => order.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setOrders, addOrder, updateOrder, setLoading, setError } = ordersSlice.actions
export default ordersSlice.reducer
