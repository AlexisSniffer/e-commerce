import SocialIcons from '@/components/common/social-icons'
import ProductAdd from '@/components/product/product-add'
import ProductCategories from '@/components/product/product-categories'
import ProductPrices from '@/components/product/product-price'
import styles from '@/styles/product.module.scss'
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
      <Space direction="vertical" className={styles['product-detail']}>
        <Title level={1} style={{ margin: 0 }}>
          {attributes.name}
        </Title>
        <Rate value={attributes.ratings} disabled></Rate>
        <Divider style={{ marginTop: '0.5em', marginBottom: '0.5em' }} />
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
        <ProductAdd id={id} attributes={attributes}></ProductAdd>
        <Divider style={{ marginTop: '0.5em', marginBottom: '0.5em' }} />
        <SocialIcons />
      </Space>
    </ConfigProvider>
  )
}