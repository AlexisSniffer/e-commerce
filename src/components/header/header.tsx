import Logo from '@/components/common/logo'
import SocialIcons from '@/components/common/social-icons'
import Container from '@/components/utils/container'
import styles from '@/styles/header.module.scss'
import { Col, Layout, Row, Space } from 'antd'
import HeaderInfo from './header-info'
import HeaderSearch from './header-search'
import Languages from './languages'
import MainMenu from './main-menu'
import TopMenu from './top-menu'

const { Header } = Layout

export default function RootHeader() {
  return (
    <header>
      <Container className={styles.header}>
        <Row
          justify={'space-between'}
          align={'middle'}
          className={styles['header-top']}
        >
          <Col>
            <Space direction="horizontal">
              <HeaderInfo />
            </Space>
          </Col>
          <Col>
            <Space direction="horizontal" size={'large'}>
              <Languages />
              <TopMenu />
              <SocialIcons size="xs" />
            </Space>
          </Col>
        </Row>

        <Row align={'middle'} gutter={{ xs: 8, sm: 16, md: 24 }} className={''}>
          <Col>
            <Logo />
          </Col>
          <Col flex="auto">
            <HeaderSearch />
          </Col>
          <Col>my-account</Col>
          <Col>cart</Col>
        </Row>

        <Row align={'middle'} className={''}>
          <Col>categories</Col>
          <Col>
            <MainMenu />
          </Col>
          <Col>contacts</Col>
        </Row>
      </Container>
    </header>
  )
}
