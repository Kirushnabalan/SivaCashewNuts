import { createContext, useState, useContext, useEffect, useReducer } from "react"
import { storage } from "@utils/helpers"
import { SHIPPING_COST } from "@constants"

export const CartContext = createContext(null)

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return action.payload

    case "ADD_ITEM": {
      const existingItem = state.find((item) => item._id === action.payload._id)

      if (existingItem) {
        return state.map((item) =>
          item._id === action.payload._id ? { ...item, quantity: item.quantity + action.payload.quantity } : item,
        )
      }

      return [...state, action.payload]
    }

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item._id === action.payload.id ? { ...item, quantity: Math.max(1, action.payload.quantity) } : item,
      )

    case "REMOVE_ITEM":
      return state.filter((item) => item._id !== action.payload.id)

    case "CLEAR_CART":
      return []

    default:
      return state
  }
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [])
  const [draftItems, setDraftItems] = useState(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = storage.get("cart") || []
    dispatch({ type: "LOAD_CART", payload: savedCart })
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    storage.set("cart", cart)
  }, [cart])

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getShippingCost = () => {
    return cart.length > 0 ? SHIPPING_COST : 0
  }

  const saveDraftItems = () => {
    setDraftItems([...cart])
  }

  const clearDraftItems = () => {
    setDraftItems(null)
  }

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getShippingCost,
    draftItems,
    saveDraftItems,
    clearDraftItems,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
