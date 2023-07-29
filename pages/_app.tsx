import FooterComponent from '@/components/footer.component'
import HeaderComponent from '@/components/header.component'
import LoadingComponent from '@/components/loading.component'
import LoadingProvider, { LoadingContext } from '@/contexts/loading.context'
import UserProvider from '@/contexts/user.context'
import StyledGlobal from '@/styles/global.styles'
import type { AppProps } from 'next/app'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  const loadingContext = React.useContext(LoadingContext)

  return (
    <LoadingProvider>
      <UserProvider>
        <ToastContainer
          className="my-toast"
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <StyledGlobal />
        {loadingContext.loading && <LoadingComponent />}
        <HeaderComponent />
        <Component {...pageProps} />
        <FooterComponent />
      </UserProvider>
    </LoadingProvider>
  )
}
