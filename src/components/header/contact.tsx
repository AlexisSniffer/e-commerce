import { PhoneOutlined } from '@ant-design/icons'
import { ConfigProvider, Space, ThemeConfig, Typography } from 'antd'
import Link from 'next/link'

const { Link: LinkAntd } = Typography

const theme: ThemeConfig = {
  components: {
    Typography: {
      colorLink: '#666',
      colorLinkHover: '#777',
      colorLinkActive: '#777',
    },
  },
}

export default function Contact() {
  return (
    <ConfigProvider theme={theme}>
      <Space direction="horizontal">
        <PhoneOutlined />
        <LinkAntd>
          <Link href={'tel:+68748978'}>
            <span>
              <b>(+507) 6874-8978</b>
            </span>
          </Link>
        </LinkAntd>
      </Space>
    </ConfigProvider>
  )
}
