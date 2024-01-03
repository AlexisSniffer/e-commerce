import SocialIcons from '@/components/common/social-icons'
import ProductAdd from '@/components/product/product-add'
import ProductCategories from '@/components/product/product-categories'
import ProductPrices from '@/components/product/product-price'
import useShopStore from '@/store/shopStore'
import styles from '@/styles/product.module.scss'
import { Product } from '@/types/product'
import {
  ConfigProvider,
  Divider,
  Flex,
  Rate,
  Space,
  Tag,
  ThemeConfig,
  Typography,
} from 'antd'
import { useEffect } from 'react'
import Countdown from '../common/countdown'

const theme: ThemeConfig = {
  components: {
    Typography: {},
    Button: {
      borderRadius: 0,
    },
  },
}

const { Title, Paragraph, Text } = Typography

export default function ProductDetail({ id, attributes }: Product) {
  const { setViewProducts } = useShopStore()

  useEffect(() => {
    setViewProducts(id)
  }, [id, setViewProducts])

  return (
    <ConfigProvider theme={theme}>
      <Space direction="vertical" className={styles['product-detail']}>
        <Title level={1} style={{ margin: 0 }}>
          {attributes.name}
        </Title>
        <Rate value={attributes.ratings} disabled></Rate>
        <Divider style={{ marginTop: '0.5em', marginBottom: '0.5em' }} />
        <ProductPrices
          price={attributes.price}
          discount={{
            isDiscount: attributes.isDiscount,
            discount: attributes.discount,
            until: attributes.until,
          }}
          variants={attributes.variants}
        />
        {attributes.discount &&
        attributes.until &&
        new Date(attributes.until) > new Date() ? (
          <Tag className={styles['offer2']}>
            <span>oferta termina en:</span>{' '}
            <Countdown targetDate={attributes.until} />
          </Tag>
        ) : null}
        <Paragraph>{attributes.description}</Paragraph>
        <Flex vertical>
          <Space>
            <Text>CATEGORIAS:</Text>
            <ProductCategories id={id} attributes={attributes} />
          </Space>
          <Space>
            <Text>VENDEDOR:</Text>
            <Text>{`${attributes.createdBy.firstname} ${attributes.createdBy.lastname}`}</Text>
          </Space>
          <Space>
            <Text>TIEMPO DE ENTREGA:</Text>
            <Text>
              {attributes.deliveryTime?.data
                ? attributes.deliveryTime.data.attributes.time
                : 'N/A'}
            </Text>
          </Space>
          <Space>
            <Text>STOCK:</Text>
            <Text>{attributes.stock == 0 ? 'Agotado' : 'Disponible'}</Text>
          </Space>
        </Flex>
        <ProductAdd id={id} attributes={attributes}></ProductAdd>
        <Divider style={{ marginTop: '0.5em', marginBottom: '0.5em' }} />
        <SocialIcons />
      </Space>
    </ConfigProvider>
  )
}
