import ProductDefault from '@/components/product/product-default'
import ProductOffert from '@/components/product/product-offert'
import Container from '@/components/utils/container'
import { qsCategory } from '@/queries/category'
import { qsProductUntil, qsProducts } from '@/queries/product'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { fetcher } from '@/utils/fetcher'
import {
  Col,
  ConfigProvider,
  List,
  Row,
  Skeleton,
  ThemeConfig,
  Typography,
} from 'antd'
import { useState } from 'react'
import useSWR from 'swr'

const { Title, Text } = Typography

const theme: ThemeConfig = {
  components: {},
}

export default function ProductsFilterSortBy() {
  const [filterCategories, setFilterCategories] = useState<string[]>()

  const { data: products, error: errorProducts } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProducts({
      categories: filterCategories,
    })}`,
    fetcher,
  )

  const { data: categories, error: errorCategories } = useSWR<
    Payload<Category[]>
  >(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategory}`, fetcher)

  return (
    <ConfigProvider theme={theme}>
      <Row>
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 12, order: 1 }}
          lg={{ span: 6, order: 1 }}
          style={{
            backgroundColor: '#fff',
            padding: '2rem',
            minHeight: '664px',
          }}
        >
          <Title level={3}>Ordenar por</Title>
          {categories ? (
            <List
              size="small"
              grid={{
                gutter: 16,
                xs: 3,
                sm: 2,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 1,
              }}
              dataSource={categories?.data}
              renderItem={(category: Category) => (
                <List.Item>
                  <Text
                    onClick={() => {
                      setFilterCategories([category.attributes.slug])
                    }}
                  >
                    {category.attributes.name}
                  </Text>
                </List.Item>
              )}
            ></List>
          ) : (
            <Skeleton />
          )}
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 12, order: 2 }}
          lg={{ span: 6, order: 2 }}
        >
          <div
            style={{
              padding: '2rem',
              display: 'block',
              width: '100%',
              minHeight: '200px',
              height: '100%',
              backgroundColor: '#ccc',
            }}
          >
            Espacio Publicitario
          </div>
        </Col>
        <Col
          xs={{ span: 24, order: 3 }}
          sm={{ span: 24, order: 3 }}
          lg={{ span: 12, order: 3 }}
          style={{
            backgroundColor: '#fff',
          }}
        >
          {products ? (
            <Row>
              {products.data!.map((product: Product) => {
                return (
                  <Col
                    xs={{ span: 12 }}
                    sm={{ span: 8 }}
                    lg={{ span: 8 }}
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
          ) : (
            <div style={{ padding: '2rem' }}>
              <Skeleton />
            </div>
          )}
        </Col>
      </Row>
    </ConfigProvider>
  )
}
