import { UserContext } from '@/contexts/user.context'
import { IProducts } from '@/interfaces/products.interfaces'
import { StyledCart } from '@/styles/pageCart.styles'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const CartPage = () => {
  const router = useRouter()

  const userContext = React.useContext(UserContext)

  const [filter, setFilter] = React.useState<IProducts[]>()

  const handleDelete = (id: number) => {
    const cartList = userContext.cart.filter((el) => el.id !== id)

    userContext.setCart(cartList)
  }

  const handleFinish = async () => {
    router.push('/payment')
  }

  const handlePatch = async () => {
    toast.error('Você precisa estar logado.')
    router.push('/login')
  }

  React.useEffect(() => {
    const list = userContext.products.filter((el) => el.stock > 0)

    setFilter(list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.products])

  return (
    <StyledCart>
      <section>
        {userContext.cart.length > 0 ? (
          <>
            <h2 style={{ width: '180px' }}>Carrinho de compras</h2>
            <ul>
              {userContext.cart.map((el, i) => (
                <li key={el.name + i}>
                  <Image src={el.image} alt={el.name} width={70} height={70} />

                  <p>
                    <strong>
                      {el.name.toLowerCase() === 'tibia coins' && el.count}{' '}
                      {el.name}
                    </strong>{' '}
                    por{' '}
                    <strong>
                      {Number(el.price).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </strong>{' '}
                    será enviado para{' '}
                    <strong>
                      {el.character ? el.character : userContext.user?.email}
                    </strong>
                  </p>
                  <span onClick={() => handleDelete(el.id)}>
                    <DeleteForeverIcon color="error" fontSize="large" />
                  </span>
                </li>
              ))}
            </ul>

            <div>
              <p>
                <strong>Total: </strong>
                {userContext.cart
                  .reduce((a, b) => {
                    return a + b.price
                  }, 0)
                  .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
              </p>

              <button
                onClick={() => {
                  if (userContext.user) {
                    handleFinish()
                  } else {
                    handlePatch()
                  }
                }}
              >
                Finalizar compra
              </button>
            </div>
          </>
        ) : (
          <>
            <h3>Seu carrinho está vazio, vamos comprar algo?</h3>
            <span>
              <ul>
                {userContext.categories.map((el) => (
                  <li
                    key={el.id}
                    onClick={() => {
                      userContext.setFilterCategories(el.id)
                      router.push('/')
                    }}
                  >
                    <Image
                      src={el.image}
                      alt={el.name}
                      width={180}
                      height={180}
                    />
                  </li>
                ))}
              </ul>
            </span>
          </>
        )}
      </section>
    </StyledCart>
  )
}

export default CartPage
