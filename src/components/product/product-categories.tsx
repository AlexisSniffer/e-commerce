import { CategoryListProps } from '@/types/category-props'
import { ProductCategoryProps } from '@/types/product-props'

export default function ProductCategories(categories: ProductCategoryProps[]) {
  return (
    <>
      <pre>{JSON.stringify(categories)}</pre>
    </>
  )
}
