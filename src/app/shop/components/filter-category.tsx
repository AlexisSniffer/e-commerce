import React, { useState, Key } from 'react'

import { qsCategoryHeader } from '@/queries/category'
import { CategoryProps } from '@/types/category-props'
import { fetcher } from '@/utils/fetcher'
import { ConfigProvider, Skeleton, ThemeConfig, Tree, Typography } from 'antd'
import type { DataNode, TreeProps } from 'antd/es/tree'
import useSWR from 'swr'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Card: {
      padding: 8,
      paddingXXS: 8,
      paddingLG: 8,
      borderRadiusLG: 0,
    },
    Button: {
      borderRadius: 0,
    },
  },
}

export default function FilterCategory() {
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([])
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([])

  const onSelect = (selectedKeysValue: Key[]) => {
    setSelectedKeys(selectedKeysValue)
  }

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue)
  }

  const { data: categories, error: errorCategories } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategoryHeader}`,
    fetcher,
  )

  const isExpanded: Key[] = categories?.data
    .filter((category: CategoryProps) => category.attributes.isExpanded)
    .map((category: CategoryProps) => category.attributes.slug)

  const treeData = (categories: CategoryProps[]) => {
    const treeData: DataNode[] = categories?.map((category: CategoryProps) => {
      return {
        key: category.attributes.slug,
        title: (
          <Text style={{ textTransform: 'capitalize' }}>
            {category.attributes.name}
          </Text>
        ),
        children: category.attributes.categories?.data.map(
          (category2: CategoryProps) => {
            return {
              key: category2.attributes.slug,
              title: (
                <Text style={{ textTransform: 'capitalize' }}>
                  {category2.attributes.name}
                </Text>
              ),
              children: category2.attributes.categories?.data.map(
                (category3: CategoryProps) => {
                  return {
                    key: category3.attributes.slug,
                    title: (
                      <Text style={{ textTransform: 'capitalize' }}>
                        {category3.attributes.name}
                      </Text>
                    ),
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

  return (
    <ConfigProvider theme={theme}>
      {categories?.data ? (
        <Tree
          checkable
          treeData={treeData(categories?.data)}
          selectedKeys={selectedKeys}
          checkedKeys={checkedKeys}
          onCheck={onCheck}
          onSelect={onSelect}
        />
      ) : (
        <Skeleton />
      )}
      selectedKeys
      <pre>{JSON.stringify(selectedKeys, null, 2)}</pre>
      checkedKeys
      <pre>{JSON.stringify(checkedKeys, null, 2)}</pre>
    </ConfigProvider>
  )
}
