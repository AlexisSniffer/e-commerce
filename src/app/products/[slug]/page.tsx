'use client'

import { qsProductsBySlug } from '@/queries/product'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { fetcher } from '@/utils/fetcher'
import { Alert, Skeleton } from 'antd'
import useSWR from 'swr'
import ProductDetail from '../components/product-detail'
import Container from '@/components/utils/container'

export default function Product({ params }: { params: { slug: string } }) {
  const { data: product, error: errorProduct } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProductsBySlug(
      params.slug,
    )}`,
    fetcher,
  )

  if (errorProduct) {
    return <Alert message="No existe el producto solicitado" type="error" />
  }

  if (!product) {
    return <Skeleton />
  }

  /*const productDetail: ProductDetailProps = {
    product: {
      data: product.data[0],
    },
  }*/

  return (
    <Container>
      <ProductDetail
        id={product.data[0].id}
        attributes={product.data[0].attributes}
      />
    </Container>
  )
}
