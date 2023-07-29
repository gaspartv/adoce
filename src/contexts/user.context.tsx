import { ICategory } from '@/interfaces/category.interfaces'
import { IContextProps } from '@/interfaces/global.interfaces'
import { IProductCart, IProducts } from '@/interfaces/products.interfaces'
import { IRequests } from '@/interfaces/requests.interfaces'
import { IUserRes } from '@/interfaces/users.interfaces'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { LoadingContext } from './loading.context'

interface IUserContext {
  userLogout: () => void

  user: IUserRes | null
  setUser: React.Dispatch<React.SetStateAction<IUserRes | null>>

  categories: ICategory[]
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>

  categoryInfo: ICategory | null
  setCategoryInfo: React.Dispatch<React.SetStateAction<ICategory | null>>

  products: IProducts[]
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>

  productInfo: IProducts | null
  setProductInfo: React.Dispatch<React.SetStateAction<IProducts | null>>

  requests: IRequests[] | null
  setRequests: React.Dispatch<React.SetStateAction<IRequests[] | null>>

  requestInfo: IRequests | null
  setRequestInfo: React.Dispatch<React.SetStateAction<IRequests | null>>

  cart: IProductCart[]
  setCart: React.Dispatch<React.SetStateAction<IProductCart[]>>

  homeSearch: string
  setHomeSearch: React.Dispatch<React.SetStateAction<string>>

  modalUserEdit: boolean
  setModalUserEdit: React.Dispatch<React.SetStateAction<boolean>>

  modalUserDelete: boolean
  setModalUserDelete: React.Dispatch<React.SetStateAction<boolean>>

  modalUserRecovery: boolean
  setModalUserRecovery: React.Dispatch<React.SetStateAction<boolean>>

  modalProductCreate: boolean
  setModalProductCreate: React.Dispatch<React.SetStateAction<boolean>>

  modalProductEdit: boolean
  setModalProductEdit: React.Dispatch<React.SetStateAction<boolean>>

  modalProductDelete: boolean
  setModalProductDelete: React.Dispatch<React.SetStateAction<boolean>>

  modalCategoryCreate: boolean
  setModalCategoryCreate: React.Dispatch<React.SetStateAction<boolean>>

  modalCategoryEdit: boolean
  setModalCategoryEdit: React.Dispatch<React.SetStateAction<boolean>>

  modalCategoryDelete: boolean
  setModalCategoryDelete: React.Dispatch<React.SetStateAction<boolean>>

  modalRequest: boolean
  setModalRequest: React.Dispatch<React.SetStateAction<boolean>>

  modalRequestEdit: boolean
  setModalRequestEdit: React.Dispatch<React.SetStateAction<boolean>>

  modalContinue: boolean
  setModalContinue: React.Dispatch<React.SetStateAction<boolean>>

  filterCategories: string
  setFilterCategories: React.Dispatch<React.SetStateAction<string>>

  randomCode: string
  setRandomCode: React.Dispatch<React.SetStateAction<string>>
}

export const UserContext = React.createContext({} as IUserContext)

const UserProvider = ({ children }: IContextProps): JSX.Element => {
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const loadingContext = React.useContext(LoadingContext)

  const [user, setUser] = React.useState<IUserRes | null>(null)

  const [categories, setCategories] = React.useState([] as ICategory[])

  const [categoryInfo, setCategoryInfo] = React.useState<ICategory | null>(null)

  const [products, setProducts] = React.useState([] as IProducts[])

  const [productInfo, setProductInfo] = React.useState<IProducts | null>(null)

  const [requests, setRequests] = React.useState<IRequests[] | null>(null)

  const [requestInfo, setRequestInfo] = React.useState<IRequests | null>(null)

  const [cart, setCart] = React.useState<IProductCart[]>([])

  const [homeSearch, setHomeSearch] = React.useState('')

  const [modalUserEdit, setModalUserEdit] = React.useState<boolean>(false)

  const [modalUserDelete, setModalUserDelete] = React.useState<boolean>(false)

  const [modalUserRecovery, setModalUserRecovery] =
    React.useState<boolean>(false)

  const [modalProductCreate, setModalProductCreate] =
    React.useState<boolean>(false)

  const [modalProductEdit, setModalProductEdit] = React.useState<boolean>(false)

  const [modalProductDelete, setModalProductDelete] =
    React.useState<boolean>(false)

  const [modalCategoryCreate, setModalCategoryCreate] =
    React.useState<boolean>(false)

  const [modalCategoryEdit, setModalCategoryEdit] =
    React.useState<boolean>(false)

  const [modalCategoryDelete, setModalCategoryDelete] =
    React.useState<boolean>(false)

  const [modalRequest, setModalRequest] = React.useState<boolean>(false)

  const [modalRequestEdit, setModalRequestEdit] = React.useState<boolean>(false)

  const [modalContinue, setModalContinue] = React.useState<boolean>(false)

  const [filterCategories, setFilterCategories] = React.useState<string>('all')

  const [randomCode, setRandomCode] = React.useState(
    monthNames[new Date().getMonth()].toLowerCase() +
      '-' +
      Math.random().toString(36).slice(-5)
  )

  const router = useRouter()

  const userLogout = (): void => {
    loadingContext.setLoading(false)

    setUser(null)

    localStorage.removeItem('token')

    // router.push('/');
  }

  React.useEffect(() => {
    loadingContext.setLoading(true)

    const autoLogin = async (): Promise<void> => {
      try {
        const token: string | null = localStorage.getItem('token')

        if (!token) return userLogout()

        const { data } = await axios.get(`/api/users/relogin`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setUser(data)
      } catch (e: any) {
        userLogout()
      } finally {
        loadingContext.setLoading(false)
      }
    }

    autoLogin()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const list = async () => {
      const [res1, res2] = await Promise.all([
        await axios.get('/api/products/list', {
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        }),
        await axios.get('/api/categories/list', {
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        }),
      ])

      setProducts(res1.data)
      setCategories(res2.data)
    }

    list()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UserContext.Provider
      value={{
        userLogout,
        user,
        setUser,
        categories,
        setCategories,
        categoryInfo,
        setCategoryInfo,
        products,
        setProducts,
        productInfo,
        setProductInfo,
        requests,
        setRequests,
        requestInfo,
        setRequestInfo,
        cart,
        setCart,
        homeSearch,
        setHomeSearch,
        modalUserEdit,
        setModalUserEdit,
        modalUserDelete,
        setModalUserDelete,
        modalUserRecovery,
        setModalUserRecovery,
        modalProductCreate,
        setModalProductCreate,
        modalProductEdit,
        setModalProductEdit,
        modalProductDelete,
        setModalProductDelete,
        modalCategoryCreate,
        setModalCategoryCreate,
        modalCategoryEdit,
        setModalCategoryEdit,
        modalCategoryDelete,
        setModalCategoryDelete,
        modalRequest,
        setModalRequest,
        modalRequestEdit,
        setModalRequestEdit,
        modalContinue,
        setModalContinue,
        filterCategories,
        setFilterCategories,
        randomCode,
        setRandomCode,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
