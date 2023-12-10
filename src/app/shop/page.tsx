'use client'

import ProductDefault from '@/components/product/product-default'
import Container from '@/components/utils/container'
import { qsProducts } from '@/queries/product'
import useFilterStore from '@/store/filterStore'
import { ProductListProps, ProductProps } from '@/types/product-props'
import { fetcher } from '@/utils/fetcher'
import type { CollapseProps } from 'antd'
import { Col, Collapse, Row } from 'antd'
import useSWR from 'swr'
import FilterBrand from './components/filter-brand'
import FilterCategory from './components/filter-category'
import FilterPrice from './components/filter-price'

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'CATEGORIAS',
    children: <FilterCategory />,
  },
  {
    key: '2',
    label: 'PRECIO',
    children: <FilterPrice />,
  },
  {
    key: '3',
    label: 'MARCAS',
    children: <FilterBrand />,
  },
]

export default function Shop() {
  const filterStore = useFilterStore((state) => state.filter)
  const categoriesStore = useFilterStore((state) => state.categories)
  const pricesStore = useFilterStore((state) => state.prices)
  const brandsStore = useFilterStore((state) => state.brands)

  const { data: products, error: errorProducts } = useSWR<ProductListProps>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProducts(
      filterStore,
      categoriesStore,
      pricesStore,
      brandsStore,
    )}`,
    fetcher,
  )

  return (
    <Container>
      <Row gutter={16}>
        <Col xs={0} lg={8} xl={6}>
          <Collapse
            activeKey={['1', '2', '3']}
            items={items}
            defaultActiveKey={['1']}
            expandIconPosition={'end'}
          />
        </Col>
        <Col xs={24} lg={16} xl={18}>
          <Row>
            {products?.data?.map((product: ProductProps) => {
              return (
                <Col
                  xs={{ span: 12 }}
                  sm={{ span: 8 }}
                  lg={{ span: 6 }}
                  key={product.attributes.slug}
                >
                  <ProductDefault
                    id={product.id}
                    attributes={product.attributes}
                  />
                </Col>
              )
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
