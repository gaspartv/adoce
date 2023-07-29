import CreateCategoryModal from '@/components/modal/createCategory.component'
import CreateProductModal from '@/components/modal/createProduct.component'
import DeleteCategoryModal from '@/components/modal/deleteCategory.component'
import DeleteProductModal from '@/components/modal/deleteProduct.component'
import DeleteUserModal from '@/components/modal/deleteUser.component'
import EditCategoryModal from '@/components/modal/editCategory.component'
import EditProductModal from '@/components/modal/editProduct.component'
import EditUserModal from '@/components/modal/editUser.component'
import RequestEditModal from '@/components/modal/requestEditModal.component'
import { LoadingContext } from '@/contexts/loading.context'
import { UserContext } from '@/contexts/user.context'
import { IProducts } from '@/interfaces/products.interfaces'
import { IRequests } from '@/interfaces/requests.interfaces'
import { StyledAdmin } from '@/styles/admin.styles'
import { StyledSelect } from '@/styles/select.styles'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AdminPage = () => {
  const userContext = React.useContext(UserContext)

  const loadingContext = React.useContext(LoadingContext)

  const router = useRouter()

  const [filterCategories, setFilterCategories] = useState('all')

  const [filter, setFilter] = useState<IProducts[]>()

  const [filterRequestsOptions, setFilterRequestsOptions] = useState('all')

  const [filterRequests, setFilterRequests] = useState<IRequests[]>()

  React.useEffect(() => {
    if (filterRequestsOptions === 'all') {
      return setFilterRequests(userContext.requests!)
    }

    const filter = userContext.requests?.filter(
      (el) => el.status === filterRequestsOptions
    )

    setFilterRequests(filter)
  }, [filterRequestsOptions, userContext.requests])

  React.useEffect(() => {
    if (filterCategories === 'all') {
      return setFilter(userContext.products)
    }

    const filterProducts = userContext.products.filter(
      (el) => el.categoryId === filterCategories
    )

    setFilter(filterProducts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategories, userContext.products])

  React.useEffect(() => {
    if (userContext.user && !userContext.user?.isAdmin) {
      toast.error('Você não tem permissão.')

      router.push('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.user])

  React.useEffect(() => {
    if (userContext.user) {
      loadingContext.setLoading(true)

      const getRequests = async () => {
        try {
          const token = localStorage.getItem('token')

          if (!token) userContext.userLogout()

          const { data } = await axios.get('/api/requests/list', {
            headers: { Authorization: 'Bearer ' + token },
          })

          console.log(data)

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
    <>
      {userContext.modalUserEdit && <EditUserModal />}
      {userContext.modalUserDelete && <DeleteUserModal />}

      {userContext.modalProductCreate && <CreateProductModal />}
      {userContext.modalProductEdit && <EditProductModal />}
      {userContext.modalProductDelete && <DeleteProductModal />}

      {userContext.modalCategoryCreate && <CreateCategoryModal />}
      {userContext.modalCategoryEdit && <EditCategoryModal />}
      {userContext.modalCategoryDelete && <DeleteCategoryModal />}

      {userContext.modalRequestEdit && <RequestEditModal />}
      <StyledAdmin>
        <section>
          <h2 style={{ width: '100%' }}>Minha conta</h2>
          <div>
            <p>
              <strong>Nome: </strong>
              {userContext.user?.name}
            </p>
            <p>
              <strong>E-mail: </strong>
              {userContext.user?.email}
            </p>
            <p>
              <strong>Cadastro: </strong>
              {userContext.user?.registered_at
                .toString()
                .split('T')[0]
                .split('-')
                .reverse()
                .join('/')}
            </p>
          </div>

          <button
            onClick={(event) => {
              event.preventDefault()
              userContext.setModalUserEdit(true)
            }}
          >
            Editar
          </button>
        </section>

        <section>
          <h2 style={{ width: '100%' }}>Categorias</h2>

          <button
            onClick={(event) => {
              event.preventDefault()
              userContext.setModalCategoryCreate(true)
            }}
          >
            Adicionar
          </button>

          <ul>
            {userContext.categories.map((el) => (
              <li key={el.id}>
                <h2>{el.name}</h2>

                <Image src={el.image} alt={el.name} width={180} height={180} />

                <div>
                  <button
                    onClick={(event) => {
                      event.preventDefault()
                      userContext.setCategoryInfo(el)
                      userContext.setModalCategoryEdit(true)
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={(event) => {
                      event.preventDefault()
                      userContext.setCategoryInfo(el)
                      userContext.setModalCategoryDelete(true)
                    }}
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 style={{ width: '100%' }}>Produtos</h2>

          <button
            onClick={(event) => {
              event.preventDefault()
              userContext.setModalProductCreate(true)
            }}
          >
            Adicionar
          </button>

          <div>
            <StyledSelect onChange={(e) => setFilterCategories(e.target.value)}>
              <option value="all">Todas categorias</option>
              {userContext.categories.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </StyledSelect>
          </div>

          <ul>
            {filter?.map((el) => (
              <li key={el.id}>
                <h2>{el.name}</h2>
                <p>
                  <strong>Preço: </strong>
                  {Number(el.price).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
                <p>
                  <strong>Estoque: </strong>
                  {el.stock}
                </p>
                <Image src={el.image} alt={el.name} width={180} height={180} />
                <p
                  style={{
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <strong>Descrição: </strong>
                  {el.description}
                </p>
                <div>
                  <button
                    onClick={(event) => {
                      event.preventDefault()
                      userContext.setProductInfo(el)
                      userContext.setModalProductEdit(true)
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={(event) => {
                      event.preventDefault()
                      userContext.setProductInfo(el)
                      userContext.setModalProductDelete(true)
                    }}
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 style={{ width: '100%' }}>Pedidos</h2>

          <div>
            <StyledSelect
              onChange={(e) => setFilterRequestsOptions(e.target.value)}
            >
              <option value="all">Todos pedidos</option>
              <option value="Aguardando pagamento">Aguardando pagamento</option>
              <option value="Pagamento confirmado">Pagamento confirmado</option>
              <option value="Cancelado">Cancelado</option>
              <option value="Devolvido">Devolvido</option>
              <option value="Finalizado">Finalizado</option>
            </StyledSelect>
          </div>

          <span>
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
              {filterRequests?.map((el) => (
                <li
                  key={el.id}
                  onClick={() => {
                    userContext.setRequestInfo(el)
                    userContext.setModalRequestEdit(true)
                  }}
                >
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
          </span>
        </section>
      </StyledAdmin>
    </>
  )
}

export default AdminPage
