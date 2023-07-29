import styled from 'styled-components';

export const StyledHeader = styled.header`
  width: 100%;
  padding: 3rem 0;
  border-bottom: 0.2rem solid var(--color-grey-6);
  min-width: 42.5rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    gap: 3rem;

    > h2 {
      font-size: 4rem;
      text-transform: uppercase;
      letter-spacing: 0.3rem;
      font-family: var(--font-family-2);
      color: var(--color-primary);
      cursor: pointer;
    }

    > form {
      width: 30rem;
      max-width: 30rem;
      display: flex;
      align-items: center;
      

      > input {
        width: 100%;
        padding: 0.8rem;
        border-radius: 0.6rem;
        border: 0.1rem solid var(--color-grey-3);

        :focus {
          outline: none;
          border: 0.1rem solid var(--color-primary);
        }

        ::placeholder {
          color: var(--color-grey-5);
          letter-spacing: 0.2rem;
          font-family: var(--font-family-2);
          font-size: 1.5rem;
        }
      }

      > button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        height: 3.3rem;
        border-bottom-right-radius: 0.6rem;
        border-top-right-radius: 0.6rem;
        border: 0.1rem solid var(--color-grey-3);
        border-left: none;
        padding: 0 1.5rem;

        :hover {
          background-color: var(--color-secundary);
          cursor: pointer;
          border: 0.1rem solid var(--color-primary);
          border-left: none;
        }
      }
    }

    > nav {
      width: 100%;
      display: flex;
      justify-content: space-evenly;

      > span {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        position: relative;

        > svg {
          width: 4rem;
          height: 4rem;
        }

        > p {
          font-size: 1.5rem;
          color: var(--color-grey-3);

          :hover {
            color: black;
          }
        }

        > span {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          right: 0;
          background-color: red;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: var(--color-grey-0);
          color: var(--color-grey-6);
        }
      }
    }
  }

  @media (min-width: 1024px) {
    > div {
      margin: 0 auto;
      max-width: 110rem;
      flex-direction: row;

      > h2 {
        width: 100%;
      }

      > form {
        width: 100%;
      }
    }
  }
`;
