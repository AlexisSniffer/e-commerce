'use client'

import { LoginOutlined, ShopFilled, UserOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import { useState } from 'react'

const items: MenuProps['items'] = [
  {
    label: 'Mi Cuenta',
    key: 'myAccount',
    icon: <UserOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <ShopFilled />,
    disabled: true,
  },

  {
    label: 'Iniciar Sesión',
    icon: <LoginOutlined />,
    key: 'login',
  },
]

export default function MenuShop() {
  const [current, setCurrent] = useState('mail')

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  return (
    <Menu
      onClick={onClick}
      style={{ whiteSpace: 'nowrap' }}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  )
}
