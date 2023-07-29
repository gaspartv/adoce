import styled from 'styled-components';

export const StyledSession = styled.main`
  margin: 0 auto;
  padding: 4rem 0;
  min-height: calc(100vh - (285px + 335px));

  @media (min-width: 1024px) {
    min-height: calc(100vh - (150px + 175px));
  }

  > form {
    display: flex;
    flex-direction: column;
    width: 35rem;
    margin: 0 auto;
    gap: 1.5rem;
    border: 0.1rem solid var(--color-primary);
    border-radius: 0.6rem;
    padding: 1.8rem;
    background-color: var(--color-grey-9);

    > h2 {
      width: 13.1rem;
      text-align: center;
      font-size: 2.2rem;
      color: var(--color-primary);
      margin-bottom: 1.2rem;
      cursor: default;
      border-bottom: 0.2rem solid var(--color-primary);
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: end;
      gap: 0.2rem;
      position: relative;

      > span {
        position: absolute;
        right: 1rem;
        top: 1rem;
        cursor: pointer;
        opacity: 0.5;
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

    > a {
      text-align: end;
      padding-right: 1rem;
      font-size: 1.4rem;
      text-decoration: none;
      color: var(--color-grey-3);

      :hover {
        color: black;
        cursor: pointer;
      }
    }
  }
`;

export const StyledRecovery = styled.p`
  text-align: end;
  padding-right: 1rem;
  font-size: 1.4rem;
  text-decoration: none;
  color: var(--color-grey-3);

  :hover {
    color: black;
    cursor: pointer;
  }
`;
