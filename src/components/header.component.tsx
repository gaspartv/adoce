import { UserContext } from '@/contexts/user.context'
import { StyledHeader } from '@/styles/header.styles'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import RequestPageIcon from '@mui/icons-material/RequestPage'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { useRouter } from 'next/router'
import React from 'react'

const HeaderComponent = () => {
  const userContext = React.useContext(UserContext)

  const router = useRouter()

  return (
    <StyledHeader>
      <div>
        <h2 onClick={() => router.push('/')}>Adoce</h2>
        {router.pathname === '/' && (
          <form action="">
            <input
              type="text"
              value={userContext.homeSearch}
              placeholder="Procurar produto..."
              onChange={(e) => userContext.setHomeSearch(e.target.value)}
            />
          </form>
        )}

        <nav>
          {router.pathname !== '/' && (
            <span onClick={() => router.push('/')}>
              <HomeIcon fontSize="large" color="error" />
              <p>Início</p>
            </span>
          )}
          <span
            onClick={() => {
              if (userContext.user) {
                router.push('/account')
              } else {
                router.push('/login')
              }
            }}
          >
            <AccountCircleIcon fontSize="large" color="error" />
            <p>Conta</p>
          </span>
          <span
            onClick={() => {
              if (userContext.user) {
                router.push('/order')
              } else {
                router.push('/login')
              }
            }}
          >
            <RequestPageIcon fontSize="large" color="error" />
            <p>Pedidos</p>
          </span>
          <span
            onClick={() => {
              router.push('/cart')
            }}
          >
            <ShoppingCartCheckoutIcon fontSize="large" color="error" />
            <p>Carrinho</p>
            {userContext.cart.length > 0 && (
              <span>{userContext.cart.length}</span>
            )}
          </span>
        </nav>
      </div>
    </StyledHeader>
  )
}

export default HeaderComponent
