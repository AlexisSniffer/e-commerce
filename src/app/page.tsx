'use client'

import Container from '@/components/utils/container'

const data = [
  {
    name: 'Accesories',
    subcategories: [
      { name: 'Cables & Adaperts' },
      { name: 'Electronic Cigarettes' },
      { name: 'Batteries' },
      { name: 'Chargers' },
      { name: 'Home Electronic' },
      { name: 'Bags & Cases' },
    ],
  },
  {
    name: 'Audio & Video',
    subcategories: [
      { name: 'Televisions' },
      { name: 'Projectors' },
      { name: 'TV Peceivers' },
      { name: 'Audio Amplifier' },
      { name: 'TV Sticks' },
    ],
  },
  {
    name: 'Camera & Photos',
    subcategories: [
      { name: 'Digital Cameras' },
      { name: 'Camcorders' },
      { name: 'Camera Drones' },
      { name: 'Action Cameras' },
      { name: 'Photo Supplies' },
      { name: 'Camera & Photo' },
    ],
  },
  {
    name: 'Laptops',
    subcategories: [
      { name: 'Caming Laptops' },
      { name: 'Ultraslim Laptops' },
      { name: 'Laptop Accessories' },
      { name: 'Laptop Bags & Cases' },
      { name: 'Tablet Accessories' },
    ],
  },
]

export default function Home() {
  return (
    <main>
      <Container>
        <h1>Página de inicio</h1>

        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
          38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        ].map((e: any) => {
          return (
            <div key={e}>
              <br />
              <br />
              <br />
              <br />
            </div>
          )
        })}
      </Container>
    </main>
  )
}
