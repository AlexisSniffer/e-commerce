import styles from '@/styles/product.module.scss'
import { Product } from '@/types/product'
import { money } from '@/utils/formatters'
import { ConfigProvider, Flex, Rate, ThemeConfig, Typography } from 'antd'
import Link from 'next/link'

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
          style={{
            padding: '1rem 0 0 0.5rem ',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
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
          <Text className={styles['price']}>
            {money.format(attributes.price)}
          </Text>
        </Flex>
      </Flex>
    </ConfigProvider>
  )
}
