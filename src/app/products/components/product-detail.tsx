import {
  ProductCategoryProps,
  ProductDetailProps,
  ProductProps,
} from '@/types/product-props'
import { money, valMinMax } from '@/utils/formatters'
import {
  Col,
  ConfigProvider,
  Divider,
  Rate,
  Row,
  Space,
  ThemeConfig,
  Typography,
} from 'antd'
import styles from '@/styles/product.module.scss'
import { useRouter } from 'next/navigation'
import useFilterStore from '@/store/filterStore'
import ProductCategories from '@/components/product/product-categories'

const theme: ThemeConfig = {
  components: {
    Typography: {},
    Button: {
      borderRadius: 0,
    },
  },
}

const { Title, Paragraph, Text } = Typography

const ProductDetail = ({ product }: ProductDetailProps) => {
  const router = useRouter()
  const { setCategories } = useFilterStore()

  return (
    <ConfigProvider theme={theme}>
      {/*  <pre>{JSON.stringify(product, null, 2)}</pre> */}

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}></Col>
        <Col xs={24} md={12}>
          <Space direction="vertical">
            {/* Title */}
            <Title level={1} style={{ marginBottom: '0' }}>
              {product.data.attributes.name}
            </Title>

            {/* Rate */}
            <Rate
              value={product.data.attributes.ratings}
              disabled
              style={{ fontSize: '1rem' }}
            ></Rate>

            {/* Divider */}
            <Divider />

            {/* Price */}
            <p className={styles['product-detail-price']}>
              {product.data.attributes.variants.length ? (
                valMinMax(
                  product.data.attributes.variants.map((variant: any) => {
                    let price: number
                    price = variant.isDiscount
                      ? variant.discount
                      : variant.price
                    return price
                  }),
                )
              ) : (
                <>
                  {product.data.attributes.isDiscount ? (
                    <Space>
                      <span>
                        {money.format(product.data.attributes.discount)}
                      </span>
                      <span
                        className={`${styles['product-detail-price']} ${styles['is-discount']}`}
                      >
                        {money.format(product.data.attributes.price)}
                      </span>
                    </Space>
                  ) : (
                    <span>{money.format(product.data.attributes.price)}</span>
                  )}
                </>
              )}
            </p>

            {/* Description */}
            <Paragraph>{product.data.attributes.description}</Paragraph>

            {/* Categories */}
            <Space>
              <Text>CATEGORIAS:</Text>

              <Text>
                {/* {product.data.attributes.categories &&
                product.data.attributes.categories?.data.length ? (
                  product.data.attributes.categories?.data.map(
                    (
                      category: ProductCategoryProps,
                      index: number,
                      array: ProductCategoryProps[],
                    ) => {
                      return (
                        <Text
                          key={category.attributes.slug}
                          onClick={() => {
                            setCategories([category.attributes.slug])
                            router.push('/shop')
                          }}
                        >
                          {category.attributes.name}
                          {index !== array.length - 1 ? ', ' : ''}
                        </Text>
                      )
                    },
                  )
                ) : (
                  <Text>sin categoria</Text>
                )} */}
              </Text>
            </Space>

            {/* Vendor */}
            <Space>
              <Text>VENDEDOR:</Text>
              <Text>{`${product.data.attributes.createdBy.firstname} ${product.data.attributes.createdBy.lastname}`}</Text>
            </Space>

            {/* Delivery time */}
            <Space>
              <Text>TIEMPO DE ENTREGA:</Text>
              <Text>
                {product.data.attributes.deliveryTime.data.attributes.time}
              </Text>
            </Space>

            <Divider />
          </Space>
          ]{' '}
        </Col>
      </Row>
    </ConfigProvider>
  )
}

export default ProductDetail
