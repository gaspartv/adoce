import { LoadingContext } from '@/contexts/loading.context';
import { UserContext } from '@/contexts/user.context';
import { ICategory } from '@/interfaces/category.interfaces';
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

const EditCategoryModal = () => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const userContext = React.useContext(UserContext);

  const loadingContext = React.useContext(LoadingContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        image: yup.string().optional(),
      })
    ),
  });

  const handle = async (data: ICategory) => {
    loadingContext.setLoading(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) return userContext.userLogout();

      const res = await toast.promise(
        axios.patch(
          `/api/categories/edit/${userContext.categoryInfo?.id}`,
          data,
          {
            headers: { Authorization: 'Bearer ' + token },
          }
        ),
        {
          pending: 'Aguardando...',
          success: 'Categoria editada com sucesso.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      );

      const filter = userContext.categories.filter(
        (el) => el.id !== userContext.categoryInfo?.id
      );

      userContext.setCategories([res.data, ...filter]);

      userContext.setModalCategoryEdit(false);
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
      userContext.setModalCategoryEdit(false);
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
        userContext.setModalCategoryEdit(false);
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
              userContext.setModalCategoryEdit(false);
            }}
          />
          <TitleH2 style={{ width: '190px' }}>Editar categoria</TitleH2>
          <div>
            <StyledInput
              {...register('name')}
              id="name"
              name="name"
              type="text"
              placeholder=" "
              value={userContext.categoryInfo?.name}
              onChange={(event) => {
                userContext.setCategoryInfo({
                  ...userContext.categoryInfo!,
                  name: event.target.value,
                });
              }}
            />
            <StyledLabel>Nome</StyledLabel>
            <StyledFormError>
              {errors.name && errors.name.message}
            </StyledFormError>
          </div>

          <div>
            <StyledInput
              {...register('image')}
              id="image"
              name="image"
              type="text"
              placeholder=" "
            />
            <StyledLabel>Imagem</StyledLabel>
            <StyledFormError>
              {errors.image && errors.image.message}
            </StyledFormError>
          </div>

          <div>
            <button type="submit">Editar</button>
          </div>
        </form>
      </section>
    </StyledModal>
  );
};

export default EditCategoryModal;
