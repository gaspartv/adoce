import styled from 'styled-components';

export const StyledAdmin = styled.main`
  min-height: calc(100vh - (620px));

  @media (min-width: 1024px) {
    min-height: calc(100vh - (285px));
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

    > ul {
      display: flex;
      flex-wrap: wrap;
      gap: 2.6rem;

      > li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.6rem;
        max-width: 180px;
        border: 0.1rem solid var(--color-primary);
        padding: 0.6rem;
        border-radius: 0.6rem;
        cursor: default;

        > h2 {
          font-size: 1.5rem;
          text-align: center;
        }

        > p {
          font-size: 1.2rem;
        }

        > div {
          display: flex;
          gap: 0.6rem;

          > button {
            width: 100%;
            padding: 0.4rem;
            font-size: 1.3rem;
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
      }
    }

    > span {
      display: flex;
      justify-content: center;
      > ul {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;

        > li {
          display: flex;
          align-items: center;
          width: 50rem;
          gap: 1.2rem;
          position: relative;
          border: 0.1rem solid black;
          border-radius: 0.4rem;
          background-color: var(--color-whiteFixed);
          padding: 0.5rem;

          :hover {
            background-color: var(--color-secundary);
            cursor: pointer;
          }

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
  }
`;
