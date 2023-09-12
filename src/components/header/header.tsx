import Logo from '@/components/common/logo'
import SocialIcons from '@/components/common/social-icons'
import Container from '@/components/utils/container'
import styles from '@/styles/header.module.scss'
import { Col, Layout, Row, Space } from 'antd'
import Account from './account'
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
          className={styles['header__top']}
          justify={'space-between'}
          align={'middle'}
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

        <Row
          className={styles['header__middle']}
          align={'middle'}
          gutter={{ xs: 8, sm: 16, md: 24 }}
        >
          <Col>
            <Logo />
          </Col>
          <Col flex={'auto'} xs={0} lg={24}>
            <HeaderSearch />
          </Col>
          <Col>
            <Account />
          </Col>
          <Col>cart</Col>
        </Row>

        <Row className={styles['header__bottom']} align={'middle'}>
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
