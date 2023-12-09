import { create } from 'zustand'

interface FilterState {
  filter: string
  categories: string[]
  setFilter: (filter: string) => void
  setCategories: (categories: string[]) => void
}

const useFilterStore = create<FilterState>()((set) => ({
  filter: '',
  categories: [],
  setFilter: (filter: string) => set((state) => ({ filter: filter })),
  setCategories: (categories) => set((state) => ({ categories: categories })),
}))

export default useFilterStore
