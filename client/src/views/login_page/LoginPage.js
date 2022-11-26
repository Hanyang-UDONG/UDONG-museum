import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormError from "../../components/authForm/FormError";
import * as S from "../../components/authForm/AuthForm_Style";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { GET_ME, LOGIN } from "../../api/userAPI";
import { userActions } from "../../store/userSlice";
import { useEffect } from "react";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: login } = useMutation(LOGIN);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    watch,
  } = useForm();
  const onFormSubmit = () => {
    const { email, password } = getValues();
    const data = {
      email,
      password,
    };
    login(data, {
      onSuccess: (res) => {
        if (res.data.loginSuccess) {
          dispatch(userActions.login());
          navigate("/");
        } else {
          console.log(res.message);
        }
      },
    });
  };

  return (
    <S.AuthPageContainer>
      <S.AuthForm>
        <S.FormTitle>LOGIN</S.FormTitle>
        <S.Separator></S.Separator>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <S.FormInput>
            <S.Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            <FormError text={errors.email?.message} />
            <S.Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <FormError text={errors.password?.message} />
          </S.FormInput>
          <S.FormBtn type="submit" disabled={isSubmitting}>
            login
          </S.FormBtn>
        </form>
        <S.FormLinkContainer>
          <S.FormLinkDescription>Don't have an account?</S.FormLinkDescription>
          <S.FormLink to="/register">Register</S.FormLink>
        </S.FormLinkContainer>
      </S.AuthForm>
    </S.AuthPageContainer>
  );
}

export default LoginPage;
