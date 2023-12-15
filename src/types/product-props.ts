import { BrandProps } from './brand-props'
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
    createdBy: any
    categories?: {
      data: ProductCategoryProps[]
    }
    brand: {
      data: BrandProps
    }
    images: MediaListProps
    variants: any
    deliveryTime: any
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

export interface ProductDetailProps {
  product: {
    data: ProductProps
  }
}
