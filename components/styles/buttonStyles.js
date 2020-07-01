import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 245px;
  height: 64px;
  margin: 20px 0 20px 0;
`;
const Button = styled.button`
  color: black;
  border: 4px solid black;
  background: #c9c9c9;
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  padding: 0.25em 1em;
  border-radius: 52px;
  box-shadow: 0px 6px 5px -1px rgba(0, 0, 0, 0.2);
`;

export { ButtonContainer, Button };
