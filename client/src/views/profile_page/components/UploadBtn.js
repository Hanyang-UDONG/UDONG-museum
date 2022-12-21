import styled from "styled-components";
import { MdAddBox } from "react-icons/md";
import { Link } from "react-router-dom";

function UploadBtn() {
  return (
    <Link to="/photo/upload">
      <BtnContainer>
        <MdAddBox size={55} />
      </BtnContainer>
    </Link>
  );
}
export default UploadBtn;

const BtnContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 200px;
  width: 50px;
  height: 50px;
  color: ${(props) => props.theme.colors.point};
`;
