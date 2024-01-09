import useCartStore from '@/store/cartStore'
import { Button } from 'antd'

export default function Checkout() {
  const { setStep } = useCartStore()

  return (
    <>
      <Button
        onClick={() => {
          setStep(2)
        }}
      >
        IR
      </Button>
    </>
  )
}
