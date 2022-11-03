import styled, { css } from 'styled-components';

interface WrapperProps {
  double?: boolean
}

const Content = styled.div``;

const Wrapper = styled.div<WrapperProps>`
  border-radius: 10px;
  background: #fff;
  width: 100%;
  padding: 30px;
  box-shadow: 0 0 12px rgba(0, 111, 128, 0.12);
  position: relative;
  
  ${(props) => (props.double ? css`
    ${Content} {
      display: flex;
      
      @media (max-width: 600px) {
        display: block;
      }
    }
  ` : null)}
`;

const Left = styled.div`
  width: 100%;
  margin-right: 30px;

  @media (max-width: 600px) {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
`;

const Right = styled.div`
  max-width: 280px;
  width: 100%;

  @media (max-width: 600px) {
    max-width: unset;
  }
`;

export default {
  Wrapper,
  Content,
  Left,
  Right,
};
