import { qsCategory } from '@/queries/category'
import useFilterStore from '@/store/filterStore'
import { CategoryProps } from '@/types/category-props'
import { fetcher } from '@/utils/fetcher'
import { ConfigProvider, Skeleton, ThemeConfig, Tree, Typography } from 'antd'
import type { DataNode } from 'antd/es/tree'
import { Key, useEffect, useState } from 'react'
import useSWR from 'swr'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {},
}

export default function FilterCategory() {
  const categoriesStore = useFilterStore((state) => state.categories)
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(categoriesStore)
  const { setCategories } = useFilterStore()

  const { data: categories, error: errorCategories } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategory}`,
    fetcher,
  )

  useEffect(() => {
    setCheckedKeys(categoriesStore)
  }, [categoriesStore])

  if (!categories) {
    return <Skeleton />
  }

  const categoryNode = (category: CategoryProps) => {
    return {
      key: category.attributes.slug,
      title: (
        <Text style={{ textTransform: 'capitalize' }}>
          {category.attributes.name}
        </Text>
      ),
    }
  }

  const treeData = (categories: CategoryProps[]) => {
    const treeData: DataNode[] = categories?.map((category: CategoryProps) => {
      return {
        ...categoryNode(category),
        children: category.attributes.categories?.data.map(
          (category2: CategoryProps) => {
            return {
              ...categoryNode(category2),
              children: category2.attributes.categories?.data.map(
                (category3: CategoryProps) => {
                  return {
                    ...categoryNode(category3),
                  }
                },
              ),
            }
          },
        ),
      }
    })

    return treeData
  }

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue)
    setCategories(checkedKeysValue)
  }

  return (
    <ConfigProvider theme={theme}>
      <Tree
        checkable
        treeData={treeData(categories?.data)}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
      />
    </ConfigProvider>
  )
}
