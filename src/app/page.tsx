'use client'

import Container from '@/components/utils/container'
import ProductsFilterOffers from './components/products-filter-offers'
import ProductsFilterSortBy from './components/products-filter-sortby'

export default function Home() {
  return (
    <>
      <Container style={{ padding: '2em 0 2em', background: '#fff' }}>
        <ProductsFilterOffers />
      </Container>

      <Container style={{ padding: '2em 0 2em', background: '#f4f4f4' }}>
        <ProductsFilterSortBy />
      </Container>
    </>
  )
}
