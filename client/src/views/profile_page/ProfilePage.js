import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { PHOTO_LISTUP } from "../../api/photoAPI";
import { GET_ME, GET_USER, FOLLOW, UNFOLLOW } from "../../api/userAPI";
import { profileActions } from "../../store/profileSlice";
import Banner from "./components/Banner";
import Feed from "./components/Feed";
import UploadBtn from "./components/UploadBtn";
import { VscEdit } from "react-icons/vsc";

const default_user = {
  name: "",
  description: "",
  location: "",
  following: [],
};
function ProfilePage() {
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, setUser] = useState(default_user);
  const [photos, setPhotos] = useState([]);
  const { uid } = useParams();
  let me = useSelector((state) => state.user.user);
  const isMe = me.id === uid;
  dispatch(profileActions.isMe(isMe));

  const { data: get_user_data } = useQuery(
    // get user of current profile
    ["get_user", uid],
    () => GET_USER(uid),
    {
      onSuccess: (get_user_data) => {
        if (get_user_data.data.getUserInfoSuccess) {
          setUser(get_user_data.data);
          dispatch(profileActions.user(get_user_data.data));
        }
      },
    }
  );
  const { data } = useQuery(["get_me", uid], GET_ME, {
    staleTime: Infinity,
    onSuccess: (data) => {
      if (data.data.following.includes(user.id)) {
        setIsFollowing(true);
      }
    },
  });
  const { data: photo_listup_data } = useQuery(
    ["photo_listup", uid],
    () => PHOTO_LISTUP(uid),
    {
      onSuccess: (photo_listup_data) => {
        if (photo_listup_data.data.listUpPhotoSuccess) {
          setPhotos(photo_listup_data.data.photos);
        }
      },
    }
  );

  const { mutate: follow } = useMutation(FOLLOW);
  const { mutate: unfollow } = useMutation(UNFOLLOW);
  const toggleFollow = () => {
    if (isFollowing) {
      unfollow(uid, {
        onSuccess: (res) => {
          console.log(res);
          if (res.data.unfollowUserSuccess) {
            setIsFollowing(false);
          }
        },
      });
    } else {
      follow(uid, {
        onSuccess: (res) => {
          console.log(res);
          if (res.data.followUserSuccess) {
            setIsFollowing(true);
          }
        },
      });
    }
  };
  return (
    <ProfilePageContainer>
      <HeaderContainer>
        <ProfileImg>
          {isMe && (
            <Link to="/profile/edit">
              <EditProfileBtn>
                <VscEdit size={35} style={{ color: "white" }} />
              </EditProfileBtn>
            </Link>
          )}
        </ProfileImg>
        <UserInfoContainer>
          <UserInfo>
            <Name>{user?.name}</Name>
            <Description>{user?.description}</Description>
            <Location>{user?.location}</Location>
          </UserInfo>
          <ProfileBtnContainer>
            {isMe ? (
              <>
                <FollowBtn>팔로잉 {user?.following.length}명</FollowBtn>
                <Link to="/exhibition/open">
                  <OpenExhibitionBtn>전시회 열기</OpenExhibitionBtn>
                </Link>
              </>
            ) : (
              <FollowBtn onClick={toggleFollow}>
                {isFollowing ? "unfollow" : "follow"}
              </FollowBtn>
            )}
          </ProfileBtnContainer>
        </UserInfoContainer>
      </HeaderContainer>
      <Banner />
      <Feed photos={photos} isMe={isMe} />
      {isMe && <UploadBtn />}
    </ProfilePageContainer>
  );
}
export default ProfilePage;

const ProfilePageContainer = styled.div`
  width: 1000px;
`;
const HeaderContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;
const ProfileImg = styled.div`
  overflow: hidden;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border: 2px solid ${(props) => props.theme.colors.point};
`;
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  justify-content: space-between;
`;
const UserInfo = styled.div``;
const Name = styled.div`
  color: ${(props) => props.theme.colors.description};
  font-size: 40px;
`;
const Description = styled.div`
  color: ${(props) => props.theme.colors.subtitle};
`;
const Location = styled.div`
  margin-top: 20px;
  color: ${(props) => props.theme.colors.subtitle};
`;
const ProfileBtnContainer = styled.div`
  display: flex;
`;
const ProfileBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  height: 40px;
  border-radius: 7px;
  margin-top: 20px;
  margin-right: 10px;
`;
const FollowBtn = styled(ProfileBtn)`
  background-color: #2abce7;
  color: white;
`;
const OpenExhibitionBtn = styled(ProfileBtn)`
  background-color: ${(props) => props.theme.colors.point};
  color: white;
`;
const EditProfileBtn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  background-color: black;
  &:hover {
    opacity: 0.2;
  }
`;
