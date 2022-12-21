import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { EDIT_PROFILE } from "../../api/userAPI";
import FormError from "../../components/authForm/FormError";

function EditProfilePage() {
  const navigate = useNavigate();
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const user = useSelector((state) => state.user.user);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    watch,
  } = useForm();
  const { mutate: editProfile } = useMutation(EDIT_PROFILE);
  const onFormSubmit = () => {
    const { name, location, description, password } = getValues();
    const data = {
      name,
      location,
      description,
      password,
    };
    editProfile(data, {
      onSuccess: (res) => {
        console.log(res);
        if (res.data.editMyInfoSuccess) {
          setIsEditSuccess(true);
        }
      },
    });
  };
  const crntPassword = watch("password", "");
  const checkPassword = (pw) => {
    if (crntPassword !== pw) {
      return "password not confirmed";
    }
  };
  const editAnimationEnd = () => {
    setIsEditSuccess(false);
  };
  return (
    <EditProfilePageContainer>
      <ProfileFormContainer>
        <ProfileImg>
          <Cover></Cover>
        </ProfileImg>

        <EditForm onSubmit={handleSubmit(onFormSubmit)}>
          <InputContainer>
            <Label>아이디</Label>
            <Input defaultValue={user?.id} readOnly />
          </InputContainer>
          <InputContainer>
            <Label>이름</Label>
            <Input
              id="name"
              defaultValue={user?.name}
              {...register("name", {
                required: "Name is required",
              })}
              isError={errors.name}
            />
          </InputContainer>

          <InputContainer>
            <Label>지역</Label>
            <Input
              id="location"
              defaultValue={user?.location}
              {...register("location", {})}
            />
          </InputContainer>
          <InputContainer>
            <Label>설명</Label>
            <Input
              id="description"
              defaultValue={user?.description}
              {...register("description", {})}
            />
          </InputContainer>
          <InputContainer>
            <Label>비밀번호</Label>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              isError={errors.password}
            />
          </InputContainer>
          <InputContainer>
            <Label>비밀번호 확인</Label>
            <Input
              id="password_valid"
              type="password"
              {...register("password_valid", {
                required: "Password confirmation is required",
                validate: checkPassword,
              })}
              isError={errors.password_valid}
            />
          </InputContainer>
          <FormError text={errors.password_valid?.message} />

          <FormBtnContainer>
            <BackBtn onClick={() => navigate(-1)}>돌아가기</BackBtn>
            <EditFormBtn type="submit" disabled={isSubmitting}>
              프로필 수정
            </EditFormBtn>
          </FormBtnContainer>
          {isEditSuccess ? (
            <SuccessAlert onAnimationEnd={editAnimationEnd}>
              수정 완료!
            </SuccessAlert>
          ) : (
            <></>
          )}
        </EditForm>
      </ProfileFormContainer>
    </EditProfilePageContainer>
  );
}

export default EditProfilePage;

const fadeInOut = keyframes`
  0%{
    opacity:0;
  }
  50% {
    opacity:1;
  }
  100%{
    opacity:0
  }
`;
const SuccessAlert = styled.div`
  margin-top: 10px;
  color: #2bb239;
  opacity: 0;
  animation: ${fadeInOut} 2s;
`;
const FormBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.point};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 17px;
  font-weight: bold;
  border: none;
  margin: 0px 10px;
  &:hover {
    cursor: pointer;
  }
`;
const EditFormBtn = styled(Button)`
  background-color: #2bb239;
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}
`;
const BackBtn = styled(Button)``;
const Input = styled.input`
  width: 200px;
  height: 40px;
  padding-left: 10px;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
  color: #7889a0;
  font-size: 15px;
  background-color: #f2f6f9;
  border: none;
  ${(props) =>
    props.readOnly &&
    css`
      background-color: transparent;
    `}
  ${(props) =>
    props.isError &&
    css`
      border: 1px solid ${(props) => props.theme.colors.error};
    `}
`;
const Label = styled.div`
  color: black;
  font-size: 20px;
`;
const InputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin-top: 30px;
`;
const Cover = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.1;
  display: none;
`;

const ProfileImg = styled.div`
  flex-shrink: 0;
  overflow: hidden;
  width: 150px;
  height: 150px;
  border-radius: 100px;
  border: 2px solid ${(props) => props.theme.colors.point};
  background-color: white;
  &:hover {
    ${Cover} {
      display: block;
    }
    cursor: pointer;
  }
`;
const ProfileFormContainer = styled.div`
  width: 500px;
  height: 700px;
  border: 2px solid ${(props) => props.theme.colors.point};
  border-radius: 20px 20px 0px 0px;
  margin-top: 20px;
  padding: 30px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const EditProfilePageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
