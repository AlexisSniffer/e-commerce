import { Col, Row } from 'antd'
import { CSSProperties } from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  style?: CSSProperties | undefined
}

export default function Container({
  children,
  className,
  style,
}: ContainerProps) {
  return (
    <Row className={className} style={style}>
      <Col xs={1} lg={2}></Col>
      <Col xs={22} lg={20}>
        {children}
      </Col>
      <Col xs={1} lg={2}></Col>
    </Row>
  )
}
