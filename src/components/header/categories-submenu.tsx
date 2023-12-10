import useFilterStore from '@/store/filterStore'
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
import { useRouter } from 'next/navigation'

const { Text, Paragraph } = Typography

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
  const router = useRouter()
  const { setCategories } = useFilterStore()

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
                      <Text
                        style={{
                          textTransform: 'capitalize',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setCategories([item.attributes.slug])
                          router.push('/shop')
                        }}
                      >
                        {item.attributes.name}
                      </Text>
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
