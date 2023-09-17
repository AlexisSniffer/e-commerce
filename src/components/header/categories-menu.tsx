'use client'

import { MenuOutlined, ShopOutlined } from '@ant-design/icons'
import {
  Button,
  ConfigProvider,
  Dropdown,
  MenuProps,
  Space,
  ThemeConfig,
} from 'antd'
import CategoriesSubMenu from './categories-submenu'

const theme: ThemeConfig = {
  components: {
    Dropdown: {
      controlHeight: 40,
      controlPaddingHorizontal: 20,
    },
    Button: {
      borderRadius: 0,
      fontSize: 13,
      algorithm: true,
    },
  },
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Space>
        <ShopOutlined /> Categoria 1
      </Space>
    ),
    children: [{ key: '1-1', label: <CategoriesSubMenu /> }],
  },
  {
    key: '2',
    label: (
      <Space>
        <ShopOutlined /> Categoria 2
      </Space>
    ),
    children: [{ key: '2-1', label: <CategoriesSubMenu /> }],
  },
  {
    key: '3',
    label: (
      <Space>
        <ShopOutlined /> Categoria 3
      </Space>
    ),
    children: [{ key: '3-1', label: <CategoriesSubMenu /> }],
  },
]

export default function CategoriesMenu() {
  return (
    <ConfigProvider theme={theme}>
      <Dropdown
        menu={{ items }}
        placement="bottom"
        arrow
        trigger={['click']}
        overlayClassName="menu-categories"
      >
        <a onClick={(e) => e.preventDefault()}>
          <Button
            type="primary"
            icon={<MenuOutlined rev={undefined} />}
            size={'large'}
          >
            <b>DEPARTAMENTOS</b>
          </Button>
        </a>
      </Dropdown>
    </ConfigProvider>
  )
}
