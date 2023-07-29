import { LoadingContext } from '@/contexts/loading.context';
import { UserContext } from '@/contexts/user.context';
import { IProductReq } from '@/interfaces/products.interfaces';
import { StyledModal } from '@/styles/modalstyles';
import { TitleH2 } from '@/styles/typography';
import { yupResolver } from '@hookform/resolvers/yup';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const DeleteProductModal = () => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const userContext = React.useContext(UserContext);

  const loadingContext = React.useContext(LoadingContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductReq>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().optional(),
        price: yup.number().optional(),
        description: yup.string().optional(),
        stock: yup.number().optional(),
        image: yup.string().optional(),
      })
    ),
  });

  const handle = async (id: string) => {
    loadingContext.setLoading(true);

    if (id === undefined) return toast.error('Produto não encontrado.');

    try {
      const token = localStorage.getItem('token');

      if (!token) return userContext.userLogout();

      await toast.promise(
        axios.delete(`/api/products/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        {
          pending: 'Aguardando...',
          success: 'Produto deletado com sucesso.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      );

      const filter = userContext.products.filter((el) => el.id !== id);

      userContext.setProducts(filter);

      userContext.setModalProductDelete(false);
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
      userContext.setModalProductDelete(false);
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
        userContext.setModalProductDelete(false);
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
              userContext.setModalProductDelete(false);
            }}
          />
          <TitleH2 style={{ width: '170px' }}>Deletar produto</TitleH2>
          <div>
            <p style={{ fontSize: '12px', letterSpacing: '1px' }}>
              Tem certeza que deseja deletar{' '}
              <strong>{userContext.productInfo?.name}</strong> ?
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
                handle(`${userContext.productInfo?.id}`);
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

export default DeleteProductModal;
