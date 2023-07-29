import { LoadingContext } from '@/contexts/loading.context';
import { UserContext } from '@/contexts/user.context';
import { IUserRecovery } from '@/interfaces/users.interfaces';
import { StyledFormError } from '@/styles/formError.styles';
import { StyledInput } from '@/styles/input.styles';
import { StyledLabel } from '@/styles/label.styles';
import { StyledModal } from '@/styles/modalstyles';
import { TitleH2 } from '@/styles/typography';
import { yupResolver } from '@hookform/resolvers/yup';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const RecoveryModal = () => {
  const loadingContext = React.useContext(LoadingContext);

  const userContext = React.useContext(UserContext);

  const modalRef = React.useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRecovery>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email('deve ser um e-mail válido').required(),
      })
    ),
  });

  const handle = async (data: IUserRecovery) => {
    loadingContext.setLoading(true);

    try {
      await toast.promise(
        axios.patch(`/api/users/recovery`, data),
        {
          pending: 'Aguardando...',
          success: 'Nova senha enviada por email.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      );

      userContext.setModalUserRecovery(false);
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
      userContext.setModalUserRecovery(false);
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
        userContext.setModalUserRecovery(false);
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
              userContext.setModalUserRecovery(false);
            }}
          />
          <TitleH2 style={{ width: '240px' }}>Esqueceu sua senha?</TitleH2>
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
            <button type="submit">Recuperar</button>
          </div>
        </form>
      </section>
    </StyledModal>
  );
};

export default RecoveryModal;
