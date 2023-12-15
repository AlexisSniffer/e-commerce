import { Product } from '@/types/product'
import {
  Button,
  ConfigProvider,
  Form,
  InputNumber,
  Space,
  ThemeConfig,
  Typography,
} from 'antd'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 0,
    },
    Space: {
      borderRadius: 0,
    },
  },
}

export default function ProductAdd({ id, attributes }: Product) {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <ConfigProvider theme={theme}>
      <Form
        form={form}
        name="productDetailForm"
        labelCol={{ span: 8 }}
        initialValues={{
          ['qty']: 1,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="qty"
          rules={[{ required: true }]}
          style={{ width: '100px', margin: 0 }}
        >
          <Space>
            <InputNumber
              size="large"
              style={{ width: '100px' }}
              maxLength={16}
              min={1}
              max={20}
              /* disabled={
                      attributes.variants.length
                        ? selectedVariant == null
                        : false
                    } */
            />

            <Button
              type="primary"
              size="large"
              onClick={form.submit}
              /* disabled={
                    product.attributes.variants.length > 0
                      ? selectedVariant == null
                      : false
                  } */
            >
              Añadir a carrito
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}
