import { create } from 'zustand'

interface FilterState {
  filter: string
  categories: string[]
  prices: [number, number]
  brands: string[]
  setFilter: (filter: string) => void
  setCategories: (categories: string[]) => void
  setPrices: (prices: [number, number]) => void
  setBrands: (brands: string[]) => void
}

const useFilterStore = create<FilterState>()((set) => ({
  filter: '',
  categories: [],
  prices: [0, 0],
  brands: [],
  setFilter: (filter: string) => set((state) => ({ filter: filter })),
  setCategories: (categories: string[]) =>
    set((state) => ({ categories: categories })),
  setPrices: (prices: [number, number]) => set((state) => ({ prices: prices })),
  setBrands: (brands: string[]) => set((state) => ({ brands: brands })),
}))

export default useFilterStore
