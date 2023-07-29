import styled from 'styled-components';

export const StyledHome = styled.main`
  min-height: calc(100vh - (285px + 335px));
  padding: 1rem;

  @media (min-width: 1024px) {
    min-height: calc(100vh - (150px + 175px));
  }

  > div {
    margin: 0 auto;
    max-width: 110rem;
    padding: 4rem 0 0 0;
    display: flex;
    gap: 2rem;
  }

  > ul {
    margin: 0 auto;
    max-width: 110rem;
    padding: 4rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;

    @media (min-width: 1100px) {
      justify-content: flex-start;
    }

    > li {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border: 1px solid var(--color-grey-7);
      padding: 0.4rem;
      border-radius: 0.4rem;

      > h2 {
        font-size: 1.4rem;
        text-transform: uppercase;
        max-width: 18rem;
      }

      > img {
        background-color: transparent;
        padding: 3px;
        border-radius: 0.6rem;
      }

      > p {
        font-size: 1.4rem;
      }

      :hover {
        background-color: var(--color-hover);
        filter: brightness(1.1);
        border: 1px solid var(--color-grey-0);
      }
    }
  }

  > div {
    > button {
      padding: 1.2rem 0.8rem;
      border: 0.1rem solid var(--color-primary);
      border-radius: 0.6rem;
      background-color: var(--color-grey-8);
      letter-spacing: 0.1rem;
      cursor: pointer;
    }
  }
`;
