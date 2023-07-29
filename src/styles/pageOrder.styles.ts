import styled from 'styled-components';

export const StyledOrder = styled.main`
  min-height: calc(100vh - (620px));

  @media (min-width: 1024px) {
    min-height: calc(100vh - (285px));
  }

  > section {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 1.8rem;
    max-width: 110rem;
    margin: 4rem auto;
    padding: 1.8rem;

    > h2 {
      font-size: 1.8rem;
      color: var(--color-primary);
      cursor: default;
    }

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
`;
