import { SubCategoriesProps } from '@/types/category-props'
import {
  Card,
  Col,
  ConfigProvider,
  List,
  Row,
  ThemeConfig,
  Typography,
} from 'antd'

const { Link, Paragraph } = Typography

const theme: ThemeConfig = {
  components: {
    List: {
      lineWidth: 0,
      itemPadding: '7px 0',
    },
    Typography: {
      colorLink: '#666',
      colorLinkHover: '#777',
      colorLinkActive: '#777',
      linkHoverDecoration: 'underline',
    },
  },
}

export default function CategoriesSubMenu({ categories }: SubCategoriesProps) {
  return (
    <>
      <Row justify={'space-between'} gutter={80}>
        {categories?.data.map((category: any) => {
          return (
            <ConfigProvider theme={theme} key={category.id}>
              <Col>
                <Paragraph
                  style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                >
                  {category.attributes.name}
                </Paragraph>
                <List
                  dataSource={category.attributes.categories.data}
                  renderItem={(item: any) => (
                    <List.Item key={item.attributes.name}>
                      <Link
                        href={`${item.attributes.slug}`}
                        style={{ textTransform: 'capitalize' }}
                      >
                        {item.attributes.name}
                      </Link>
                    </List.Item>
                  )}
                />
              </Col>
            </ConfigProvider>
          )
        })}
      </Row>
      <br />
      <Row gutter={24}>
        <Col span={12}>
          <Card>Espacio publicitario</Card>
        </Col>
        <Col span={12}>
          <Card>Espacio publicitario</Card>
        </Col>
      </Row>
    </>
  )
}
