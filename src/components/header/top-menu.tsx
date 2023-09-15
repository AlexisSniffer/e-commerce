import styles from '@/styles/header.module.scss'
import { ConfigProvider, Menu, MenuProps } from 'antd'
import Link from 'next/link'

const items: MenuProps['items'] = [
  {
    label: <Link href="/profile/username">Mi Cuenta</Link>,
    key: 'myAccount',
  },
  {
    label: <Link href="/cart"> Carrito</Link>,
    key: 'cart',
  },

  {
    label: <Link href="/login">Iniciar Sesión</Link>,
    key: 'login',
  },
]

export default function TopMenu() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHoverColor: '#262626',
            horizontalItemSelectedColor: 'none',
            colorBorderSecondary: '#fff',
            algorithm: true,
          },
        },
      }}
    >
      <Menu
        mode="horizontal"
        items={items}
        disabledOverflow={true}
        className={styles['header__top__menu']}
      />
    </ConfigProvider>
  )
}