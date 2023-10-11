'use client'

import ProductDefault from '@/components/product/product-default'
import ProductOffert from '@/components/product/product-offert'
import Container from '@/components/utils/container'
import { qsProducts } from '@/queries/product'
import { ProductListProps, ProductProps } from '@/types/product.props'
import { fetcher } from '@/utils/fetcher'
import { Col, ConfigProvider, Row, Spin, ThemeConfig, Typography } from 'antd'
import useSWR from 'swr'

const { Paragraph } = Typography

const theme: ThemeConfig = {
  components: {
    Card: {
      padding: 8,
      paddingXXS: 8,
      paddingLG: 8,
      borderRadiusLG: 0,
    },
    Button: {
      borderRadius: 0,
    },
  },
}

export default function Home() {
  const { data: products, error: errorProducts } = useSWR<ProductListProps>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProducts}`,
    fetcher,
  )

  if (!products) {
    return <Spin />
  }

  return (
    <ConfigProvider theme={theme}>
      <main>
        <Container>
          <h1>Página de inicio</h1>

          <Row>
            <Col span={8}>
              <ProductOffert
                id={products.data[0].id}
                attributes={products.data[0].attributes}
              />
            </Col>
            <Col span={16}>
              <Row>
                {products?.data.map((product: ProductProps) => {
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
                {products?.data.map((product: ProductProps) => {
                  return (
                    <Col
                      xs={{ span: 12 }}
                      sm={{ span: 8 }}
                      lg={{ span: 6 }}
                      //xl={{ span: 4 }}
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

          <Row>
            <Col>Prueba</Col>
          </Row>
        </Container>
      </main>
    </ConfigProvider>
  )
}
