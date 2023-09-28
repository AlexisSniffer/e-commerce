'use client'

import { Drawer } from 'antd'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer(props: CartDrawerProps) {
  return (
    <Drawer
      title="Carrito de Compra"
      placement="right"
      size="default"
      closable={true}
      onClose={props.onClose}
      open={props.isOpen}
      className="drawer-car"
    >
      <pre>Open</pre>
    </Drawer>
  )
}
