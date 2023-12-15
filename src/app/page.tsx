'use client'

import ProductDefault from '@/components/product/product-default'
import ProductOffert from '@/components/product/product-offert'
import Container from '@/components/utils/container'
import { qsProductUntil } from '@/queries/product'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { fetcher } from '@/utils/fetcher'
import {
  Col,
  ConfigProvider,
  Row,
  Skeleton,
  ThemeConfig,
  Typography,
} from 'antd'
import useSWR from 'swr'

const { Title } = Typography

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
  const { data: products, error: errorProducts } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProductUntil}`,
    fetcher,
  )

  if (!products) {
    return (
      <Container>
        <Skeleton />
      </Container>
    )
  }

  return (
    <ConfigProvider theme={theme}>
      <main>
        <Container>
          <Row>
            <Title level={3}>Ofertas Especiales</Title>
          </Row>
          <Row>
            <Col span={8}>
              <ProductOffert
                id={products.data[0].id}
                attributes={products.data[0].attributes}
              />
            </Col>
            <Col span={16}>
              <Row>
                {products.data!.map((product: Product) => {
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
      </main>
    </ConfigProvider>
  )
}
