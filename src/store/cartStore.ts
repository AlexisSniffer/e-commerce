import { ProductCart } from '@/types/product'
import { create } from 'zustand'

interface CartState {
  cart: ProductCart[]
  count: number
  subtotal: number
  add: (product: ProductCart) => void
  edit: (product: ProductCart) => void
  remove: (id: number) => void
}

const useCartStore = create<CartState>()((set) => ({
  cart: [],
  count: 0,
  subtotal: 0,
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

      return {
        cart: [...state.cart],
        count: setCount(state.cart),
        subtotal: setSubtotal(state.cart),
      }
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

      return {
        cart: [...state.cart],
        count: setCount(state.cart),
        subtotal: setSubtotal(state.cart),
      }
    })
  },
  remove: (id: number) => {
    set((state) => {
      state.cart = state.cart.filter((product) => product.id !== id)

      return {
        cart: [...state.cart],
        count: setCount(state.cart),
        subtotal: setSubtotal(state.cart),
      }
    })
  },
}))

function setCount(cart: ProductCart[]): number {
  return cart.reduce((accumulator, current) => accumulator + current.qty, 0)
}

function setSubtotal(cart: ProductCart[]): number {
  return cart.reduce(
    (accumulator, current) => accumulator + current.price * current.qty,
    0,
  )
}

export default useCartStore
