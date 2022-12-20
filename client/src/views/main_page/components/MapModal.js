import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { exhibitionActions } from "../../../store/exhibitionSlice";
import { useQuery } from "react-query";
import { GET_EXHIBITION } from "../../../api/exhibitionAPI";
import { IoEnterOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function MapModal({ isOpen, setIsOpen, pointer }) {
  const selectedEID = useSelector((state) => state.exhibition.selectedEID);
  const [info, setInfo] = useState();
  const dispatch = useDispatch();
  const { data, refetch } = useQuery(
    ["get_exhibition", selectedEID],
    () => GET_EXHIBITION(selectedEID),
    {
      onSuccess: (res) => {
        if (res.data?.getExhibitionInfoSuccess) {
          setInfo(res.data.info);
        }
      },
    }
  );

  const closeModal = () => {
    dispatch(exhibitionActions.selectedEID(""));
    setIsOpen(false);
  };
  return (
    <>
      {isOpen && (
        <CardContainer pointer={pointer}>
          <ModalCloseBtn onClick={closeModal}>
            <IoCloseCircleSharp size={30} />
          </ModalCloseBtn>
          <CardPhoto></CardPhoto>
          <CardDescription>
            <CardInfo>
              <div>{info?.name}</div>
              <UserInfo>{info?.user}</UserInfo>
            </CardInfo>

            <Link to={`/exhibition/${selectedEID}`}>
              <NavigateBtn>
                <IoEnterOutline size={30} />
              </NavigateBtn>
            </Link>
          </CardDescription>
        </CardContainer>
      )}
    </>
  );
}

export default MapModal;

const UserInfo = styled.div`
  font-size: 13px;
  color: #9f9f9f;
`;
const NavigateBtn = styled.div`
  color: black;
  &:hover {
    cursor: pointer;
    color: #1e82eb;
  }
`;
const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardDescription = styled.div`
  padding: 10px 20px;
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CardPhoto = styled.div`
  width: 100%;
  background-color: #f2f6f9;
  height: 150px;
`;
const ModalCloseBtn = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  opacity: 0.4;
  &:hover {
    cursor: pointer;
  }
`;
const CardContainer = styled.div`
  position: absolute;
  top: ${(props) =>
    props.pointer.y > window.innerHeight / 2 + 30
      ? props.pointer.y - 250
      : props.pointer.y}px;
  left: ${(props) =>
    props.pointer.x > window.innerWidth / 2 - 40
      ? props.pointer.x - 380
      : props.pointer.x + 30}px;
  width: 350px;
  height: 230px;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 289;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
`;
