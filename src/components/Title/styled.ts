import styled from 'styled-components';

const Wrapper = styled.h1`
  font-style: normal;
  font-size: 28px;
  line-height: 150%;
  font-weight: 700;
  color: ${(props) => props.theme.colors.dark};
  margin: 0 0 30px 0;
  word-break: break-word;
`;

export default {
  Wrapper,
};
