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
import CartIcons from './cart-icons'
import CategoriesMenu from './categories-menu'

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
          <Col xs={0} sm={12} lg={8}>
            <HeaderInfo />
          </Col>
          <Col xs={24} sm={12} lg={16}>
            <Row
              className={styles['header__middle']}
              justify={{ xs: 'space-between', sm: 'end' }}
              align={'middle'}
              gutter={{ xs: 8, sm: 16, md: 24 }}
            >
              <Col>
                <Languages />
              </Col>
              <Col flex={'0 0 auto'} xs={{ span: 0 }} lg={24}>
                <TopMenu />
              </Col>
              <Col>
                <SocialIcons size="xs" />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row
          className={styles['header__middle']}
          justify={'space-between'}
          align={'middle'}
          gutter={{ xs: 8, sm: 16, md: 24 }}
        >
          <Col>
            <Logo />
          </Col>
          <Col flex={'auto'} xs={0} lg={24}>
            <HeaderSearch />
          </Col>
          <Col flex={'0 0 auto'} xs={0} lg={24}>
            <Account />
          </Col>
          <Col>
            <CartIcons />
          </Col>
        </Row>

        <Row className={styles['header__bottom']} align={'middle'}>
          <Col>
            <CategoriesMenu />
          </Col>
          <Col>
            <MainMenu />
          </Col>
          <Col>[Sección de contacto]</Col>
        </Row>
      </Container>
    </header>
  )
}
