import { qsBrands } from '@/queries/brand'
import useFilterStore from '@/store/filterStore'
import { Brand } from '@/types/brand'
import { Payload } from '@/types/payload'
import { fetcher } from '@/utils/fetcher'
import {
  Card,
  Carousel,
  Col,
  ConfigProvider,
  Row,
  Skeleton,
  ThemeConfig,
  Typography,
} from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

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

export default function FeaturedBrands() {
  const router = useRouter()
  const { setBrands } = useFilterStore()

  const { data: brands, error: errorBrands } = useSWR<Payload<Brand[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/brands?${qsBrands}`,
    fetcher,
  )

  if (!brands) {
    return <Skeleton />
  }

  return (
    <ConfigProvider theme={theme}>
      <Row>
        <Col span={24}>
          <Carousel
            style={{ marginTop: '1rem' }}
            slidesToShow={6}
            draggable={true}
            infinite={true}
            dots={false}
            autoplay={true}
            responsive={responsive}
          >
            {brands?.data?.map((brand: Brand) => {
              return (
                <div key={brand.attributes.slug} style={{ height: '200px' }}>
                  <Card
                    hoverable
                    style={{
                      position: 'relative',
                      height: '165px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                    }}
                    onClick={() => {
                      setBrands([brand.attributes.slug])
                      router.push('/shop')
                    }}
                  >
                    {brand.attributes.thumbnail?.data ? (
                      <div>
                        <Image
                          alt={
                            brand.attributes.thumbnail?.data.attributes
                              .alternativeText ?? ''
                          }
                          src={
                            'http://localhost:1337' +
                            brand.attributes.thumbnail?.data.attributes.url
                          }
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: '100%', height: 'auto' }}
                        ></Image>
                      </div>
                    ) : (
                      <Text>{brand.attributes.name}</Text>
                    )}
                  </Card>
                </div>
              )
            })}
          </Carousel>
        </Col>
      </Row>
    </ConfigProvider>
  )
}
