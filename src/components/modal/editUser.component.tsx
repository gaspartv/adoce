import { LoadingContext } from '@/contexts/loading.context';
import { UserContext } from '@/contexts/user.context';
import { IUserEdit } from '@/interfaces/users.interfaces';
import { StyledFormError } from '@/styles/formError.styles';
import { StyledInput } from '@/styles/input.styles';
import { StyledLabel } from '@/styles/label.styles';
import { StyledModal } from '@/styles/modalstyles';
import { TitleH2 } from '@/styles/typography';
import { yupResolver } from '@hookform/resolvers/yup';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const EditUserModal = () => {
  const loadingContext = React.useContext(LoadingContext);

  const userContext = React.useContext(UserContext);

  const modalRef = React.useRef<HTMLDivElement>(null);

  const [visiblePassword, setVisiblePassword] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserEdit>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().optional(),
        email: yup.string().email('deve ser um e-mail válido').optional(),
        password: yup.string().optional(),
      })
    ),
  });

  const changeVisiblePassword = (): void => {
    visiblePassword ? setVisiblePassword(false) : setVisiblePassword(true);
  };

  const handle = async (data: IUserEdit): Promise<void> => {
    loadingContext.setLoading(true);
    
    const token: string | null = localStorage.getItem('token');

    if (!token) return userContext.userLogout();

    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] === '') {
        delete data[key];
      }
    }

    if (JSON.stringify(data) === '{}') {
      toast.error('Para editar você precisa preencher algum campo.', {
        autoClose: 5000,
        className: 'my-toast-error',
      });

      return;
    }

    try {
      const res = await toast.promise(
        axios.patch(`/api/users/edit/${userContext.user?.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        {
          pending: 'Aguardando...',
          success: 'Usuário editado com sucesso.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      );

      userContext.setUser(res.data);

      userContext.setModalUserEdit(false);
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
      userContext.setModalUserEdit(false);
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
        userContext.setModalUserEdit(false);
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
              userContext.setModalUserEdit(false);
            }}
          />
          <TitleH2>Editar</TitleH2>
          <div>
            <StyledInput
              {...register('name')}
              id="name"
              name="name"
              type="text"
              placeholder=" "
            />
            <StyledLabel>Nome</StyledLabel>
            <StyledFormError>
              {errors.name && errors.name.message}
            </StyledFormError>
          </div>

          <div>
            <StyledInput
              {...register('email')}
              id="email"
              name="email"
              type="text"
              placeholder=" "
            />
            <StyledLabel>E-mail</StyledLabel>
            <StyledFormError>
              {errors.email && errors.email.message}
            </StyledFormError>
          </div>

          <div>
            <StyledInput
              {...register('password')}
              id="password"
              name="password"
              type={visiblePassword ? 'text' : 'password'}
              placeholder=" "
            />
            <StyledLabel>Senha</StyledLabel>
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

          <div>
            <button type="submit">Editar</button>
          </div>
        </form>
      </section>
    </StyledModal>
  );
};

export default EditUserModal;
