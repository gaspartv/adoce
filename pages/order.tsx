import RequestModal from '@/components/modal/requestModal.component'
import { LoadingContext } from '@/contexts/loading.context'
import { UserContext } from '@/contexts/user.context'
import { IRequests } from '@/interfaces/requests.interfaces'
import { StyledOrder } from '@/styles/pageOrder.styles'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'

const OrderPage = () => {
  const userContext = React.useContext(UserContext)

  const loadingContext = React.useContext(LoadingContext)

  const handleModal = async (data: IRequests) => {
    userContext.setRequestInfo(data)
    userContext.setModalRequest(true)
  }

  React.useEffect(() => {
    if (userContext.user && !userContext.requests) {
      loadingContext.setLoading(true)

      const getRequests = async () => {
        try {
          const token = localStorage.getItem('token')

          if (!token) userContext.userLogout()

          const { data } = await axios.get('/api/requests/list', {
            headers: { Authorization: 'Bearer ' + token },
          })

          userContext.setRequests(data)
        } catch (e: any) {
          toast.error(e.response.data.message, {
            autoClose: 5000,
            className: 'my-toast-error',
          })
        } finally {
          loadingContext.setLoading(false)
        }
      }

      getRequests()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.user])

  return (
    <StyledOrder>
      {userContext.modalRequest && <RequestModal />}
      <section>
        <h2>Meus pedidos</h2>

        <ul>
          <li
            style={{
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-8)',
            }}
          >
            <p
              style={{
                width: '120px',
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              Pedido
            </p>
            <p
              style={{
                width: '170px',
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              Data
            </p>
            <p
              style={{
                width: '150px',
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              Status
            </p>

            <p
              style={{
                width: '80px',
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              Items
            </p>
            <p
              style={{
                width: '150px',
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              Total
            </p>
          </li>
          {userContext.requests?.map((el) => (
            <li key={el.id} onClick={() => handleModal(el)}>
              <p
                style={{
                  width: '160px',
                }}
              >
                {el.number}
              </p>
              <p
                style={{
                  width: '170px',
                  textAlign: 'center',
                }}
              >
                {el.createdAt
                  .toString()
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join('/')}
              </p>
              <p
                style={{
                  width: '200px',
                }}
              >
                {el.status}
              </p>

              <p
                style={{
                  width: '80px',
                }}
              >
                {el.itens?.length}
              </p>
              <p
                style={{
                  width: '150px',
                  textAlign: 'end',
                }}
              >
                {Number(el.total).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </StyledOrder>
  )
}

export default OrderPage
