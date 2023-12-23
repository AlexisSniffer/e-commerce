import ProductDefault from '@/components/product/product-default'
import ProductExtra from '@/components/product/product-extra'
import { qsProductUntil } from '@/queries/product'
import useFilterStore from '@/store/filterStore'
import styles from '@/styles/products-filter.module.scss'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { fetcher } from '@/utils/fetcher'
import {
  Col,
  ConfigProvider,
  Row,
  Skeleton,
  Space,
  Tabs,
  TabsProps,
  ThemeConfig,
  Typography,
} from 'antd'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const { Title, Text } = Typography

const theme: ThemeConfig = {
  components: {
    Tabs: {
      itemSelectedColor: '#3050ff',
      colorBorderSecondary: 'none',
      inkBarColor: 'none',
    },
  },
}

function ProductFilter({ data }: Payload<Product[]>) {
  if (!data) {
    return <Skeleton />
  }

  return (
    <Row>
      {data!.slice(0, 4).map((product: Product) => {
        return (
          <Col
            xs={{ span: 12 }}
            sm={{ span: 8 }}
            lg={{ span: 6 }}
            key={product.attributes.slug}
          >
            <ProductDefault id={product.id} attributes={product.attributes} />
          </Col>
        )
      })}
    </Row>
  )
}

export default function ProductsFilterCategory1({ id, attributes }: Category) {
  const router = useRouter()
  const { setCategories } = useFilterStore()

  const { data: products, error: errorProducts } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProductUntil}`,
    fetcher,
  )

  return (
    <ConfigProvider theme={theme}>
      <Row style={{ marginBottom: '2rem' }}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          lg={{ span: 18 }}
          style={{
            backgroundColor: '#fff',
            padding: '2rem',
          }}
        >
          <Row align={'middle'} gutter={40} style={{ marginBottom: '1rem' }}>
            <Col>
              <Title
                level={4}
                style={{ textTransform: 'uppercase', margin: '0' }}
              >
                {attributes.name}
              </Title>
            </Col>
            <Col>
              <Space size={'large'}>
                {attributes.categories.data.map((category: Category) => {
                  return (
                    <Text
                      key={category.attributes.slug}
                      className={styles['category-links']}
                      onClick={() => {
                        setCategories([category.attributes.slug])
                        router.push('/shop')
                      }}
                    >
                      {category.attributes.name}
                    </Text>
                  )
                })}
                <Text
                  className={styles['view-all']}
                  onClick={() => {
                    setCategories([attributes.slug])
                    router.push('/shop')
                  }}
                >
                  ver más
                </Text>
              </Space>
            </Col>
          </Row>
          <Row style={{ marginBottom: '1rem' }}>
            <div
              style={{
                height: '250px',
                width: '100%',
                padding: '2rem',
                backgroundColor: 'beige',
              }}
            >
              Espacio publicitario
            </div>
          </Row>
          <Row style={{ marginBottom: '1rem' }}>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: '1',
                  label: 'Lo más vendido',
                  children: products?.data ? (
                    <ProductFilter data={products?.data} />
                  ) : null,
                },
                {
                  key: '2',
                  label: 'Nuevos',
                  children: products?.data ? (
                    <ProductFilter data={products?.data} />
                  ) : null,
                },
                {
                  key: '3',
                  label: 'Mejores calificaciones',
                  children: products?.data ? (
                    <ProductFilter data={products?.data} />
                  ) : null,
                },
              ]}
              onChange={() => {}}
            />
          </Row>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          lg={{ span: 6 }}
          style={{
            backgroundColor: '#fff',
            padding: '2rem 1rem',
            borderLeft: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          <Title level={5}>Ofertas Especiales</Title>
          <Row>
            {products?.data!.slice(0, 4).map((product: Product) => {
              return (
                <Col
                  xs={{ span: 12 }}
                  sm={{ span: 8 }}
                  lg={{ span: 24 }}
                  key={product.attributes.slug}
                >
                  <ProductExtra
                    id={product.id}
                    attributes={product.attributes}
                  />
                </Col>
              )
            })}
            <Col span={24}>
              <Text
                className={styles['view-all']}
                onClick={() => {
                  setCategories([attributes.slug])
                  router.push('/shop')
                }}
              >
                ver más
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </ConfigProvider>
  )
}
