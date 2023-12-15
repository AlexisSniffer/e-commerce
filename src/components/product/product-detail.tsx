import SocialIcons from '@/components/common/social-icons'
import ProductAdd from '@/components/product/product-add'
import ProductCategories from '@/components/product/product-categories'
import ProductPrices from '@/components/product/product-price'
import { Product } from '@/types/product'
import {
  ConfigProvider,
  Divider,
  Flex,
  Rate,
  Space,
  ThemeConfig,
  Typography,
} from 'antd'

const theme: ThemeConfig = {
  components: {
    Typography: {},
    Button: {
      borderRadius: 0,
    },
  },
}

const { Title, Paragraph, Text } = Typography

export default function ProductDetail({ id, attributes }: Product) {
  return (
    <ConfigProvider theme={theme}>
      <Space direction="vertical">
        <Title level={1}>{attributes.name}</Title>
        <Rate value={attributes.ratings} disabled></Rate>
        <Divider />
        <ProductPrices id={id} attributes={attributes} />
        <Paragraph>{attributes.description}</Paragraph>
        <Flex vertical>
          <Space>
            <Text>CATEGORIAS:</Text>
            <ProductCategories id={id} attributes={attributes} />
          </Space>
          <Space>
            <Text>VENDEDOR:</Text>
            <Text>{`${attributes.createdBy.firstname} ${attributes.createdBy.lastname}`}</Text>
          </Space>
          <Space>
            <Text>TIEMPO DE ENTREGA:</Text>
            <Text>
              {attributes.deliveryTime?.data
                ? attributes.deliveryTime.data.attributes.time
                : 'N/A'}
            </Text>
          </Space>
        </Flex>
        <Divider />
        <ProductAdd id={id} attributes={attributes}></ProductAdd>
        <Divider />
        <SocialIcons />
      </Space>
    </ConfigProvider>
  )
}
