import { Product, ProductCart } from '@/types/product'
import { create } from 'zustand'

interface CartState {
  cart: ProductCart[]
  add: (product: ProductCart) => void
  edit: (product: ProductCart) => void
}

const useCartStore = create<CartState>()((set, get) => ({
  cart: [],
  add: (product: ProductCart) => {
    set((state) => {
      const existingProduct = state.cart.find(
        (p) => p.id === product.id && p.variant?.id === product.variant?.id,
      )

      if (existingProduct) {
        existingProduct.qty += product.qty
      } else {
        state.cart.push(product)
      }

      return { cart: [...state.cart] }
    })
  },
  edit: (product: ProductCart) => {
    set((state) => {
      const existingProductIndex = state.cart.findIndex(
        (p) => p.id === product.id,
      )

      if (existingProductIndex !== -1) {
        const updatedProduct = { ...state.cart[existingProductIndex] }
        updatedProduct.qty = product.qty ?? updatedProduct.qty
        updatedProduct.price = product.price ?? updatedProduct.price

        state.cart[existingProductIndex] = updatedProduct
      }

      return { cart: [...state.cart] }
    })
  },
}))

export default useCartStore
