import { CheckCircleFilled, CheckOutlined } from '@ant-design/icons'
import {
  ConfigProvider,
  Radio,
  RadioChangeEvent,
  Space,
  ThemeConfig,
  Typography,
} from 'antd'
import { useState } from 'react'

const theme: ThemeConfig = {
  components: {
    Radio: {
      borderRadius: 0,
    },
  },
}

const { Text } = Typography

export default function ProductVariants({
  type,
  values,
  selectedOptions,
  setOptions,
}: any) {
  const [selectedVariant, setSelectedVariant] = useState<string>()

  return (
    <ConfigProvider theme={theme}>
      <Space>
        <Text style={{ textTransform: 'uppercase' }}>{type}:</Text>
        <Radio.Group
          name="radiogroup"
          optionType="button"
          buttonStyle="solid"
          onChange={({ target: { value } }: RadioChangeEvent) => {
            setSelectedVariant(value)
            setOptions(type, value)
          }}
        >
          {values.map((value: any) => {
            return (
              <Radio
                key={value}
                value={value}
                style={{ backgroundColor: value }}
              >
                {type === 'color' ? (
                  selectedVariant == value ? (
                    <CheckOutlined />
                  ) : (
                    <></>
                  )
                ) : (
                  value
                )}
              </Radio>
            )
          })}
        </Radio.Group>
      </Space>
    </ConfigProvider>
  )
}
