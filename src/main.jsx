// src/main.jsx
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import { store } from "../lib/redux/store"   // ← this line was missing
import App from "./App.jsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)