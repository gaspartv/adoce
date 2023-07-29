import styled from 'styled-components';

export const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  position: fixed;
  z-index: 600;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 350px;
    height: 200px;
  }
`;
