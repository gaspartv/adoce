import LoadingComponent from '@/components/loading.component'
import { IContextProps } from '@/interfaces/global.interfaces'
import React from 'react'

interface ILoadingContext {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadingContext = React.createContext({} as ILoadingContext)

const LoadingProvider = ({ children }: IContextProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <LoadingComponent />}
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
