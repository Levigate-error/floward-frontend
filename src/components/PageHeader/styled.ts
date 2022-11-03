import styled, { css } from 'styled-components';
import { default as TitleNotStyled } from 'components/Title';

interface WrapperProps {
  double?: boolean
}

interface TitleProps {
  withDescription: boolean
}

const Wrapper = styled.header<WrapperProps>`
  margin-bottom: 50px;
  width: 100%;
  
  ${(props) => (props.double ? css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    > *:last-child:not(:first-child) {
      margin-left: 20px;
    }
    
    @media (max-width: 600px) {
      display: block;

      > *:last-child:not(:first-child) {
        margin-top: 20px;
        margin-left: 0;
        flex-wrap: wrap;
        
        > * {
          margin-bottom: 10px;
        }
      }
    }
  ` : null)};

  @media (max-width: 600px) {
    margin-bottom: 30px;
  }
`;

const TextWrapper = styled.div``;

const Title = styled(TitleNotStyled)<TitleProps>`
  ${(props) => (props.withDescription ? 'margin-bottom: 10px' : 'margin-bottom: 0')};
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 120%;
  color: ${(props) => props.theme.colors.gray2};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  
  > *:not(:last-child) {
    margin-right: 16px;
  }
`;

export default {
  Wrapper,
  TextWrapper,
  Title,
  Description,
  Right,
};
