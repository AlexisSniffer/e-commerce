import styles from '@/styles/product.module.scss'
import { Variants } from '@/types/variants'
import { money, valMinMax } from '@/utils/formatters'
import { Flex, Typography } from 'antd'

const { Text } = Typography

export default function ProductPrices({
  price,
  discount,
  variants,
}: {
  price: number
  discount: {
    isDiscount: boolean
    discount?: number
    until?: Date
  }
  variants?: Variants[]
}) {
  let priceMinMax = null

  if (variants?.length) {
    priceMinMax = valMinMax(
      variants?.map((variant: Variants) => {
        let price: number = 0
        price = variant.isDiscount ? variant.discount ?? 0 : variant.price
        return price
      }),
    )
  }

  return (
    <div>
      {variants && priceMinMax ? (
        <Text className={styles['price']}>
          {priceMinMax.min} - {priceMinMax.max}
        </Text>
      ) : (
        <Flex gap={5}>
          {discount?.isDiscount ? (
            <Text className={styles['price']}>
              {money.format(discount.discount ?? 0)}
            </Text>
          ) : null}
          <Text
            className={`${styles['price']} ${
              discount?.isDiscount ? styles['is-discount'] : null
            }`}
          >
            {money.format(price)}
          </Text>
        </Flex>
      )}
    </div>
  )
}
