import styled from 'styled-components';

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
`;

export default {
  Loading,
};
