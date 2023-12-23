import { Media } from '@/types/media'
import { Product } from '@/types/product'
import { Carousel, Col, ConfigProvider, Row, ThemeConfig } from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import { useRef } from 'react'

const theme: ThemeConfig = {
  components: {},
}

export default function ProductCarousel({ id, attributes }: Product) {
  const carouselRef = useRef<CarouselRef>(null)

  const goTo = (slide: any) => {
    carouselRef.current?.goTo(slide, false)
  }
  return (
    <ConfigProvider theme={theme}>
      <Carousel ref={carouselRef} autoplay draggable pauseOnHover dots>
        {attributes.images.data.map((image: Media) => {
          return (
            <img
              key={image.attributes.url}
              src={'http://localhost:1337' + image.attributes.url}
              alt={image.attributes.alternativeText}
              width={'100%'}
              height={'auto'}
            />
          )
        })}
      </Carousel>
      <Row gutter={[8, 8]}>
        {attributes.images.data.map((image: Media, index: number) => {
          return (
            <Col span={6} key={image.attributes.url}>
              <img
                onClick={() => goTo(index)}
                src={'http://localhost:1337' + image.attributes.url}
                alt={image.attributes.alternativeText}
                width={'100%'}
                height={'auto'}
              />
            </Col>
          )
        })}
      </Row>
    </ConfigProvider>
  )
}
