import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: ${props => props.margin};
`;

const FormContainer = styled.div`
  font-family: 'Nunito Sans';
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  margin: 0 auto;
  form {
    width: 100%;
  }
`;

const Label = styled.label`
  font-size: 20px;
  display: block;
  font-weight: 400;
  color: #7b7b7b;
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  height: 60px;
  font-size: 20px;
  font-weight: 200;
  border: 2px solid #000000;
  margin-bottom: ${props => (props.error ? '0' : '25px')};
  padding-left: 1.5rem;
  ::placeholder {
    color: #848484;
    letter-spacing: 1.4px;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 60px;
  font-size: 20px;
`;

export { InputContainer, FormContainer, Label, Input, Select };
