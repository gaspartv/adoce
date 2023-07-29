import styled from 'styled-components';

export const StyledPayment = styled.main`
  min-height: calc(100vh - (620px));

  @media (min-width: 1024px) {
    min-height: calc(100vh - (285px));
  }

  > section {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 1.8rem;
    max-width: 110rem;
    margin: 4rem auto;
    padding: 1.8rem;

    > h3 {
      font-size: 1.8rem;
      color: var(--color-primary);
      cursor: default;
      text-align: center;
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      > p {
        font-size: 1.2rem;
      }

      > button {
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

    > ul {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;

      > h3 {
        margin-top: 2rem;
        font-size: 1.8rem;
        color: var(--color-primary);
        cursor: default;
      }

      > li {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        position: relative;
        border: 0.1rem solid black;
        border-radius: 0.4rem;
        background-color: var(--color-secundary);

        > p {
          font-size: 1.4rem;
          letter-spacing: 0.1rem;
        }

        > span {
          position: absolute;
          right: 1rem;
          cursor: pointer;
        }
      }
    }
  }
`;
