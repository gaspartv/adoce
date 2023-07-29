import { LoadingContext } from '@/contexts/loading.context';
import { UserContext } from '@/contexts/user.context';
import { IRequestEdit } from '@/interfaces/requests.interfaces';
import { StyledInput } from '@/styles/input.styles';
import { StyledModal } from '@/styles/modalstyles';
import { StyledSelect } from '@/styles/select.styles';
import { TitleH2 } from '@/styles/typography';
import { yupResolver } from '@hookform/resolvers/yup';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const RequestEditModal = () => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const userContext = React.useContext(UserContext);

  const loadingContext = React.useContext(LoadingContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        status: yup.string().required(),
        description: yup.string().optional(),
      })
    ),
  });

  const handle = async (data: IRequestEdit) => {
    loadingContext.setLoading(true);

    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] === '') {
        delete data[key];
      }
    }

    try {
      const token = localStorage.getItem('token');

      if (!token) userContext.userLogout();

      const res = await toast.promise(
        axios.patch(`/api/requests/edit/${userContext.requestInfo?.id}`, data, {
          headers: { Authorization: 'Bearer ' + token },
        }),
        {
          pending: 'Aguardando...',
          success: 'Pedido editado com sucesso.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      );

      const filterEdit = userContext.requests?.filter(
        (el) => el.id !== res.data.id
      );

      userContext.setRequests([res.data, ...filterEdit!]);

      userContext.setModalRequestEdit(false);
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
      userContext.setModalRequestEdit(false);
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
        userContext.setModalRequestEdit(false);
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
        <form onSubmit={handleSubmit(handle)}>
          <CancelIcon
            fontSize="large"
            color="disabled"
            onClick={(event) => {
              event.preventDefault();
              userContext.setModalRequestEdit(false);
            }}
          />
          <TitleH2 style={{ width: '100%', border: 'none' }}>
            Pedido{' '}
            <span style={{ color: 'black' }}>
              {userContext.requestInfo?.number}
            </span>
          </TitleH2>

          <div>
            <StyledSelect {...register('status')}>
              <option value={userContext.requestInfo?.status}>
                {userContext.requestInfo?.status}
              </option>
              <option value="Aguardando pagamento">Aguardando pagamento</option>
              <option value="Pagamento confirmado">Pagamento confirmado</option>
              <option value="Cancelado">Cancelado</option>
              <option value="Devolvido">Devolvido</option>
              <option value="Finalizado">Finalizado</option>
            </StyledSelect>

            <br />

            <StyledInput
              type="text"
              {...register('description')}
              placeholder="Deixar recado para o cliente."
            />

            <br />

            <p>
              <strong>Nome: </strong>
              {userContext.requestInfo?.client.name}
            </p>

            <p>
              <strong>Total: </strong>
              {Number(
                userContext.requestInfo?.itens?.reduce((a, b) => {
                  return a + Number(b.price);
                }, 0)
              ).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <p>
              <strong>Data: </strong>
              {userContext.requestInfo?.createdAt
                .toString()
                .split('T')[0]
                .split('-')
                .reverse()
                .join('/')}{' '}
              às{' '}
              {
                userContext.requestInfo?.createdAt
                  .toString()
                  .split('T')[1]
                  .split('.')[0]
              }
            </p>
            <p>
              <strong>Descrição: </strong>
              {userContext.requestInfo?.description}
            </p>
          </div>

          <ul>
            {userContext.requestInfo?.itens?.map((el) => (
              <li key={el.id}>
                <Image src={el.image} alt={el.name} width={45} height={45} />
                <p>
                  {el.count} {el.name} por{' '}
                  {Number(el.price).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}{' '}
                  para <strong>{el.character}</strong>
                </p>
              </li>
            ))}
          </ul>

          <div>
            <button type="submit">Editar</button>
          </div>
        </form>
      </section>
    </StyledModal>
  );
};

export default RequestEditModal;
