import useCartStore from '@/store/cartStore'
import styles from '@/styles/product.module.scss'
import { Product, ProductCart } from '@/types/product'
import { productPrice } from '@/utils/product'
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
  notification,
} from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Countdown from '../common/countdown'
import ProductCategories from './components/product-categories'
import ProductPrices from './components/product-price'

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
    Notification: {
      paddingContentHorizontalLG: 10,
      paddingMD: 10,
    },
  },
}

export default function ProductDefault({ id, attributes }: Product) {
  const router = useRouter()
  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: 4 },
  })
  const { add } = useCartStore()

  const addProduct = () => {
    let product: ProductCart = {
      id,
      attributes,
      qty: 1,
      price: productPrice({ id, attributes }),
    }

    api.open({
      message: null,
      description: addMessage(),
      placement: 'bottomRight',
    })

    add(product)
  }

  const linkProduct = () => {
    router.push(`/products/${attributes.slug}`)
  }

  const cover = ({ id, attributes }: Product) => {
    return (
      <div className={styles['cover']}>
        <Image
          src={
            'http://localhost:1337' + attributes.images.data[0].attributes.url
          }
          alt={
            attributes.images.data[0].attributes.alternativeText ??
            attributes.slug
          }
          width={0}
          height={0}
          sizes="100vw"
        ></Image>
        <Button
          type="primary"
          //onClick={showModal}
          className={styles['quick-view']}
        >
          vista rápida
        </Button>
        <Button
          shape="circle"
          disabled={!(attributes.stock > 0)}
          icon={
            attributes.variants?.length ? (
              <ArrowRightOutlined />
            ) : (
              <ShoppingCartOutlined />
            )
          }
          onClick={attributes.variants?.length ? linkProduct : addProduct}
          className={styles['add']}
        />
        {attributes.isDiscount &&
        (!attributes.until ||
          (attributes.until && new Date(attributes.until) > new Date())) ? (
          <Tag className={styles['discount']}>
            -
            {Math.round(
              ((attributes.price - attributes.discount) / attributes.price) *
                100,
            )}
            %
          </Tag>
        ) : null}
        {attributes.isDiscount &&
        attributes.until &&
        new Date(attributes.until) > new Date() ? (
          <Tag className={styles['offer']}>
            <span>oferta termina en:</span>{' '}
            <Countdown targetDate={attributes.until} />
          </Tag>
        ) : null}
      </div>
    )
  }

  const addMessage = () => {
    return (
      <Flex
        vertical
        className={`${styles['product']} ${styles['product-add-message']}`}
      >
        <Flex align="center" gap={10}>
          <Image
            src={
              'http://localhost:1337' + attributes.images.data[0].attributes.url
            }
            alt={
              attributes.images.data[0].attributes.alternativeText ??
              attributes.slug
            }
            width={60}
            height={60}
          />
          <Flex vertical>
            <Text className={styles['name']}>{attributes.name}</Text>
            <Text className={styles['add-message']}>
              se ha agregado a tu carrito!
            </Text>
          </Flex>
        </Flex>
        <Flex gap={10}>
          <Button block>VER</Button>
          <Button block type="primary">
            VERIFICAR
          </Button>
        </Flex>
      </Flex>
    )
  }

  return (
    <ConfigProvider theme={theme}>
      {contextHolder}
      <Card
        hoverable
        cover={cover({ id: id, attributes: attributes })}
        className={`${styles['product']}`}
      >
        <Flex gap={10} justify="space-between">
          <ProductCategories id={id} attributes={attributes} />
          <HeartOutlined className={styles['wish']} />
        </Flex>
        <Link href={`/products/${attributes.slug}`}>
          <Text className={styles['name']}>{attributes.name}</Text>
        </Link>
        <Rate
          disabled
          value={attributes.ratings}
          className={styles['rate']}
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
      </Card>
    </ConfigProvider>
  )
}
