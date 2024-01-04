import { Product } from '@/types/product'
import { Variants } from '@/types/variants'

interface ProductDisable extends Product {
  selectedVariant?: Variants | undefined
}

export const disableProduct = ({
  attributes,
  selectedVariant,
}: ProductDisable): boolean => {
  if (!attributes.variants.length && attributes.stock <= 0) return true

  if (attributes.variants.length) {
    if (selectedVariant == undefined) return true
  }

  return false
}

export const productPrice = () => {
  return 0
}
