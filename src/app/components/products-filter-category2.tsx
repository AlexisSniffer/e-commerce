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

export default function ProductsFilterCategory2({ id, attributes }: Category) {
  const router = useRouter()
  const { setCategories } = useFilterStore()

  const { data: products, error: errorProducts } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProductUntil}`,
    fetcher,
  )

  return (
    <ConfigProvider theme={theme}>
      <Row className={styles['article']}>
        <Col
          span={24}
          style={{
            backgroundColor: '#fff',
            padding: '2rem',
          }}
        >
          <Row align={'middle'} gutter={40} style={{ marginBottom: '1rem' }}>
            <Col>
              <Title level={4} className={styles['title']}>
                {attributes.name}
              </Title>
            </Col>
          </Row>
          <Row className={styles['article']} gutter={16}>
            <Col span={12}>
              <div
                style={{
                  color: '#000',
                  height: '200px',
                  width: '100%',
                  padding: '2rem',
                  backgroundColor: '#B0BEC5',
                }}
              >
                Espacio publicitario
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  color: '#000',
                  height: '200px',
                  width: '100%',
                  padding: '2rem',
                  backgroundColor: '#B0BEC5',
                }}
              >
                Espacio publicitario
              </div>
            </Col>
          </Row>
          <Row>
            {products!.data.slice(0, 6).map((product: Product) => {
              return (
                <Col
                  xs={{ span: 8 }}
                  sm={{ span: 6 }}
                  lg={{ span: 4 }}
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
    </ConfigProvider>
  )
}
