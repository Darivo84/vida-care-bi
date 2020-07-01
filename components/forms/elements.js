import PropTypes from 'prop-types';

import {
  InputContainer,
  FormContainer,
  Label,
  Input,
  Select,
} from '../styles/formStyles';

const Form = ({ children, handleSubmit }) => (
  <FormContainer>
    <form data-test="form" onSubmit={handleSubmit}>
      {children}
    </form>
  </FormContainer>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const InputField = props => <Input {...props} />;

const SelectField = props => <Select {...props} />;

export { InputContainer, Label, InputField, Form, SelectField };
