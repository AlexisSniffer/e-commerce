import {
  CategoryHeaderListProps,
  CategoryHeaderProps,
} from '@/types/category-props'
import { MenuOutlined } from '@ant-design/icons'
import {
  Button,
  ConfigProvider,
  Dropdown,
  MenuProps,
  ThemeConfig,
  Typography,
} from 'antd'
import CategoriesSubMenu from './categories-submenu'

const { Link } = Typography

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

export default function CategoriesMenu({
  categories,
}: CategoryHeaderListProps) {
  let items: MenuProps['items'] = []

  categories?.data.map((category: CategoryHeaderProps) => {
    items?.push({
      key: category.attributes.slug,
      label: (
        <Link style={{ textTransform: 'capitalize' }}>
          {category.attributes.name}
        </Link>
      ),
      children: [
        {
          key: `sub-${category.attributes.slug}`,
          label: <CategoriesSubMenu category={category} />,
        },
      ],
    })
  })

  return (
    <ConfigProvider theme={theme}>
      <Dropdown menu={{ items }} placement="bottom" arrow trigger={['click']}>
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
