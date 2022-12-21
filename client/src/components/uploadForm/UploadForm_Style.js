import styled, { css } from "styled-components";

export const UploadFormContainer = styled.div`
  margin-top: 20px;
  width: 1000px;
`;
export const UploadFormInputs = styled.div`
  display: flex;
  margin-top: 20px;
`;
export const UploadInfoInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  flex-grow: 1;
`;
export const InfoInput = styled.div`
  display: flex;
  &:last-child {
    flex-grow: 1;
  }
`;
export const FormLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100px;
`;

export const TitleInput = styled.input`
  /* margin-top: 10px; */
  background-color: #f2f6f9;
  padding: 10px;
  border: none;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
  font-family: "Noto Sans KR", sans-serif;
  ${(props) =>
    props.isError &&
    css`
      border: 1px solid ${(props) => props.theme.colors.error};
    `}
  margin-bottom:10px;
  flex-grow: 1;
`;
export const DescriptionInput = styled.textarea`
  margin-top: 10px;
  background-color: #f2f6f9;
  padding: 10px;
  border: none;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
  resize: none;
  flex-grow: 1;
  font-family: "Noto Sans KR", sans-serif;
`;
export const DateInput = styled.input`
  background-color: #f2f6f9;
  border: none;
  &:focus {
    outline: none;
  }
  padding: 10px;
  margin-top: 10px;
  font-family: "Noto Sans KR", sans-serif;
  margin-bottom: 10px;
  width: 170px;
  border-radius: 5px;
`;
