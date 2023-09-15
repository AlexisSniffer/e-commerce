'use client'

import { MenuOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Dropdown, MenuProps, ThemeConfig } from 'antd'
import CategoriesSubMenu from './categories-submenu'

const theme: ThemeConfig = {
  components: {
    Dropdown: {},
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
    label: 'Categoria 1',
    children: [{ key: '1-1', label: <CategoriesSubMenu /> }],
  },
  {
    key: '2',
    label: 'Categoria 2',
    children: [{ key: '2-1', label: <CategoriesSubMenu /> }],
  },
  {
    key: '3',
    label: 'Categoria 3',
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
