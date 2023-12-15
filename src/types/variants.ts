import { Media } from './media'
import { Variation } from './variation'

export interface Variants {
  images?: { data: Media[] }
  price: number
  discount?: number
  isDiscount: boolean
  until?: Date
  variant: Variation[]
}
