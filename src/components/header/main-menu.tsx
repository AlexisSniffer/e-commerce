'use client'

import type { MenuProps, ThemeConfig } from 'antd'
import { ConfigProvider, Menu } from 'antd'
import { useState } from 'react'

const theme: ThemeConfig = {
  components: {
    Menu: {
      itemHoverColor: '#595959',
      horizontalItemSelectedColor: 'none',
      itemSelectedColor: '#096dd9',
      colorBorderSecondary: '#fff',
      algorithm: true,
    },
  },
}

const items: MenuProps['items'] = [
  { key: 'home', label: <b>Inicio</b> },
  { key: 'shop', label: <b>Tienda</b> },
  { key: 'about', label: <b>Nosotros</b> },
  { key: 'blog', label: <b>Blog</b> },
  { key: 'contact', label: <b>Contáctenos</b> },
]

export default function MainMenu() {
  const [current, setCurrent] = useState('mail')

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  return (
    <ConfigProvider theme={theme}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        disabledOverflow={true}
        items={items}
      />
    </ConfigProvider>
  )
}
