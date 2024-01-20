'use client'

import useCartStore from '@/store/cartStore'
import styles2 from '@/styles/cart.module.scss'
import styles from '@/styles/product.module.scss'
import { ProductCart } from '@/types/product'
import { money } from '@/utils/formatters'
import { ShoppingCartOutlined } from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Form,
  Input,
  Result,
  Row,
  ThemeConfig,
  Typography,
  notification,
} from 'antd'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 0,
      borderRadiusLG: 0,
    },
    Input: {
      borderRadius: 0,
    },
  },
}

const { TextArea } = Input

export default function Checkout() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [recaptcha, setRecaptcha] = useState<boolean>(true)
  const [api, contextHolder] = notification.useNotification()
  const cartStore = useCartStore((state) => state.cart)
  const subtotalStore = useCartStore((state) => state.subtotal)
  const { setStep } = useCartStore()

  const requiredMessage = 'Campo requerido'

  if (!cartStore.length) {
    return (
      <ConfigProvider theme={theme}>
        <Alert
          style={{ width: 'auto' }}
          message="El pago no está disponible mientras su carrito esté vacío."
          type="info"
          showIcon
        />
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

  const Variation = ({ value, className }: any) => (
    <span style={{ backgroundColor: value }} className={styles['color']}>
      {className == 'color' ? '' : value}
    </span>
  )

  const onFinish = async (values: any) => {
    setLoading(true)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            _billing: {
              name: values.name,
              lastname: values.lastname,
              address: values.address,
              phone: values.phone,
              email: values.email,
            },
            _products: cartStore,
            _payments: {
              hola: 1,
            },
          },
        }),
      },
    )

    if (response.ok) {
      const responseData = await response.json()
      setStep(2)
    } else {
      api.error({
        message: 'Error',
        description: 'No se pudo realizar la compra, intentelo más tarde.',
        placement: 'bottomRight',
      })
    }

    setLoading(false)
  }

  const onRecaptcha = async (value: any) => {
    const response = await fetch('http://localhost:3000/api/recaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recaptchaToken: value,
      }),
    })

    setRecaptcha(!response.ok)
  }

  return (
    <ConfigProvider theme={theme}>
      {contextHolder}
      <Form
        form={form}
        name="cheackoutForm"
        layout={'vertical'}
        onFinish={onFinish}
        initialValues={{
          ['name']: 'Alexis',
          ['lastname']: 'Sniffer',
          ['address']: 'Panama',
          ['phone']: '2551925',
          ['email']: 'alexis.sniffer@gmail.com',
          ['paymentMethod']: null,
          ['voucher']: null,
        }}
      >
        <Row gutter={16}>
          <Col span={14}>
            <Flex gap={16} justify="space-between">
              <Form.Item
                label="Nombre"
                name="name"
                rules={[{ required: true, message: requiredMessage }]}
                style={{ width: '100%' }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Apellido"
                name="lastname"
                rules={[{ required: true, message: requiredMessage }]}
                style={{ width: '100%' }}
              >
                <Input />
              </Form.Item>
            </Flex>
            <Form.Item
              name="address"
              label="Dirección"
              rules={[{ required: true, message: requiredMessage }]}
            >
              <TextArea size="middle" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Teléfono"
              rules={[{ required: true, message: requiredMessage }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Correo Electrónico"
              rules={[{ required: true, message: requiredMessage }]}
            >
              <Input placeholder="Ingrese su correo electrónico" />
            </Form.Item>
            <Form.Item name="notes" label="Notas del pedido (opcional)">
              <TextArea size="middle" placeholder="Notas sobre tu pedido" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Card title="SU PEDIDO" className={styles2['order']}>
              <Text className={styles2['title']}>Producto</Text>
              <Divider className={styles2['divider']} />
              {cartStore.map((product: ProductCart) => (
                <Flex key={product.id} justify="space-between">
                  <Text>
                    {product.attributes.name} x {product.qty}
                  </Text>
                  <Text>{money.format(product.price * product.qty)}</Text>
                </Flex>
              ))}
              <br />
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
              <Divider className={styles2['divider']} />
              <ReCAPTCHA
                sitekey="6LfGvVYpAAAAABaeNWYMHTHLbBLUax3kNP1VaVLH"
                onChange={onRecaptcha}
              />
              <Button
                disabled={recaptcha}
                type="primary"
                size="large"
                block
                loading={loading}
                className={styles2['btn']}
                onClick={form.submit}
              >
                realizar pedido
              </Button>
            </Card>
          </Col>
        </Row>
      </Form>
    </ConfigProvider>
  )
}
