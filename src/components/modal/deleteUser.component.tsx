import { LoadingContext } from '@/contexts/loading.context';
import { UserContext } from '@/contexts/user.context';
import { StyledModal } from '@/styles/modalstyles';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const DeleteUserModal = () => {
  const loadingContext = React.useContext(LoadingContext);

  const userContext = React.useContext(UserContext);

  const modalRef = React.useRef<HTMLDivElement>(null);

  const handle = async (id: string) => {
    const token: string | null = localStorage.getItem('token');

    if (!token) return userContext.userLogout();

    if (!id) {
      toast.error('Usuário não encontrado.', {
        autoClose: 5000,
        className: 'my-toast-error',
      });

      return;
    }

    try {
      await toast.promise(
        axios.delete(`/api/users/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        {
          pending: 'Aguardando...',
          success: 'Usuário deletado com sucesso.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      );

      userContext.userLogout();

      userContext.setModalUserDelete(false);
    } catch (e: any) {
      toast.error(e.response.data.message, {
        autoClose: 5000,
        className: 'my-toast-error',
      });
    } finally {
      loadingContext.setLoading(false);
    }
  };

  const preventSubmit = (event: any) => {
    if (event.key === 'Enter') event.preventDefault();
    if (event.key === 'Escape') {
      event.preventDefault();
      userContext.setModalUserDelete(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', preventSubmit);
    return () => {
      document.removeEventListener('keydown', preventSubmit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as HTMLElement).contains(event.target as HTMLElement)
      ) {
        userContext.setModalUserDelete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalRef]);

  return (
    <StyledModal>
      <section className="modal" ref={modalRef}>
        <form>
          <CancelIcon
            fontSize="large"
            color="disabled"
            onClick={(event) => {
              event.preventDefault();
              userContext.setModalUserDelete(false);
            }}
          />
          <div>
            <p style={{ fontSize: '14px', textAlign: 'center' }}>
              Está ação não pode ser desfeita.
            </p>
            <p style={{ fontSize: '14px', textAlign: 'center' }}>
              Você tem certeza que deseja deletar sua conta?
            </p>
          </div>

          <div>
            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                handle(`${userContext.user?.id}`);
              }}
            >
              Deletar
            </button>
          </div>
        </form>
      </section>
    </StyledModal>
  );
};

export default DeleteUserModal;
