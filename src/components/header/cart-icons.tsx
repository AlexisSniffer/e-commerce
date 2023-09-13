'use client'

import {
  HeartOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'
import { Badge, Button, Col, Row } from 'antd'

export default function CartIcons() {
  return (
    <Row gutter={{ xs: 24, sm: 24, md: 24 }}>
      <Col flex={'0 0 auto'} xs={0} sm={24} lg={0}>
        <SearchOutlined style={{ fontSize: '1.7rem' }} rev={undefined} />
      </Col>
      <Col>
        <Badge count={4}>
          <HeartOutlined style={{ fontSize: '1.7rem' }} rev={undefined} />
        </Badge>
      </Col>
      <Col>
        <Badge count={4}>
          <ShoppingOutlined style={{ fontSize: '1.7rem' }} rev={undefined} />
        </Badge>
      </Col>
    </Row>
  )
}
