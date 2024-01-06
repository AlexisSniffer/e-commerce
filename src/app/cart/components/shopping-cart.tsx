import useCartStore from '@/store/cartStore'
import styles from '@/styles/product.module.scss'
import { ProductCart } from '@/types/product'
import { CloseOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  ConfigProvider,
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
      title: 'producto',
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
      title: 'precio',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'cantidad',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'subtotal',
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
      <Row>
        <Col span={16}>
          <Table
            dataSource={dataSource}
            columns={columns}
            className={`${styles['product']} ${styles['product-cart-shopping']}`}
          ></Table>
        </Col>
        <Col span={8}>Card</Col>
      </Row>
    </ConfigProvider>
  )
}
