import styles from '@/styles/product.module.scss'
import { Product } from '@/types/product'
import { ConfigProvider, Flex, Rate, ThemeConfig, Typography } from 'antd'
import Link from 'next/link'
import ProductPrices from './product-price'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Rate: {
      marginXS: 2,
    },
  },
}

export default function ProductExtra({ id, attributes }: Product) {
  return (
    <ConfigProvider theme={theme}>
      <Flex
        style={{
          marginBottom: '1rem',
        }}
      >
        <picture>
          <img
            src={
              'http://localhost:1337' + attributes.images.data[0].attributes.url
            }
            alt={attributes.images.data[0].attributes.alternativeText}
            width={'80px'}
            height={'auto'}
            style={{ height: 'auto' }}
          />
        </picture>
        <Flex
          vertical
          gap={2}
          style={{
            padding: '1rem 0 0 0.5rem ',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          className={styles['product-default']}
        >
          <Link
            className={styles['name']}
            href={`/products/${attributes.slug}`}
          >
            <Text>{attributes.name}</Text>
          </Link>
          <Rate
            value={attributes.ratings}
            disabled
            style={{ fontSize: '0.9rem' }}
          ></Rate>
          <ProductPrices
            price={attributes.price}
            discount={{
              isDiscount: attributes.isDiscount,
              discount: attributes.discount,
              until: attributes.until,
            }}
            variants={attributes.variants}
          />
        </Flex>
      </Flex>
    </ConfigProvider>
  )
}
