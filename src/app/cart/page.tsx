'use client'

import Container from '@/components/utils/container'
import styles from '@/styles/cart.module.scss'
import {
  CheckCircleOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Col, ConfigProvider, Row, Steps, ThemeConfig } from 'antd'
import Checkout from './components/checkout'
import OrderComplete from './components/order-complete'
import ShoppingCart from './components/shopping-cart'

const theme: ThemeConfig = {
  components: {
    Steps: {},
  },
}

export default function Cart() {
  const items = [
    {
      title: 'Carrito',
      icon: <ShoppingCartOutlined />,
      content: <ShoppingCart />,
    },
    {
      title: 'Verificar',
      icon: <EyeOutlined />,
      content: <Checkout />,
    },
    {
      title: 'Finalizar',
      icon: <CheckCircleOutlined />,
      content: <OrderComplete />,
      disabled: true,
    },
  ]

  return (
    <ConfigProvider theme={theme}>
      <Container>
        <Row>
          <Col span={14} offset={5}>
            <Steps items={items} current={0} className={styles['steps']} />
          </Col>
          <Col span={24}>
            <div>{items[0].content}</div>
          </Col>
        </Row>
      </Container>
    </ConfigProvider>
  )
}
