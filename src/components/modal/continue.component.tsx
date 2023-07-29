import { UserContext } from '@/contexts/user.context';
import { StyledModal } from '@/styles/modalstyles';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRouter } from 'next/navigation';
import React from 'react';

const ContinueModal = () => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const userContext = React.useContext(UserContext);

  const router = useRouter();

  const preventSubmit = (event: any) => {
    if (event.key === 'Enter') event.preventDefault();
    if (event.key === 'Escape') {
      event.preventDefault();
      userContext.setModalContinue(false);
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
        userContext.setModalContinue(false);
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
              userContext.setModalContinue(false);
            }}
          />

          <div style={{ gap: '1rem' }}>
            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                userContext.setModalContinue(false);
              }}
            >
              Continuar comprando
            </button>

            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                userContext.setModalContinue(false);
                router.push('/cart');
              }}
            >
              Ir para carrinho
            </button>
          </div>
        </form>
      </section>
    </StyledModal>
  );
};

export default ContinueModal;
