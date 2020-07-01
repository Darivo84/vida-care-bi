import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: ${props => props.justify};
  width: 100%;
`;

export { Container };
