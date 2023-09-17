'use client'

import Logo from '@/components/common/logo'
import SocialIcons from '@/components/common/social-icons'
import Container from '@/components/utils/container'
import styles from '@/styles/header.module.scss'
import { Affix, Col, Row } from 'antd'
import { useState } from 'react'
import Account from './account'
import CartIcons from './cart-icons'
import CategoriesMenu from './categories-menu'
import Contact from './contact'
import HeaderInfo from './header-info'
import HeaderSearch from './header-search'
import Languages from './languages'
import MainMenu from './main-menu'
import TopMenu from './top-menu'

export default function RootHeader() {
  const [affix, setAffix] = useState<boolean>(false)

  return (
    <header className={styles['header']}>
      <Container className={styles['header__top']}>
        <Row
          justify={'space-between'}
          align={'middle'}
          gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 0]}
        >
          <Col xs={0} sm={12} lg={8}>
            <HeaderInfo />
          </Col>
          <Col xs={24} sm={12} lg={16}>
            <Row
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
      </Container>

      <Container className={styles['header__middle']}>
        <Row
          align={'middle'}
          justify={'space-between'}
          gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 0]}
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
      </Container>

      <Affix
        onChange={(affixed?: boolean) => {
          setAffix(affixed!)
        }}
      >
        <Container
          className={`${styles['header__bottom']} ${
            affix ? styles.affix : null
          }`}
        >
          <Col xs={0} lg={24}>
            <Row
              justify={'space-between'}
              align={'middle'}
              gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 0]}
            >
              <Col>
                <CategoriesMenu />
              </Col>
              <Col flex={'auto'}>
                <Row justify={'space-between'} align={'middle'}>
                  <Col>
                    <MainMenu />
                  </Col>
                  <Col>
                    <Contact />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Container>
      </Affix>
    </header>
  )
}
