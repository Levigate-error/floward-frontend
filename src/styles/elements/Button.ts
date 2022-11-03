import styled, { css } from 'styled-components';

const Button = styled.button`
  color: ${(props) => props.theme.Colors.Black};
  border: solid 1px transparent;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
  linear-gradient(101deg, #B6E82F, #50E0ED);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px #FFFFFF inset;
  border-radius: 10px;
  transition: color, border, box-shadow, filter 0.3s ease;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  &:hover {
    color: ${(props) => props.theme.Colors.Black};
    filter: drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.35));
    border: 1px solid transparent;
    border-image: linear-gradient(90deg, rgba(182, 232, 47, 0.25) 0%, rgba(80, 224, 237, 0.25) 100%);
    position: relative;
    border-radius: 10px;
    background-image: linear-gradient(rgba(255, 255, 255, 0), 
    rgba(255, 255, 255, 0)), linear-gradient(101deg, #B6E82F, #50E0ED);
    background-origin: border-box;
    background-clip: content-box, border-box;
    box-shadow: 2px 1000px 1px #F8F8F8 inset;
  }
;

  ${(props) => props.disabled && css`
    background-image: none !important;
    box-shadow: none !important;
    filter: none !important;
    cursor: default;
    border: 1px solid ${props.theme.Colors.MG24} !important;
    color: ${props.theme.Colors.MG24} !important;
  `};
`;

export default Button;
