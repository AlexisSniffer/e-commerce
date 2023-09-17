import styles from '@/styles/header.module.scss'
import { PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import Link from 'next/link'

export default function Contact() {
  return (
    <Space direction="horizontal">
      <PhoneOutlined />
      <Link href={'tel:+68748978'}>
        <span>
          <b>(+507) 6874-8978</b>
        </span>
      </Link>
    </Space>
  )
}
