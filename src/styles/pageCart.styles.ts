import styled from 'styled-components';

export const StyledCart = styled.main`
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
    padding: 1.8rem;

    > h2 {
      font-size: 1.8rem;
      color: var(--color-primary);
      cursor: default;
      border-bottom: 0.2rem solid var(--color-primary);
      text-align: center;
    }

    > h3 {
      font-size: 1.8rem;
      color: var(--color-primary);
      cursor: default;
      text-align: center;
    }

    > ul {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;

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

    > div {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-top: 4rem;

      > p {
        padding: 0.6rem;
        border-radius: 0.4rem;
        font-size: 1.6rem;
        background-color: var(--color-grey-8);
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

    > span {
      margin-top: 5rem;
      > ul {
        display: flex;
        gap: 2rem;
        overflow: auto;
        flex-wrap: wrap;

        > li {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--color-grey-7);
          border-radius: 0.4rem;
          background-color: var(--color-secundary);

          > h2 {
            max-width: 18rem;
            font-size: 1.4rem;
            text-transform: uppercase;
          }

          > img {
            background-color: transparent;
            padding: 3px;
            border-radius: 0.6rem;

            :hover {
              background-color: var(--color-primary);
              filter: brightness(1.1);
            }
          }

          > p {
            font-size: 1.4rem;
          }
        }
      }
    }
  }
`;
