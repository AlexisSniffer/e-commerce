import { create } from 'zustand'

interface FilterState {
  categories: string[]
  setCategories: (categories: string[]) => void
}

const useFilterStore = create<FilterState>()((set) => ({
  categories: [],
  setCategories: (categories) => set((state) => ({ categories: categories })),
}))

export default useFilterStore
