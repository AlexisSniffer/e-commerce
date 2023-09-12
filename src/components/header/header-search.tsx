'use client'

import SearchProps from '@/types/search-props'
import { Form, Input, Select, Spin } from 'antd'
import { useRouter } from 'next/navigation'

const { Search } = Input

/*const categorySelect = (data: any) => {
  let categoryOptions: any = [{ value: '', label: 'Todos' }]

  if (data.data != null) {
    data.data.forEach((category: any) => {
      categoryOptions.push({
        value: category.attributes.slug,
        label: category.attributes.name,
      })
    })
  }

  return (
    <Form.Item name="category" noStyle initialValue="">
      <Select options={categoryOptions} />
    </Form.Item>
  )
}*/

export default function HeaderSearch() {
  const router = useRouter()
  const [form] = Form.useForm()

  // TODO: añadir types
  const onFinish = (values: SearchProps) => {
    const { filter, category } = values

    router.push('/shop')
  }

  // TODO: añadir estilos - className={styles['header-search']}
  // TODO: añadir estilos - className={styles['header-search-item']}
  // TODO: addonBefore={data ? categorySelect(data) : <Spin />}

  return (
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
  )
}
