'use client'

import { ConfigProvider, Drawer, Menu, MenuProps, ThemeConfig } from 'antd'
import Sider from 'antd/es/layout/Sider'
import Link from 'next/link'

interface DrawerMenuProps {
  isOpen: boolean
  onClose: () => void
}

const items: MenuProps['items'] = [
  { key: 'home', label: <Link href="/">Inicio</Link> },
  { key: 'shop', label: <Link href="/shop">Tienda</Link> },
  { key: 'about', label: 'Nosotros' },
  { key: 'blog', label: 'Blog' },
  { key: 'contact', label: 'Contáctenos' },
]

export default function DrawerMenu(props: DrawerMenuProps) {
  return (
    <Drawer
      placement="left"
      size="default"
      width={300}
      open={props.isOpen}
      onClose={props.onClose}
      bodyStyle={{ padding: 0 }}
    >
      <Sider width={'100%'} theme="dark">
        <Menu style={{ height: '100%' }} items={items} />
      </Sider>
    </Drawer>
  )
}
