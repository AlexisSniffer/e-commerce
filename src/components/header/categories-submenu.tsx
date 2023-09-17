'use client'

import styles from '@/styles/header.module.scss'
import { Col, List, Row, Typography } from 'antd'
import Link from 'next/link'

const { Title } = Typography

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
    <div className={styles['categories-sub-menu']}>
      <Row justify={'space-between'} gutter={80}>
        {data.map((category: any) => {
          return (
            <>
              <Col>
                <Title level={5}>{category.name}</Title>
                <List
                  className={styles['categories-submenu']}
                  dataSource={category.subcategories}
                  renderItem={(item: any) => (
                    <List.Item key={item.name}>
                      <Link href={`${item.name}`}>{item.name} </Link>
                    </List.Item>
                  )}
                />
              </Col>
            </>
          )
        })}
      </Row>
    </div>
  )
}
