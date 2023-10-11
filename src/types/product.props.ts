import { CategoryProps } from './category-props'
import { MediaListProps } from './media-props'
import { PaginationProps } from './pagination-props'

export interface ProductProps {
  id: number
  attributes: {
    name: string
    slug: string
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    locale: string
    description: string
    price: number
    discount: number
    isDiscount: boolean
    until?: Date
    stock: 50
    ratings: 0
    categories?: {
      data: ProductCategoryProps[]
    }
    images: MediaListProps
  }
}

export interface ProductCategoryProps {
  id: number
  attributes: {
    name: string
    slug: string
    category: {
      data: {
        id: number
        attributes: {
          name: string
          slug: string
          category: {
            data: {
              id: number
              attributes: {
                name: string
                slug: string
              }
            }
          }
        }
      }
    }
  }
}

export interface ProductListProps {
  data: ProductProps[]
  meta: PaginationProps
}
