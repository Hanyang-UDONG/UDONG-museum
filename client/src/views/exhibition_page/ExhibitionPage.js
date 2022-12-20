import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { GET_EXHIBITION } from "../../api/exhibitionAPI";
import Scene from "./components/Scene";

function ExhibitionPage() {
  // https://jsfiddle.net/prisoner849/rwv0kex9/
  // https://codesandbox.io/s/024uom?file=/src/App.js
  const { eid } = useParams();
  const [exhibition, setExhibition] = useState();
  const [desc, setDesc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMe, setIsMe] = useState(false);
  let me = useSelector((state) => state.user.user);
  const { data, refetch } = useQuery(
    ["get_exhibition", eid],
    () => GET_EXHIBITION(eid),
    {
      onSuccess: (res) => {
        if (res.data.getExhibitionInfoSuccess) {
          setExhibition(res.data.info);
          setIsMe(res.data.info.user === me.id);
        }
      },
    }
  );
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <ExhibitionPageContainer>
      <Scene {...exhibition} setDesc={setDesc} />
      <DescriptionContainer>
        <Description>
          {desc ? (
            <>
              {desc}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit id est laborum.
            </>
          ) : (
            <>Click frame to see description!</>
          )}
        </Description>
      </DescriptionContainer>
      <InfoContainer>
        <div>
          <UserImg
            onClick={toggleModal}
            src={`${process.env.PUBLIC_URL}/image/user.png`}
          ></UserImg>
        </div>
        <ClickMe isModalOpen={isModalOpen}>Click me!</ClickMe>
        <UserInfo isModalOpen={isModalOpen}>
          <ExhibitionName>{exhibition?.name}</ExhibitionName>
          <div>{exhibition?.description}</div>
          <Link to={`/${exhibition?.user}`}>
            <Username>작가 {exhibition?.user}</Username>
          </Link>
          {isMe && (
            <Link to={`edit`}>
              <EditBtn>수정</EditBtn>
            </Link>
          )}
        </UserInfo>
      </InfoContainer>
      <PageCover isModalOpen={isModalOpen}></PageCover>
    </ExhibitionPageContainer>
  );
}

export default ExhibitionPage;

const PageCover = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.4;
  display: none;
  ${(props) =>
    props.isModalOpen &&
    css`
      display: block;
    `}
`;
const EditBtn = styled.div`
  width: 100%;
  text-align: right;
  color: #e64e4e;
  /* padding-top: 10px; */
  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`;
const ClickMe = styled.div`
  position: relative;
  color: #e0e0e0;
  /* color: hotpink; */
  left: 180px;
  bottom: 10px;
  ${(props) =>
    props.isModalOpen &&
    css`
      &::after {
        content: " (again)";
      }
    `}
`;
const ExhibitionName = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;
const Username = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 20px;
  color: #b3b3b3;
  &:hover {
    color: black;
    cursor: pointer;
  }
`;
const UserInfo = styled.div`
  position: absolute;
  bottom: 380px;
  width: 500px;
  padding: 30px 30px;
  background-color: white;
  display: none;
  ${(props) =>
    props.isModalOpen &&
    css`
      display: block;
    `}
  border-radius:20px;
  &::after {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 24px solid white;
    border-right: 12px solid transparent;
    border-top: 12px solid white;
    border-bottom: 20px solid transparent;
    right: 30%;
    bottom: -24px;
  }
`;

const UserImg = styled.img`
  transform: scale(1.2);
  &:hover {
    cursor: pointer;
  }
`;

const InfoContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 100px;
  z-index: 280;
`;
const Description = styled.div`
  padding: 10px;
  transform: rotateX(40deg);
`;
const DescriptionContainer = styled.div`
  perspective: 400px;
  padding: 0px 300px 20px;
  color: #b3b3b3;
`;
const ExhibitionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
