import styles from '@/styles/product.module.scss'
import { MediaListProps } from '@/types/media-props'
import { ProductCategoryProps, ProductProps } from '@/types/product.props'
import { money } from '@/utils/formatters'
import { Card, ConfigProvider, Rate, ThemeConfig, Typography } from 'antd'
import Link from 'next/link'

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
  },
}

function cover(images: MediaListProps) {
  return (
    <picture>
      <img
        src={images?.data[0].attributes.url}
        alt={images?.data[0].attributes.alternativeText}
        width={'100%'}
        height={'100%'}
      />
    </picture>
  )
}

export default function ProductOffert({ attributes }: ProductProps) {
  return (
    <ConfigProvider theme={theme}>
      <Card
        hoverable
        cover={cover(attributes.images)}
        style={{ height: '100%' }}
      >
        <span className={styles['categories']}>
          {attributes.categories && attributes.categories?.data.length > 0 ? (
            attributes.categories?.data.map(
              (
                category: ProductCategoryProps,
                index: number,
                array: ProductCategoryProps[],
              ) => {
                return (
                  <Text
                    key={category.attributes.slug}
                    className={styles['category']}
                  >
                    {category.attributes.name}
                    {index !== array.length - 1 ? ', ' : ''}
                  </Text>
                )
              },
            )
          ) : (
            <Text className={styles['category']}>sin categoria</Text>
          )}
        </span>

        <Link className={styles['name']} href={`/products/${attributes.slug}`}>
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
      </Card>
    </ConfigProvider>
  )
}
