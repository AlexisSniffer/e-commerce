import React, { useState } from 'react'

import { qsCategoryHeader } from '@/queries/category'
import { CategoryProps } from '@/types/category-props'
import { fetcher } from '@/utils/fetcher'
import { ConfigProvider, Skeleton, ThemeConfig, Tree, Typography } from 'antd'
import type { DataNode } from 'antd/es/tree'
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
  const { data: categories, error: errorCategories } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategoryHeader}`,
    fetcher,
  )

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([
    '0-0-0',
    '0-0-1',
    '0-1',
  ])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0'])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue)
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log('onCheck', checkedKeysValue)
    setCheckedKeys(checkedKeysValue)
  }

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info)
    setSelectedKeys(selectedKeysValue)
  }

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
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          //onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={treeData(categories?.data)}
        />
      ) : (
        <Skeleton />
      )}
    </ConfigProvider>
  )
}
