import styled from "styled-components";

function Banner() {
  return <BannerContainer></BannerContainer>;
}
export default Banner;

const BannerContainer = styled.div`
  width: 100%;
  height: 150px;
  border: 2px solid ${(props) => props.theme.colors.point};
  margin-top: 40px;
  border-radius: 20px;
`;
