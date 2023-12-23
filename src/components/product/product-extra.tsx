import styles from '@/styles/product.module.scss'
import { Media } from '@/types/media'
import { Product } from '@/types/product'
import { money } from '@/utils/formatters'
import { ConfigProvider, Rate, Space, ThemeConfig, Typography } from 'antd'
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

function cover(images: Media[]) {
  return (
    <picture>
      <img
        src={'http://localhost:1337' + images[0].attributes.url}
        alt={images[0].attributes.alternativeText}
        width={'100%'}
        height={'auto'}
        style={{ height: 'auto' }}
      />
    </picture>
  )
}

export default function ProductExtra({ id, attributes }: Product) {
  return (
    <ConfigProvider theme={theme}>
      <Space>
        <div>
          <picture>
            <img
              src={
                'http://localhost:1337' +
                attributes.images.data[0].attributes.url
              }
              alt={attributes.images.data[0].attributes.alternativeText}
              width={'100px'}
              height={'auto'}
              style={{ height: 'auto' }}
            />
          </picture>
        </div>
        <Space direction="vertical" size={'small'}>
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
        </Space>
      </Space>

      {/* <Card hoverable cover={cover(attributes.images.data)}>
        <ProductCategories id={id} attributes={attributes} />
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
      </Card> */}
    </ConfigProvider>
  )
}
