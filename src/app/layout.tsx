import RootHeader from '@/components/header/header'
import '@/styles/global.scss'

export const metadata = {
  title: 'e-commerce',
  description: 'e-commerce with Next.js and Strapi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RootHeader></RootHeader>
        {children}
      </body>
    </html>
  )
}
