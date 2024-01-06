import useCartStore from '@/store/cartStore'
import styles2 from '@/styles/cart.module.scss'
import styles from '@/styles/product.module.scss'
import { ProductCart } from '@/types/product'
import { money } from '@/utils/formatters'
import { CloseOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Result,
  Row,
  Table,
  ThemeConfig,
  Typography,
} from 'antd'
import Image from 'next/image'
import React from 'react'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 0,
      borderRadiusLG: 0,
    },
    Table: {
      headerBg: '',
      headerSplitColor: '',
    },
  },
}

interface DataType {
  key: React.Key
  image: ProductCart
  name: ProductCart
  price: number
  qty: number
  subtotal: number
}

export default function ShoppingCart() {
  const cartStore = useCartStore((state) => state.cart)
  const subtotalStore = useCartStore((state) => state.subtotal)
  const { remove } = useCartStore()

  const Variation = ({ value, className }: any) => (
    <span style={{ backgroundColor: value }} className={styles['color']}>
      {className == 'color' ? '' : value}
    </span>
  )

  const columns = [
    {
      dataIndex: 'image',
      key: 'image',
      render: (product: ProductCart) => (
        <div className={styles['remove']}>
          <Image
            src={
              'http://localhost:1337' +
              product.attributes.images.data[0].attributes.url
            }
            alt={
              product.attributes.images.data[0].attributes.alternativeText ??
              product.attributes.slug
            }
            width={80}
            height={80}
          />
          <Button
            shape="circle"
            size="small"
            icon={<CloseOutlined />}
            onClick={() => remove(product)}
          ></Button>
        </div>
      ),
    },
    {
      title: <Text className={styles2['title-column']}>producto</Text>,
      dataIndex: 'name',
      key: 'name',
      render: (product: ProductCart) => (
        <Text className={styles['name']}>
          {product.attributes.name}
          {product.variant ? (
            <Text className={styles['variant']}>
              {Object.entries(product.variant.variant).map(
                ([key, value], index, array) => (
                  <React.Fragment key={key}>
                    <span>{key}</span> :{' '}
                    <Variation
                      value={value}
                      className={key === 'color' ? 'color' : ''}
                    />
                    {index < array.length - 1 && ', '}
                  </React.Fragment>
                ),
              )}
            </Text>
          ) : (
            <></>
          )}
        </Text>
      ),
    },
    {
      title: <Text className={styles2['title-column']}>precio</Text>,
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: <Text className={styles2['title-column']}>cantidad</Text>,
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: <Text className={styles2['title-column']}>subtotal</Text>,
      dataIndex: 'subtotal',
      key: 'subtotal',
    },
  ]

  const dataSource: DataType[] = cartStore.map((product: ProductCart) => {
    return {
      key: `${product.id}`,
      image: product,
      name: product,
      price: product.price,
      qty: product.qty,
      subtotal: product.price * product.qty,
    }
  })

  if (!cartStore.length) {
    return (
      <ConfigProvider theme={theme}>
        <Result
          icon={<ShoppingCartOutlined />}
          subTitle="No se agregaron productos al carrito "
          extra={
            <Button type="primary" size="large">
              IR A COMPRAR
            </Button>
          }
        />
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider theme={theme}>
      <Row gutter={16}>
        <Col span={16}>
          <Table
            dataSource={dataSource}
            columns={columns}
            className={`${styles['product']} ${styles['product-cart-shopping']}`}
            pagination={false}
          />
        </Col>
        <Col span={8}>
          <Card title="TOTALES DEL CARRITO" className={styles2['totals']}>
            <Flex justify="space-between" align="center">
              <Text className={styles2['title']}>Subtotal</Text>
              <Text className={styles2['price']}>
                {money.format(subtotalStore)}
              </Text>
            </Flex>
            <Divider className={styles2['divider']} />
            <Flex justify="space-between" align="center">
              <Text className={styles2['title']}>ITBMS</Text>
              <Text className={styles2['price']}>
                {money.format(subtotalStore * 0.07)}
              </Text>
            </Flex>
            <Divider className={styles2['divider']} />
            <Flex justify="space-between" align="center">
              <Text className={styles2['title']}>Total</Text>
              <Text className={`${styles2['price']} ${styles2['total']}`}>
                {money.format(subtotalStore + subtotalStore * 0.07)}
              </Text>
            </Flex>
            <Button
              type="primary"
              size="large"
              block
              className={styles2['checkout']}
            >
              Pasar por la caja
            </Button>
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  )
}
