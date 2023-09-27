import {
  CategoryHeaderListProps,
  CategoryHeaderProps,
} from '@/types/category-props'
import SearchProps from '@/types/search-props'
import {
  ConfigProvider,
  Form,
  Input,
  Select,
  SelectProps,
  Spin,
  ThemeConfig,
} from 'antd'
import { useRouter } from 'next/navigation'

const { Search } = Input

const theme: ThemeConfig = {
  components: {
    Form: {
      itemMarginBottom: 0,
      algorithm: true,
    },
  },
}

const selectBefore = ({ categories }: CategoryHeaderListProps) => {
  let options: SelectProps['options'] = [{ value: 'all', label: 'Todos' }]

  categories.data.map((category: CategoryHeaderProps) => {
    options?.push({
      value: category.attributes.slug,
      label: category.attributes.name,
    })

    if (
      category.attributes.categories &&
      category.attributes.categories?.data.length > 0
    ) {
      category.attributes.categories?.data.map((subcategory: any) => {
        options?.push({
          value: subcategory.attributes.slug,
          label: `- ${subcategory.attributes.name}`,
        })
      })
    }
  })

  return (
    <Form.Item name="category" noStyle initialValue="all">
      <Select options={options} />
    </Form.Item>
  )
}

export default function HeaderSearch({ categories }: CategoryHeaderListProps) {
  const router = useRouter()
  const [form] = Form.useForm()

  const onFinish = (values: SearchProps) => {
    router.push('/shop')
  }

  return (
    <ConfigProvider theme={theme}>
      <Form
        form={form}
        name="headerSearch"
        onFinish={onFinish}
        initialValues={{
          ['filter']: '',
        }}
      >
        <Form.Item name="filter">
          <Search
            enterButton
            allowClear
            size="large"
            placeholder="Buscar..."
            addonBefore={categories ? selectBefore({ categories }) : <Spin />}
            onSearch={form.submit}
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}
