import { qsBrands } from '@/queries/brand'
import useFilterStore from '@/store/filterStore'
import { BrandProps } from '@/types/brand-props'
import { fetcher } from '@/utils/fetcher'
import { ConfigProvider, Skeleton, ThemeConfig, Tree, Typography } from 'antd'
import type { DataNode } from 'antd/es/tree'
import { Key, useEffect, useState } from 'react'
import useSWR from 'swr'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {},
}

export default function FilterBrand() {
  const brandsStore = useFilterStore((state) => state.brands)
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(brandsStore)
  const { setBrands } = useFilterStore()

  const { data: brands, error: errorBrands } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/brands?${qsBrands}`,
    fetcher,
  )

  useEffect(() => {
    setCheckedKeys(brandsStore)
  }, [brandsStore])

  if (!brands) {
    return <Skeleton />
  }

  const brandNode = (brand: BrandProps) => {
    return {
      key: brand.attributes.slug,
      title: (
        <Text style={{ textTransform: 'capitalize' }}>
          {brand.attributes.name}
        </Text>
      ),
    }
  }

  const treeData = (categories: BrandProps[]) => {
    const treeData: DataNode[] = categories?.map((brand: BrandProps) => {
      return {
        ...brandNode(brand),
      }
    })

    return treeData
  }

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue)
    setBrands(checkedKeysValue)
  }

  return (
    <ConfigProvider theme={theme}>
      <Tree
        checkable
        treeData={treeData(brands?.data)}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
      />
    </ConfigProvider>
  )
}
