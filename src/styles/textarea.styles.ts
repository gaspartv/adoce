import styled from 'styled-components';

export const StyledTextarea = styled.textarea`
  padding: 1.2rem 0.8rem;
  border: 0.1rem solid var(--color-primary);
  border-radius: 0.6rem;
  background-color: #f1f3f590;
  letter-spacing: 0.1rem;
  z-index: 3;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0.2rem var(--color-fourth);
  }

  &:focus + label {
    top: -1.8rem;
    left: 0.2rem;
    opacity: 1;
    color: var(--color-primary);
  }

  &:not(:placeholder-shown) + label {
    top: -1.8rem;
    left: 0.2rem;
  }

  ::placeholder {
    font-size: 1.4rem;
    letter-spacing: 0.1rem;
  }
`;
