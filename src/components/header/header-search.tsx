'use client'

import styles from '@/styles/header.module.scss'
import SearchProps from '@/types/search-props'
import { Form, Input } from 'antd'
import { useRouter } from 'next/navigation'

const { Search } = Input

// TODO añadir categorias en filtro
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

// addonBefore={data ? categorySelect(data) : <Spin />}

export default function HeaderSearch() {
  const router = useRouter()
  const [form] = Form.useForm()

  const onFinish = (values: SearchProps) => {
    const { filter, category } = values
    router.push('/shop')
  }

  return (
    <Form
      form={form}
      name="headerSearch"
      onFinish={onFinish}
      initialValues={{
        ['filter']: '',
      }}
    >
      <Form.Item name="filter" className={styles['header__search']}>
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
