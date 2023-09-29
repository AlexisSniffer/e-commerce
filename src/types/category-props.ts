import { PaginationProps } from './pagination-props'

export interface CategoryProps {
  id: number
  attributes: {
    name: string
    slug: string
    categories?: {
      data: CategoryProps[]
    }
  }
}

export interface SubCategoriesProps {
  categories?: {
    data: CategoryProps[]
  }
}

export interface CategoryListProps {
  data: CategoryProps[]
  meta: PaginationProps
}
