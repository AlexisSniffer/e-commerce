import useFilterStore from '@/store/filterStore'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import {
  Carousel,
  ConfigProvider,
  Flex,
  Skeleton,
  ThemeConfig,
  Typography,
} from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from '@/styles/products-filter.module.scss'

const theme: ThemeConfig = {
  components: {
    Card: {
      borderRadiusLG: 0,
    },
  },
}

const { Text } = Typography

const responsive = [
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 576,
    settings: {
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 4,
    },
  },
  {
    breakpoint: 992,
    settings: {
      slidesToShow: 6,
    },
  },
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 7,
    },
  },
]

export default function CategoriesSlider({
  categories,
}: {
  categories: Payload<Category[]> | undefined
}) {
  const router = useRouter()
  const { setCategories } = useFilterStore()

  if (!categories) {
    return <Skeleton />
  }

  return (
    <ConfigProvider theme={theme}>
      <pre>{JSON.stringify(categories, null, 2)}</pre>
      <Carousel
        slidesToShow={categories.data.length < 8 ? categories.data?.length : 8}
        draggable={true}
        infinite={true}
        dots={false}
        autoplay={true}
        responsive={responsive}
        className={styles['carousel-categories']}
      >
        {categories.data.map((category: Category) => {
          return (
            <div key={category.attributes.slug}>
              <Flex
                vertical
                align="center"
                className={styles['container']}
                onClick={() => {
                  setCategories([category.attributes.slug])
                  router.push('/shop')
                }}
              >
                <Image
                  width={128}
                  height={128}
                  alt={
                    category.attributes.thumbnail?.data.attributes
                      .alternativeText ?? 'category'
                  }
                  src={
                    'http://localhost:1337' +
                    category.attributes.thumbnail?.data.attributes.url
                  }
                  className={styles['thumbnail']}
                />
                <Text className={styles['name']}>
                  {category.attributes.name}
                </Text>
                <Text className={styles['count']}>1 products</Text>
              </Flex>
            </div>
          )
        })}
      </Carousel>
    </ConfigProvider>
  )
}
