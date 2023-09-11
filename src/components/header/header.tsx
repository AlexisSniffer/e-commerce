import Logo from '@/components/common/logo'
import SocialIcons from '@/components/common/social-icons'
import Container from '@/components/utils/container'
import { Col, Layout, Row } from 'antd'
import styles from './header.module.scss'

const { Header } = Layout

export default function RootHeader() {
  return (
    <header>
      <Container className={styles.header}>
        <Row justify={'end'} align={'middle'} className={''}>
          <Col>i18n</Col>
          <Col>shop-user</Col>
          <Col>
            <SocialIcons size="xs" />
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
          <Col>
            contacts
            <Logo size="xs" />
            <Logo size="md" />
            <Logo size="lg" />
          </Col>
        </Row>
      </Container>
    </header>
  )
}
