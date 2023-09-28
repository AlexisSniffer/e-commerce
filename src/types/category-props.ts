import { PaginationProps } from './pagination-props'

export interface CategoryHeaderProps {
  id: number
  attributes: {
    name: string
    slug: string
    categories?: {
      data: CategoryHeaderProps[]
    }
  }
}

export interface SubCategoryHeaderProps {
  category: CategoryHeaderProps
}

export interface CategoryHeaderListProps {
  categories: {
    data: CategoryHeaderProps[]
    meta: PaginationProps
  }
}
