import styled from 'styled-components';

export const StyledFooter = styled.footer`
  width: 100%;
  border-top: 0.2rem solid var(--color-grey-6);
  background-color: var(--color-grey-10);
  position: relative;

  > a {
    > img {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      cursor: pointer;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    margin: 0 auto;
    max-width: 110rem;
    gap: 2rem;

    > section {
      display: flex;
      flex-direction: column;

      > h2 {
        font-size: 2.2rem;
        padding-bottom: 1rem;
        color: var(--color-primary);
        cursor: default;
      }

      > nav {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;

        > a {
          font-size: 1.4rem;
          text-decoration: none;
          color: var(--color-grey-3);

          :hover {
            color: black;
          }
        }
      }
    }
  }

  @media (min-width: 1024px) {
    > div {
      flex-direction: row;
      align-items: center;
      gap: 0;

      > section {
        height: 130px;
      }
    }
  }
`;
