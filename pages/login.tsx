import RecoveryModal from '@/components/modal/recoveryUser.component'
import { LoadingContext } from '@/contexts/loading.context'
import { UserContext } from '@/contexts/user.context'
import { ILogin } from '@/interfaces/session.interfaces'
import { StyledFormError } from '@/styles/formError.styles'
import { StyledInput } from '@/styles/input.styles'
import { StyledLabel } from '@/styles/label.styles'
import { StyledRecovery, StyledSession } from '@/styles/session.styles'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const LoginPage = () => {
  const loadingContext = React.useContext(LoadingContext)

  const userContext = React.useContext(UserContext)

  const [visiblePassword, setVisiblePassword] = React.useState<boolean>(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email('deve ser um e-mail válido')
          .required('e-mail é obrigatório.'),
        password: yup.string().required('senha é obrigatório.'),
      })
    ),
  })

  const handle = async ({ email, password }: ILogin) => {
    loadingContext.setLoading(true)

    try {
      const { data } = await toast.promise(
        axios.post('/api/login', { email, password }),
        {
          pending: 'Aguardando...',
          success: 'Login efetuado com sucesso.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      )

      userContext.setUser(data.user)

      localStorage.setItem('token', data.token)

      router.back()
    } catch (e: any) {
      toast.error(e.response.data.message, {
        autoClose: 5000,
        className: 'my-toast-error',
      })
    } finally {
      loadingContext.setLoading(false)
    }
  }

  const changeVisiblePassword = (): void => {
    visiblePassword ? setVisiblePassword(false) : setVisiblePassword(true)
  }

  React.useEffect(() => {
    if (userContext.user) router.push('/')
  }, [router, userContext.user])

  return (
    <>
      {userContext.modalUserRecovery && <RecoveryModal />}
      <StyledSession>
        <form onSubmit={handleSubmit(handle)}>
          <h2 style={{ width: '65px' }}>Entrar</h2>
          <div style={{ marginBottom: '20px' }}>
            <StyledInput
              {...register('email')}
              id="email"
              name="email"
              type="text"
              placeholder=" "
            />
            <StyledLabel htmlFor="email">E-mail</StyledLabel>
            <StyledFormError>
              {errors.email && errors.email.message}
            </StyledFormError>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <StyledInput
              {...register('password')}
              id="password"
              name="password"
              type={visiblePassword ? 'text' : 'password'}
              placeholder=" "
            />
            <StyledLabel htmlFor="password">Senha</StyledLabel>
            <StyledFormError>
              {errors.password && errors.password.message}
            </StyledFormError>
            <span onClick={() => changeVisiblePassword()}>
              <Image
                src={
                  visiblePassword
                    ? '/image/invisible.png'
                    : '/image/visible.png'
                }
                alt="Visible password"
                width={20}
                height={20}
              />
            </span>
          </div>

          <StyledRecovery
            onClick={() => {
              userContext.setModalUserRecovery(true)
            }}
          >
            Esqueceu sua senha?
          </StyledRecovery>

          <Link href="/register">Não tem um cadastro? Cadastrar-se</Link>

          <div>
            <button type="submit">Entrar</button>
          </div>
        </form>
      </StyledSession>
    </>
  )
}

export default LoginPage
