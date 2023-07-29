import { StyledLoading } from '@/styles/loading.styles'
import Image from 'next/image'

const LoadingComponent = () => {
  return (
    <StyledLoading>
      <Image src="/image/load.gif" alt="Loading" width={100} height={100} />
    </StyledLoading>
  )
}

export default LoadingComponent
