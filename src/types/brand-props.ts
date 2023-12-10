import { MediaProps } from './media-props'

export interface BrandProps {
  id: number
  attributes: {
    name: string
    slug: string
    thumbnail: MediaProps
  }
}
