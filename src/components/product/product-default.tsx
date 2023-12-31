import styles from '@/styles/product.module.scss'
import { Product } from '@/types/product'
import {
  ArrowRightOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
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
import Countdown from '../common/countdown'
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
      <Button
        type="primary"
        //onClick={showModal}
        className={styles['quick-view']}
      >
        vista rápida
      </Button>
      <Button
        shape="circle"
        icon={
          attributes.variants?.length ? (
            <ArrowRightOutlined rev={undefined} />
          ) : (
            <ShoppingCartOutlined rev={undefined} />
          )
        }
        // onClick={}
        className={styles['add']}
      />
      {attributes.discount && attributes.until ? (
        <Tag className={styles['offer2']}>
          <span>oferta termina en:</span>{' '}
          <Countdown targetDate={attributes.until} />
        </Tag>
      ) : null}
    </div>
  )
}

export default function ProductDefault({ id, attributes }: Product) {
  return (
    <ConfigProvider theme={theme}>
      <Card
        hoverable
        cover={cover({ id: id, attributes: attributes })}
        className={styles['product-default']}
      >
        <Flex gap={10} justify="space-between">
          <ProductCategories id={id} attributes={attributes} />
          <HeartOutlined className={styles['wish']} />
        </Flex>
        <Link className={styles['name']} href={`/products/${attributes.slug}`}>
          <Text>{attributes.name}</Text>
        </Link>
        <Rate
          disabled
          value={attributes.ratings}
          className={styles['rate']}
        ></Rate>
        <ProductPrices id={id} attributes={attributes} />
      </Card>
    </ConfigProvider>
  )
}
