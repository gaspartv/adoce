import { LoadingContext } from '@/contexts/loading.context'
import { UserContext } from '@/contexts/user.context'
import { ICreateUser } from '@/interfaces/session.interfaces'
import { StyledFormError } from '@/styles/formError.styles'
import { StyledInput } from '@/styles/input.styles'
import { StyledLabel } from '@/styles/label.styles'
import { StyledSession } from '@/styles/session.styles'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const RegisterPage = () => {
  const loadingContext = React.useContext(LoadingContext)

  const userContext = React.useContext(UserContext)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required('nome é obrigatório.'),
        email: yup
          .string()
          .email('deve ser um e-mail válido')
          .required('e-mail é obrigatório.'),
      })
    ),
  })

  const handle = async ({ name, email }: ICreateUser) => {
    loadingContext.setLoading(true)

    try {
      await toast.promise(
        axios.post('/api/users/create', { name, email }),
        {
          pending: 'Aguardando...',
          success:
            'Cadastro criado com sucesso, você recebera um email com a senha.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 10000,
        }
      )

      router.push('/login')
    } catch ({ response }: any) {
      toast.error(response.data.message, {
        autoClose: 5000,
        className: 'my-toast-error',
      })
    } finally {
      loadingContext.setLoading(false)
    }
  }

  React.useEffect(() => {
    if (userContext.user) router.push('/')
  }, [router, userContext.user])

  return (
    <>
      <StyledSession>
        <form onSubmit={handleSubmit(handle)}>
          <h2>Cadastrar-se</h2>
          <div style={{ marginBottom: '20px' }}>
            <StyledInput
              {...register('name')}
              id="name"
              name="name"
              type="text"
              placeholder=" "
            />
            <StyledLabel htmlFor="name">Nome</StyledLabel>
            <StyledFormError>
              {errors.name && errors.name.message}
            </StyledFormError>
          </div>

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

          <Link href="/login">Já tem um cadastro? Entrar</Link>

          <div>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </StyledSession>
    </>
  )
}

export default RegisterPage
