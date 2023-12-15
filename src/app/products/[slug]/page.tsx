'use client'

import { Alert, Skeleton } from 'antd'
import useSWR from 'swr'

import { qsProductsBySlug } from '@/queries/product'
import { ProductDetailProps, ProductListProps } from '@/types/product-props'
import { fetcher } from '@/utils/fetcher'
//import dayjs from 'dayjs'
//import dayjsES from 'dayjs/locale/es'
//import relativeTime from 'dayjs/plugin/relativeTime'
import ProductDetail from '../components/product-detail'
//dayjs.extend(relativeTime)
//dayjs.locale(dayjsES)

export default function Product({ params }: { params: { slug: string } }) {
  const { data: product, error: errorProduct } = useSWR<ProductListProps>(
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

  const productDetail: ProductDetailProps = {
    product: {
      data: product.data[0],
    },
  }

  return (
    <>
      <ProductDetail product={productDetail.product} />
    </>
  )
}
