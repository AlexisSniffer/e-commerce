'use client'

import {
  HeartOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'
import { Badge, Button, Col, Row } from 'antd'

export default function CartIcons() {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
      <Col>
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
