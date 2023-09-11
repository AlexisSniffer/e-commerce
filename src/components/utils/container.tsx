import { Col, Row } from 'antd'

export default function Container({ children, className }: any) {
  return (
    <Row className={className}>
      <Col xs={1} lg={2}></Col>
      <Col xs={22} lg={20}>
        {children}
      </Col>
      <Col xs={1} lg={2}></Col>
    </Row>
  )
}