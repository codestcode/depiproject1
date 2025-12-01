import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  sidebarOpen: boolean
  loading: boolean
  modal: {
    isOpen: boolean
    type: string | null
    data: any
  }
  notification: {
    show: boolean
    message: string
    type: "success" | "error" | "info" | "warning"
  }
}

const initialState: UIState = {
  sidebarOpen: false,
  loading: false,
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
  notification: {
    show: false,
    message: "",
    type: "info",
  },
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    openModal: (state, action: PayloadAction<{ type: string; data?: any }>) => {
      state.modal.isOpen = true
      state.modal.type = action.payload.type
      state.modal.data = action.payload.data
    },
    closeModal: (state) => {
      state.modal.isOpen = false
      state.modal.type = null
      state.modal.data = null
    },
    showNotification: (state, action: PayloadAction<{ message: string; type: UIState["notification"]["type"] }>) => {
      state.notification.show = true
      state.notification.message = action.payload.message
      state.notification.type = action.payload.type
    },
    hideNotification: (state) => {
      state.notification.show = false
    },
  },
})

export const { toggleSidebar, setSidebarOpen, setLoading, openModal, closeModal, showNotification, hideNotification } =
  uiSlice.actions
export default uiSlice.reducer
