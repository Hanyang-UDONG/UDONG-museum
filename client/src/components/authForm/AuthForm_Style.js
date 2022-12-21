import { Link } from "react-router-dom";
import styled from "styled-components";

export const FormLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.point};
  margin-left: 5px;
`;
export const FormLinkDescription = styled.div`
  color: #cccccc;
`;
export const FormLinkContainer = styled.div`
  display: flex;
  font-size: 15px;
  margin-top: 10px;
`;
export const FormBtn = styled.button`
  background-color: ${(props) => props.theme.colors.point};
  border: none;
  color: white;
  width: 250px;
  height: 40px;
  border-radius: 5px;
  margin-top: 13px;
  &:hover {
    cursor: pointer;
  }
`;
export const Input = styled.input`
  width: 250px;
  height: 40px;
  margin-top: 13px;
  padding-left: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  background-color: #e6e9f4;
`;
export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
`;
export const Separator = styled.div`
  width: 250px;
  background-color: #cccccc;
  height: 1px;
  margin-top: 20px;
`;
export const FormTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
export const AuthForm = styled.div`
  height: 600px;
  width: 400px;
  margin-top: 30px;
  padding-top: 50px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
`;
export const AuthPageContainer = styled.div`
  /* background-color: ${(props) => props.theme.colors.main};
  height: 100%;
  display: flex;
  justify-content: center; */
`;
