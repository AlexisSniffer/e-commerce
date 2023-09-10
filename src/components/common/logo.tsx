import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: 'xs' | 'md' | 'lg'
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizeOptions = {
    xs: { width: 100, height: 30 },
    md: { width: 150, height: 50 },
    lg: { width: 200, height: 70 },
  }

  const { width, height } = sizeOptions[size]

  return (
    <Link href="/">
      <Image
        src="https://nodejs.org/static/images/logo.svg"
        alt="logo"
        width={width}
        height={height}
        priority={true}
      />
    </Link>
  )
}
