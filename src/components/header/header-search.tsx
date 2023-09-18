'use client'

import styles from '@/styles/header.module.scss'
import SearchProps from '@/types/search-props'
import { ConfigProvider, Form, Input, ThemeConfig } from 'antd'
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

export default function HeaderSearch() {
  const router = useRouter()
  const [form] = Form.useForm()

  const onFinish = (values: SearchProps) => {
    const { filter, category } = values
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
            size="large"
            placeholder="Buscar..."
            onSearch={form.submit}
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}
