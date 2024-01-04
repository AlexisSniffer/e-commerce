'use client'

import ProductCart from '@/components/product/product-cart'
import useCartStore from '@/store/cartStore'
import { money } from '@/utils/formatters'
import { Button, Divider, Drawer, Flex, Typography } from 'antd'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const { Text } = Typography

export default function CartDrawer(props: CartDrawerProps) {
  const cartStore = useCartStore((state) => state.cart)

  return (
    <Drawer
      title="Carrito de Compra"
      placement="right"
      closable={true}
      onClose={props.onClose}
      open={props.isOpen}
    >
      <Flex vertical gap={10}>
        {cartStore.map((product) => {
          return <ProductCart key={product.id} product={product} />
        })}
      </Flex>
      <Divider />
      <Flex vertical gap={10}>
        <Flex justify="space-between">
          <Text>SUBTOTAL:</Text>
          <Text>{money.format(10.0)}</Text>
        </Flex>
        <Button size="large">VER CARRO</Button>
        <Button size="large" type="primary">
          VERIFICAR
        </Button>
      </Flex>
    </Drawer>
  )
}
