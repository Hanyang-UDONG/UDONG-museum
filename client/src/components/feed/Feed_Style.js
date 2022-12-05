import styled, { css } from "styled-components";

export const FeedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const PhotoContainer = styled.div`
  width: 320px;
  height: 320px;
  position: relative;
  background-color: #c8c8c8;
  flex-shrink: 0;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
  }
`;
export const PhotoCover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  ${(props) =>
    props.enabled &&
    css`
      background-color: black;
      opacity: 0.5;
      color: white;
    `}
`;
export const PhotoImg = styled.div`
  color: beige;
`;
