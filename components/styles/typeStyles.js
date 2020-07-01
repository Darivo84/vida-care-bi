import styled from 'styled-components';

const Text = styled.p`
  font-size: 20px;
  font-weight: 300;
  text-align: center;
`;
const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  font-style: italic;
`;

const Anchor = styled.a`
  color: ${props => props.color};
  text-decoration: underline;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 1px;
  cursor: pointer;
`;

export { Text, Title, Anchor };
