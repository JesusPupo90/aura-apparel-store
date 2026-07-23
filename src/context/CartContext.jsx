/* ==========================================================================
   IMPORTS & CONFIG
   ========================================================================== */

import { createContext, useContext, useState, useCallback, useMemo } from "react"

const CartContext = createContext(null)

/* ==========================================================================
   STATE & HOOKS
   ========================================================================== */

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

/* ==========================================================================
   HANDLERS & LOGIC
   ========================================================================== */

  const addToCart = useCallback((product, size) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      )
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        }
        return updated
      }
      return [...prev, { product, size, quantity: 1 }]
    })

    setIsCartOpen(true)
  }, [])

  const removeFromCart = useCallback((productId, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    )
  }, [])

  const updateQuantity = useCallback((productId, size, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size)
      return
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const totalPriceUSD = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const price = Number(item.product.priceUSD)
      const qty = Number(item.quantity)
      if (isNaN(price) || isNaN(qty) || price < 0 || qty < 0) return acc
      return acc + price * qty
    }, 0)
  }, [cartItems])

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const qty = Number(item.quantity)
      if (isNaN(qty) || qty < 0) return acc
      return acc + qty
    }, 0)
  }, [cartItems])

  const value = useMemo(
    () => ({
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalPriceUSD,
      totalItemsCount,
    }),
    [
      cartItems,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalPriceUSD,
      totalItemsCount,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
