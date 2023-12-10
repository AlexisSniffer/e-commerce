import { qsMaxPrice } from '@/queries/price'
import useFilterStore from '@/store/filterStore'
import { fetcher } from '@/utils/fetcher'
import { ConfigProvider, Skeleton, Slider, ThemeConfig, Typography } from 'antd'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Typography: {
      colorText: '#777',
    },
  },
}

export default function FilterPrice() {
  const pricesStore = useFilterStore((state) => state.prices)
  const { setPrices } = useFilterStore()

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsMaxPrice}`,
    fetcher,
  )

  const maxPrice = data?.data[0].attributes.price

  useEffect(() => {
    setPrices([0, maxPrice])
  }, [maxPrice, setPrices])

  if (!data) {
    return <Skeleton />
  }

  const onChange = (prices: [number, number]) => {
    setPrices(prices)
  }

  return (
    <ConfigProvider theme={theme}>
      <Slider
        range
        defaultValue={[0, maxPrice]}
        min={0}
        max={maxPrice}
        onAfterChange={onChange}
      />
      <Text>
        Precio: ${pricesStore[0]} - ${pricesStore[1]}
      </Text>
    </ConfigProvider>
  )
}
