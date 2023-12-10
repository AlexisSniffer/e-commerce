import { create } from 'zustand'

interface FilterState {
  filter: string
  categories: string[]
  prices: [number, number]
  setFilter: (filter: string) => void
  setCategories: (categories: string[]) => void
  setPrices: (prices: [number, number]) => void
}

const useFilterStore = create<FilterState>()((set) => ({
  filter: '',
  categories: [],
  prices: [0, 0],
  setFilter: (filter: string) => set((state) => ({ filter: filter })),
  setCategories: (categories: string[]) =>
    set((state) => ({ categories: categories })),
  setPrices: (prices: [number, number]) => set((state) => ({ prices: prices })),
}))

export default useFilterStore
