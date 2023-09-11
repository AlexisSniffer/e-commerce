import Logo from '@/components/common/logo'
import SocialIcons from '@/components/common/social-icons'
import Container from '@/components/utils/container'
import styles from '@/styles/header.module.scss'
import { Col, Layout, Row, Space } from 'antd'
import Languages from './languages'
import MenuShop from './menu'
import { CarFilled } from '@ant-design/icons'

const { Header } = Layout

export default function RootHeader() {
  return (
    <header>
      <Container className={styles.header}>
        <Row justify={'space-between'} align={'middle'} className={''}>
          <Col>
            <Space direction="horizontal">
              <CarFilled />
              FREE Express Shipping On Orders $99+
            </Space>
          </Col>
          <Col>
            <Space direction="horizontal" size={'large'}>
              <Languages />
              <MenuShop />
              <SocialIcons size="xs" />
            </Space>
          </Col>
        </Row>

        <Row align={'middle'} className={''}>
          <Col>
            <Logo />
          </Col>
          <Col flex="auto">search</Col>
          <Col>my-account</Col>
          <Col>cart</Col>
        </Row>

        <Row align={'middle'} className={''}>
          <Col>categories</Col>
          <Col flex="auto">menu</Col>
          <Col>contacts</Col>
        </Row>
      </Container>
    </header>
  )
}
