'use client'

import SearchProps from '@/types/search-props'
import { ConfigProvider, Form, Input, Select, ThemeConfig } from 'antd'
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

const selectAfter = (
  <Form.Item name="category" noStyle initialValue="">
    <Select
      defaultValue="all"
      options={[
        { value: 'all', label: 'Todos' },
        { value: 'fashion', label: 'Moda' },
        { value: 'man', label: '- Hombre' },
        { value: 'woman', label: '- Mujer' },
      ]}
    ></Select>
  </Form.Item>
)

export default function HeaderSearch() {
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
            addonBefore={selectAfter}
            onSearch={form.submit}
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}
