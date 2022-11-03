import styled from 'styled-components';
import container from 'styles/elements/container';
import pageContainer from 'styles/elements/pageContainer';

const Wrapper = styled.div`
  display: flex;
`;

const Container = styled.div`
  ${container}
  ${pageContainer}
`;

export default {
  Wrapper,
  Container,
};
