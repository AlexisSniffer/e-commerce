import Logo from '@/components/common/logo'
import SocialIcons from '@/components/common/social-icons'
import Container from '@/components/utils/container'
import styles from '@/styles/header.module.scss'
import { Col, Layout, Row, Select } from 'antd'
import Languages from './languages'

const { Header } = Layout

export default function RootHeader() {
  return (
    <header>
      <Container className={styles.header}>
        <Row justify={'end'} align={'middle'} className={''}>
          <Col>
            <Languages />
          </Col>
          <Col>menu</Col>
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
