'use client'

import styles from '@/styles/header.module.scss'
import {
  Card,
  Col,
  ConfigProvider,
  List,
  Row,
  ThemeConfig,
  Typography,
} from 'antd'
import Link from 'next/link'

const { Title, Link: LinkAntd, Paragraph } = Typography

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

// TODO: realizar consulta a strapi
const data = [
  {
    name: 'Accesories',
    subcategories: [
      { name: 'Cables & Adaperts' },
      { name: 'Electronic Cigarettes' },
      { name: 'Batteries' },
      { name: 'Chargers' },
      { name: 'Home Electronic' },
      { name: 'Bags & Cases' },
    ],
  },
  {
    name: 'Audio & Video',
    subcategories: [
      { name: 'Televisions' },
      { name: 'Projectors' },
      { name: 'TV Peceivers' },
      { name: 'Audio Amplifier' },
      { name: 'TV Sticks' },
    ],
  },
  {
    name: 'Camera & Photos',
    subcategories: [
      { name: 'Digital Cameras' },
      { name: 'Camcorders' },
      { name: 'Camera Drones' },
      { name: 'Action Cameras' },
      { name: 'Photo Supplies' },
      { name: 'Camera & Photo' },
    ],
  },
  {
    name: 'Laptops',
    subcategories: [
      { name: 'Caming Laptops' },
      { name: 'Ultraslim Laptops' },
      { name: 'Laptop Accessories' },
      { name: 'Laptop Bags & Cases' },
      { name: 'Tablet Accessories' },
    ],
  },
]

export default function CategoriesSubMenu() {
  return (
    <>
      <Row justify={'space-between'} gutter={80}>
        {data.map((category: any) => {
          return (
            <ConfigProvider theme={theme} key={category.name}>
              <Col>
                <Paragraph
                  style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                >
                  {category.name}
                </Paragraph>
                <List
                  dataSource={category.subcategories}
                  renderItem={(item: any) => (
                    <List.Item key={item.name}>
                      <LinkAntd>
                        <Link href={`${item.name}`}>{item.name} </Link>
                      </LinkAntd>
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
