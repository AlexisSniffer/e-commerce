'use client'

import Container from '@/components/utils/container'
import { qsCategory } from '@/queries/category'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import FeaturedBrands from './components/featured-brands'
import ProductsFilterCategory1 from './components/products-filter-category1'
import ProductsFilterOffers from './components/products-filter-offers'
import ProductsFilterSortBy from './components/products-filter-sortby'

export default function Home() {
  const { data: categories, error: errorCategories } = useSWR<
    Payload<Category[]>
  >(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategory}`, fetcher)

  return (
    <>
      <Container style={{ padding: '2em 0 2em', background: '#fff' }}>
        <ProductsFilterOffers />
      </Container>

      <Container style={{ padding: '2em 0 2em', background: '#f4f4f4' }}>
        <ProductsFilterSortBy />
        {categories?.data[0].attributes ? (
          <>
            <ProductsFilterCategory1
              id={categories?.data[0].id}
              attributes={categories?.data[0].attributes}
            />
          </>
        ) : null}
        <FeaturedBrands />
      </Container>
    </>
  )
}
