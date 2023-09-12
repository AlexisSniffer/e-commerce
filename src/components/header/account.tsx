import styles from '@/styles/header.module.scss'
import { UserOutlined } from '@ant-design/icons'
import { Space } from 'antd'

export default function Account() {
  return (
    <Space direction="horizontal" size={'middle'} className={styles['account']}>
      <UserOutlined className={styles['account__icon']} />
      <Space direction="vertical" className={styles['account__info']}>
        <span className={styles['account__info__subtitle']}>Bienvenido</span>
        <h3 className={styles['account__info__title']}>Mi Cuenta</h3>
      </Space>
    </Space>
  )
}
