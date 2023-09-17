import styles from '@/styles/header.module.scss'
import { UserOutlined } from '@ant-design/icons'
import { Space } from 'antd'

export default function Account() {
  return (
    <Space
      direction="horizontal"
      size={'middle'}
      className={styles['header__account']}
    >
      <UserOutlined className={styles['header__account__icon']} />
      <Space direction="vertical" className={styles['header__account__info']}>
        <span className={styles['header__account__info__subtitle']}>
          Bienvenido
        </span>
        <h3 className={styles['header__account__info__title']}>Mi Cuenta</h3>
      </Space>
    </Space>
  )
}
