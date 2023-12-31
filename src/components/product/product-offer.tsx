import styles from '@/styles/product.module.scss'
import { Product } from '@/types/product'
import { ShoppingOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  ConfigProvider,
  Flex,
  Rate,
  Tag,
  ThemeConfig,
  Typography,
} from 'antd'
import Link from 'next/link'
import ProductCategories from './product-categories'
import ProductPrices from './product-price'

const { Text } = Typography

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
    Rate: {
      marginXS: 2,
    },
  },
}

function cover({ id, attributes }: Product) {
  return (
    <div className={styles['cover']}>
      {attributes.discount && attributes.until ? (
        <Tag className={styles['offer']}>
          <span>offerta termina en:</span> 2 dias
        </Tag>
      ) : null}
      <picture>
        <img
          src={
            'http://localhost:1337' + attributes.images.data[0].attributes.url
          }
          alt={attributes.images.data[0].attributes.alternativeText}
          width={'100%'}
          height={'auto'}
          style={{ height: 'auto' }}
        />
      </picture>
    </div>
  )
}

export default function ProductOffer({ id, attributes }: Product) {
  return (
    <ConfigProvider theme={theme}>
      <Card
        hoverable
        cover={cover({ id: id, attributes: attributes })}
        style={{ height: '100%' }}
        className={`${styles['product-default']} ${styles['product-offer']}`}
      >
        <Flex align="center" vertical>
          <ProductCategories id={id} attributes={attributes} />
          <Link
            className={styles['name']}
            href={`/products/${attributes.slug}`}
          >
            <Text>{attributes.name}</Text>
          </Link>
          <Rate
            disabled
            value={attributes.ratings}
            className={styles['rate']}
          ></Rate>
          <ProductPrices id={id} attributes={attributes} />
          <Flex>
            <Button
              type="primary"
              size="large"
              icon={<ShoppingOutlined />}
              className={styles['add']}
            >
              añadir
            </Button>
          </Flex>
        </Flex>
      </Card>
    </ConfigProvider>
  )
}