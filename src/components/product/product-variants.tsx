import {
  ConfigProvider,
  Radio,
  RadioChangeEvent,
  Space,
  ThemeConfig,
  Typography,
} from 'antd'

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
  return (
    <ConfigProvider theme={theme}>
      <Space>
        <Text style={{ textTransform: 'uppercase' }}>{type}:</Text>
        <Radio.Group
          name="radiogroup"
          optionType="button"
          buttonStyle="solid"
          value={selectedOptions[type]}
          onChange={({ target: { value } }: RadioChangeEvent) => {
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
                {type === 'color' ? '' : value}
              </Radio>
            )
          })}
        </Radio.Group>
      </Space>
    </ConfigProvider>
  )
}
