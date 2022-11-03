import styled, { css } from 'styled-components';
import { Link as LinkNotStyled } from 'react-router-dom';
import { default as ButtonNotStyled } from 'components/Button';
import TitleStyled from 'components/Title/styled';

type ColorProps = {
  color?: string;
}

type ContentHeaderProps = {
  withInfo?: boolean
}

const Wrapper = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 10px;
`;

const Content = styled.div`
  position: relative;
  min-height: 100px;
  
  .ant-table {
    overflow-y: auto;
  }
`;

const Button = styled<any>(ButtonNotStyled)`
  padding: 10px;
  white-space: nowrap;
`;

const Link = styled(LinkNotStyled)`
  color: ${(props) => props.theme.colors.turquoiseDark2} !important; 
`;

const Actions = styled.div` 
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  ${Button} {
    margin-right: 10px;
    
    &:last-child {
      margin-right: 0;
    }
  }
`;

const ContentHeader = styled.div<ContentHeaderProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;

  > * {
    margin-right: 20px;
    margin-bottom: 10px;
    
    &:last-child {
      margin-right: 0;
    }
  }

  ${(props) => props.withInfo && css`
    justify-content: flex-start;

    > * {
      &:first-child {
        margin-right: auto;
      }

      &:nth-child(2) {
        margin-left: 20px;
      }
    }
  `}
`;

const Color = styled.div<ColorProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => props.color || 'transparent'};
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: ${(props) => props.theme.colors.gray1};
  margin-bottom: 0;
  margin-top: 8px;
`;

const Info = styled.div`
  ${TitleStyled.Wrapper} {
    margin-bottom: 0;
  }
`;

const PopupBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

export default {
  Wrapper,
  Content,
  Actions,
  Button,
  Link,
  ContentHeader,
  Color,
  Description,
  Info,
  PopupBackground,
};
