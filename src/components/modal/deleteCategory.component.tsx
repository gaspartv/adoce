import { LoadingContext } from '@/contexts/loading.context';
import { UserContext } from '@/contexts/user.context';
import { StyledModal } from '@/styles/modalstyles';
import { TitleH2 } from '@/styles/typography';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const DeleteCategoryModal = () => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const userContext = React.useContext(UserContext);

  const loadingContext = React.useContext(LoadingContext);

  const handle = async (id: string) => {
    loadingContext.setLoading(true);

    if (id === undefined) return toast.error('Categoria não encontrado.');

    try {
      const token = localStorage.getItem('token');

      if (!token) return userContext.userLogout();

      await toast.promise(
        axios.delete(`/api/categories/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        {
          pending: 'Aguardando...',
          success: 'Categoria deletada com sucesso.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      );

      const filter = userContext.categories.filter((el) => el.id !== id);

      userContext.setCategories(filter);

      userContext.setModalCategoryDelete(false);
    } catch ({ response }: any) {
      toast.error(response.data.message, {
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
      userContext.setModalCategoryDelete(false);
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
        userContext.setModalCategoryDelete(false);
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
              userContext.setModalCategoryDelete(false);
            }}
          />
          <TitleH2 style={{ width: '190px' }}>Deletar categoria</TitleH2>
          <div>
            <p style={{ fontSize: '12px', letterSpacing: '1px' }}>
              Tem certeza que deseja deletar{' '}
              <strong>{userContext.categoryInfo?.name}</strong> ?
            </p>
            <br />
            <p style={{ fontSize: '12px', letterSpacing: '1px' }}>
              Se você deletar está ação não pode ser desfeita.
            </p>
            <br />
          </div>

          <div>
            <button
              onClick={(event) => {
                event.preventDefault();
                handle(`${userContext.categoryInfo?.id}`);
              }}
              type="submit"
            >
              Deletar
            </button>
          </div>
        </form>
      </section>
    </StyledModal>
  );
};

export default DeleteCategoryModal;
