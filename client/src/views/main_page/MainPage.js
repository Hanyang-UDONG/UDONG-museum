import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { exhibitionActions } from "../../store/exhibitionSlice";
import FollowingExhibitions from "./components/FollowingExhibitions";
import KakaoMap from "./components/KakaoMap";
import MapModal from "./components/MapModal";
import NearExhibitions from "./components/NearExhibitions";

function MainPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const selectedEID = useSelector((state) => state.exhibition.selectedEID);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pointer, setPointer] = useState({});

  const onMapClick = (e) => {
    if (!isModalOpen && selectedEID !== "") {
      setPointer({
        x: e.clientX,
        y: e.clientY,
      });
      setIsModalOpen(true);
    } else if (isModalOpen) {
      setIsModalOpen(false);
      dispatch(exhibitionActions.selectedEID(""));
    }
  };
  return (
    <MainPageContainer>
      <MainPageTitle>π λ§μμ λλ μ μνλ₯Ό μ°Ύμλ³΄μΈμ</MainPageTitle>
      <ContentContainer>
        {isModalOpen && (
          <MapModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            pointer={pointer}
          />
        )}

        <MapContainer onClick={onMapClick}>
          <MapCover isCovered={isModalOpen}></MapCover>
          <KakaoMap setIsModalOpen={setIsModalOpen} />
        </MapContainer>
        <SideMenuContainer>
          <SideMenu>
            <SideMenuTitle>π‘ μ°λ¦¬ λλ€ μ μν</SideMenuTitle>
            <SideMenuContent>
              <NearExhibitions />
            </SideMenuContent>
          </SideMenu>
          <SideMenu>
            <SideMenuTitle>π‘ λ΄κ° νλ‘μ°νλ μ¬μ©μμ μ μν</SideMenuTitle>
            <SideMenuContent>
              {isLoggedIn ? (
                <FollowingExhibitions />
              ) : (
                <>Login to follow others!</>
              )}
            </SideMenuContent>
          </SideMenu>
        </SideMenuContainer>
      </ContentContainer>
    </MainPageContainer>
  );
}
export default MainPage;

const SideMenuContent = styled.div`
  background-color: ${(props) => props.theme.colors.point};
  color: white;
  height: 230px;
  margin-top: 10px;
  padding-top: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SideMenuTitle = styled.div`
  color: ${(props) => props.theme.colors.description};
  font-size: ${(props) => props.theme.fontSizes.subtitle};
`;
const SideMenu = styled.div`
  border-radius: 10px;
`;
const SideMenuContainer = styled.div`
  height: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const MapCover = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.4;
  z-index: 288;
  ${(props) =>
    props.isCovered &&
    css`
      display: block;
    `}
  &:hover {
    cursor: pointer;
  }
`;
const MapContainer = styled.div`
  height: 100%;
  background-color: white;
  flex-grow: 2.5;
  flex-basis: 60%;
  margin-right: 30px;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;
const MainPageTitle = styled.div`
  margin-top: 30px;
  color: ${(props) => props.theme.colors.description};
  font-size: ${(props) => props.theme.fontSizes.title};
`;
const ContentContainer = styled.div`
  display: flex;
  margin-top: 20px;
  height: 550px;
  /* position: static; */
`;
const MainPageContainer = styled.div`
  width: 100%;
`;
