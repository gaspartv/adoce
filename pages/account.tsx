import DeleteUserModal from '@/components/modal/deleteUser.component'
import EditUserModal from '@/components/modal/editUser.component'
import { UserContext } from '@/contexts/user.context'
import { StyledAccount, StyledExcluir } from '@/styles/account.styles'
import React from 'react'

const AccountPage = () => {
  const userContext = React.useContext(UserContext)

  return (
    <>
      {userContext.modalUserEdit && <EditUserModal />}
      {userContext.modalUserDelete && <DeleteUserModal />}
      <StyledAccount>
        <section>
          <h2 style={{ width: '110px' }}>Minha conta</h2>
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

          <div>
            <StyledExcluir
              onClick={(event) => {
                event.preventDefault()
                userContext.setModalUserDelete(true)
              }}
            >
              Excluir minha conta<span></span>
            </StyledExcluir>
          </div>
        </section>
      </StyledAccount>
    </>
  )
}

export default AccountPage
