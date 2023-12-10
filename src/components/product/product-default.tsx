import useFilterStore from '@/store/filterStore'
import styles from '@/styles/product.module.scss'
import { MediaListProps } from '@/types/media-props'
import { ProductCategoryProps, ProductProps } from '@/types/product-props'
import { money } from '@/utils/formatters'
import { Card, ConfigProvider, Rate, ThemeConfig, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
        height={'auto'}
        style={{ height: 'auto' }}
      />
    </picture>
  )
}

export default function ProductDefault({ attributes }: ProductProps) {
  const router = useRouter()
  const { setCategories } = useFilterStore()

  return (
    <ConfigProvider theme={theme}>
      <Card hoverable cover={cover(attributes.images)}>
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
