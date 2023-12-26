'use client'

import Container from '@/components/utils/container'
import { qsCategory } from '@/queries/category'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import { fetcher } from '@/utils/fetcher'
import { randomCategory } from '@/utils/random'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import CategoriesSlider from './components/categories-slider'
import FeaturedBrands from './components/featured-brands'
import ProductsFilterCategory1 from './components/products-filter-category1'
import ProductsFilterOffers from './components/products-filter-offers'
import ProductsFilterSortBy from './components/products-filter-sortby'
import Services from './components/services'

export default function Home() {
  const [random1, setRandom1] = useState<number>(0)

  const { data: categories, error: errorCategories } = useSWR<
    Payload<Category[]>
  >(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategory}`, fetcher)

  useEffect(() => {
    setInterval(() => {
      setRandom1(randomCategory(categories?.meta?.pagination?.total ?? 0))
    }, 60000)
  }, [categories])

  return (
    <>
      <Container style={{ padding: '2em 0 2em', background: '#f4f4f4' }}>
        <CategoriesSlider categories={categories} />
      </Container>

      <Container style={{ padding: '2em 0 2em', background: '#fff' }}>
        <Services />
        <ProductsFilterOffers />
      </Container>

      <Container style={{ padding: '2em 0 2em', background: '#f4f4f4' }}>
        <ProductsFilterSortBy />
        {categories ? (
          <>
            <ProductsFilterCategory1
              id={categories?.data[random1].id}
              attributes={categories?.data[random1].attributes}
            />
          </>
        ) : null}
        <FeaturedBrands />
      </Container>
    </>
  )
}
