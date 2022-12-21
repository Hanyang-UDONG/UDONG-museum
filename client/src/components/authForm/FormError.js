import styled from "styled-components";

const FormErrorContainer = styled.div`
  color: ${(props) => props.theme.colors.error};
  font-size: 13px;
`;
function FormError({ text }) {
  return <FormErrorContainer>{text}</FormErrorContainer>;
}
export default FormError;
