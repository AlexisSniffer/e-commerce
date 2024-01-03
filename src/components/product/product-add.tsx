import { Product } from '@/types/product'
import { Variants } from '@/types/variants'
import { Variation } from '@/types/variation'
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  InputNumber,
  Row,
  Space,
  ThemeConfig,
  Typography,
} from 'antd'
import { useState } from 'react'
import ProductPrices from './product-price'
import ProductVariants from './product-variants'

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
  const allVariantOptions = attributes.variants?.map((variant: Variants) => {
    const allOptions: any = {}

    variant.variant.map((variation: Variation) => {
      allOptions[variation.type?.data.attributes.type ?? ''] = variation.value
        .toLowerCase()
        .trim()
    })

    return {
      id: variant.id,
      price: variant.price,
      discount: variant.discount,
      isDiscount: variant.isDiscount,
      until: variant.until,
      variant: allOptions,
    }
  })

  let optionsMap: any = new Map()
  allVariantOptions
    .map((e) => e.variant)
    .map((e) => {
      const keys = Object.keys(e)

      keys.forEach((key) => {
        if (!optionsMap.has(key)) {
          optionsMap.set(key, new Set())
        }

        optionsMap.get(key).add(e[key])
      })
    })

  let options = []
  const defaultValues: any = {}
  for (const [key, value] of optionsMap) {
    defaultValues[key] = value.values().next().value

    options.push({
      type: key,
      values: value,
    })
  }

  const [selectedVariant, setSelectedVariant] = useState<any | null>()
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)

  const setOptions = (type: string, value: string) => {
    setSelectedOptions((prevState: any) => {
      return { ...prevState, [type]: value }
    })

    const selection = {
      ...selectedOptions,
      [type]: value,
    }

    setSelectedVariant(null)
    allVariantOptions.map((item) => {
      if (JSON.stringify(item.variant) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }
  ///////////////////////////////////////////////

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <ConfigProvider theme={theme}>
      <Row>
        <Col span={24}>
          {options.map(({ type, values }) => (
            <ProductVariants
              key={type}
              type={type}
              values={Array.from(values)}
              selectedOptions={selectedOptions}
              setOptions={setOptions}
            />
          ))}
        </Col>
      </Row>
      <Divider style={{ marginTop: '1em', marginBottom: '1em' }} />
      <Row>
        <Col>
          {attributes.variants.length && selectedVariant ? (
            <ProductPrices
              price={selectedVariant.price}
              discount={{
                isDiscount: selectedVariant.isDiscount,
                discount: selectedVariant.discount,
                until: selectedVariant.until,
              }}
            />
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col>
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
                  disabled={
                    attributes.variants.length ? selectedVariant == null : false
                  }
                />

                <Button
                  type="primary"
                  size="large"
                  onClick={form.submit}
                  disabled={
                    attributes.variants.length ? selectedVariant == null : false
                  }
                >
                  Añadir a carrito
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </ConfigProvider>
  )
}
