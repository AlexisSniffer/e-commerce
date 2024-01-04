import styles from '@/styles/product.module.scss'
import { ProductCart } from '@/types/product'
import { money } from '@/utils/formatters'
import { ConfigProvider, Flex, ThemeConfig, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Rate: {
      marginXS: 2,
    },
  },
}

export default function ProductCart({ product }: { product: ProductCart }) {
  return (
    <ConfigProvider theme={theme}>
      <Flex
        justify="space-between"
        align="center"
        className={`${styles['product']} ${styles['product-cart']}`}
      >
        <Flex vertical>
          <Link href={`/products/${product.attributes.slug}`}>
            <Text className={styles['name']}>{product.attributes.name}</Text>
          </Link>
          <Text className={styles['qty']}>
            {product.qty} <span>x</span> {money.format(product.price)}
          </Text>
        </Flex>
        <Image
          src={
            'http://localhost:1337' +
            product.attributes.images.data[0].attributes.url
          }
          alt={
            product.attributes.images.data[0].attributes.alternativeText ??
            product.attributes.slug
          }
          width={78}
          height={78}
        ></Image>
      </Flex>
    </ConfigProvider>
  )
}
