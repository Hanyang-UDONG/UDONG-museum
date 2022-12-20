import { useState } from "react";
import styled, { css } from "styled-components";
import PhotoModal from "./PhotoModal";
import * as S from "../../../components/feed/Feed_Style";

function Feed({ photos }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState();
  const showPhotoDetail = (e, index) => {
    setIsModalOpen(true);
    setPhotoIndex(index);
  };
  return (
    <>
      <FeedTitle>👏 총 {photos.length}점의 작품을 감상하세요</FeedTitle>
      <S.FeedContainer>
        {photos.map((photo, index) => (
          <S.PhotoContainer
            key={index}
            onClick={(e) => showPhotoDetail(e, index)}
          >
            <S.PhotoCover enabled={photo.used}>
              {photo.used && "전시중"}
            </S.PhotoCover>
            <S.PhotoImg>{photo.title}</S.PhotoImg>
          </S.PhotoContainer>
        ))}
        {photos.length % 3 === 2 && (
          <S.PhotoContainer filling={true}></S.PhotoContainer>
        )}
        {isModalOpen && <Cover></Cover>}
        {isModalOpen && (
          <PhotoModal
            index={photoIndex}
            photos={photos}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </S.FeedContainer>
    </>
  );
}
export default Feed;

const FeedTitle = styled.div`
  font-size: 30px;
  margin-top: 30px;
  margin-bottom: 10px;
`;
const Cover = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 0.5;
  background-color: black;
`;
