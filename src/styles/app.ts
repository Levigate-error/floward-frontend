import styled from 'styled-components';
import { rgba } from 'polished';

const Wrapper = styled.div`
  min-height: 100vh;
  background:
          linear-gradient(180deg,
          hsla(0,0%,100%,.2),
          ${(props) => rgba(props.theme.colors.turquoise, 0.2)}),
          #f0f5f7;
`;

export default {
  Wrapper,
};
