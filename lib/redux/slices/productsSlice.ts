import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  brand: string
  inStock: boolean
  rating: number
  reviews: number
  activeIngredients: string
  instructions: string
  sideEffects: string
  dosage: string
}

interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
  filters: {
    category: string
    brand: string
    priceRange: [number, number]
    inStock: boolean | null
  }
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    brand: "",
    priceRange: [0, 1000],
    inStock: null,
  },
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<ProductsState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
  },
})

export const { setProducts, setLoading, setError, setFilters } = productsSlice.actions
export default productsSlice.reducer
