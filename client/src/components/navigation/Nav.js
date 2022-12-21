import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LOGOUT } from "../../api/userAPI";
import { userActions } from "../../store/userSlice";

function Nav() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const { mutate: logout } = useMutation(LOGOUT);
  const onLogoutClick = () => {
    logout([], {
      onSuccess: (res) => {
        dispatch(userActions.logout());
      },
    });
  };

  return (
    <NavContainer>
      <NavContent>
        <LeftNav>
          <Link to="/">
            <NavBtn>LOGO</NavBtn>
          </Link>
        </LeftNav>
        <RightNav>
          {isLoggedIn ? (
            <>
              <LogoutBtn onClick={onLogoutClick}>로그아웃</LogoutBtn>
              <Profile></Profile>
              <Link to={`/${user?.id}`}>
                <Username>{user?.name}</Username>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <LoginBtn>로그인</LoginBtn>
              </Link>
              <Link to="/register">
                <SignupBtn>회원가입</SignupBtn>
              </Link>
            </>
          )}
        </RightNav>
      </NavContent>
    </NavContainer>
  );
}
export default Nav;

const NavBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 80px; */
  padding: 0px 10px;
  height: 35px;
  border: 1px solid;
  border-radius: 7px;
  margin-right: 10px;
  color: ${(props) => props.theme.colors.description};
`;
const LoginBtn = styled(NavBtn)`
  border: none;
  background-color: #3dcd59;
  color: white;
`;
const SignupBtn = styled(NavBtn)`
  border: none;
  background-color: #3dcdac;
  color: white;
`;
const LogoutBtn = styled(NavBtn)`
  border: none;
  &:hover {
    cursor: pointer;
  }
  color: white;
  background-color: ${(props) => props.theme.colors.point};
  margin-right: 20px;
`;
const Username = styled(NavBtn)`
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const Profile = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50px;
  /* margin-right: 5px; */
  background-color: ${(props) => props.theme.colors.point};
  overflow: hidden;
`;
const StyledNavLink = styled(Link)`
  text-decoration: none;
`;
const RightNav = styled.div`
  display: flex;
`;
const LeftNav = styled.div``;
const NavContent = styled.div`
  margin: 0px 120px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NavContainer = styled.div`
  width: 100%;
  /* position: fixed; */
  /* position: relative;
  z-index: 1; */
`;
