import SocialIcons from '@/components/common/social-icons'
import ProductAdd from '@/components/product/product-add'
import ProductCategories from '@/components/product/product-categories'
import ProductPrices from '@/components/product/product-price'
import { Product } from '@/types/product'
import {
  Col,
  ConfigProvider,
  Divider,
  Rate,
  Row,
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

const ProductDetail = ({ id, attributes }: Product) => {
  return (
    <ConfigProvider theme={theme}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}></Col>
        <Col xs={24} md={12}>
          <Space direction="vertical">
            <Title level={1}>{attributes.name}</Title>
            <Rate value={attributes.ratings} disabled></Rate>
            <Divider />
            <ProductPrices id={id} attributes={attributes} />
            <Paragraph>{attributes.description}</Paragraph>

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
              <Text>{attributes.deliveryTime?.data.attributes.time}</Text>
            </Space>
            <Divider />
            <ProductAdd id={id} attributes={attributes}></ProductAdd>
            <Divider />
            <SocialIcons />
          </Space>
        </Col>
      </Row>
    </ConfigProvider>
  )
}

export default ProductDetail
