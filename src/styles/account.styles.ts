import styled from 'styled-components';

export const StyledAccount = styled.main`
  min-height: calc(100vh - (285px + 335px));

  @media (min-width: 1024px) {
    min-height: calc(100vh - (150px + 175px));
  }

  > section {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    max-width: 110rem;
    margin: 4rem auto;
    border-left: 2px solid var(--color-grey-6);
    padding: 1.8rem;

    > h2 {
      font-size: 1.8rem;
      color: var(--color-primary);
      cursor: default;
      border-bottom: 0.2rem solid var(--color-primary);
      text-align: center;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;

      @media (min-width: 1024px) {
        flex-direction: row;
      }

      > p {
        font-size: 1.3rem;
      }
    }

    > button {
      width: 15rem;
      font-size: 1.5rem;
      padding: 1rem;
      border: 0.1rem solid transparent;
      border-radius: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      font-weight: 600;
      color: var(--color-primary);
      background-color: var(--color-grey-7);

      :hover {
        background-color: var(--color-secundary);
        cursor: pointer;
        border: 0.1rem solid var(--color-primary);
      }
    }
  }
`;

export const StyledExcluir = styled.p`
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  color: var(--color-grey-0);
  letter-spacing: 0.1rem;

  :hover {
    color: red;
    cursor: pointer;
  }
`;
