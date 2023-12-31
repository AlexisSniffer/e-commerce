import styles from '@/styles/product.module.scss'
import { Product } from '@/types/product'
import { money, valMinMax } from '@/utils/formatters'
import { Space, Typography } from 'antd'

const { Text } = Typography

export default function ProductPrices({ id, attributes }: Product) {
  return (
    <Text className={styles['price']}>
      {attributes.variants?.length ? (
        valMinMax(
          attributes.variants.map((variant: any) => {
            let price: number
            price = variant.isDiscount ? variant.discount : variant.price
            return price
          }),
        )
      ) : (
        <>
          {attributes.isDiscount ? (
            <Space>
              <span>{money.format(attributes.discount)}</span>
              <span className={`${styles['price']} ${styles['is-discount']}`}>
                {money.format(attributes.price)}
              </span>
            </Space>
          ) : (
            <span>{money.format(attributes.price)}</span>
          )}
        </>
      )}
    </Text>
  )
}
