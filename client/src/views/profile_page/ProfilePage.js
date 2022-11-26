import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { GET_ME, GET_USER, FOLLOW, UNFOLLOW } from "../../api/userAPI";
import { userActions } from "../../store/userSlice";

function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();
  const { uid } = useParams();
  let me = useSelector((state) => state.user.user);
  const isMe = me._id === uid;
  const { data } = useQuery(["get_me", uid], GET_ME, {
    staleTime: Infinity,
    onSuccess: (data) => {
      dispatch(userActions.me(data.data));
    },
  });
  const { data: user } = useQuery(["getUser", uid], () => GET_USER(uid), {
    staleTime: Infinity,
    onSuccess: (user) => {
      console.log(user);
    },
  });
  const { mutate: follow } = useMutation(FOLLOW);
  const { mutate: unfollow } = useMutation(UNFOLLOW);

  const toggleFollow = () => {
    if (isFollowing) {
      unfollow(uid, {
        onSuccess: (res) => {
          console.log(res);
          if (res.data.unfollowUserSuccess) {
            console.log("unfollow");
            setIsFollowing(false);
          }
        },
      });
    } else {
      follow(uid, {
        onSuccess: (res) => {
          console.log(res.data);
          if (res.data.followUserSuccess) {
            console.log("follow");
            setIsFollowing(true);
          }
        },
      });
    }
  };

  return (
    <ProfilePageContainer>
      <HeaderContainer>
        <ProfileImg></ProfileImg>
        <UserInfo>
          <Name>{user?.data?.name}</Name>
          <Description>{user?.data?.description}</Description>
          <Location>{user?.data?.location}</Location>
          <ProfileBtnContainer>
            {isMe ? (
              <>
                <FollowBtn>팔로워 {user?.data?.following.length}명</FollowBtn>
                <Link to="/profile/edit">
                  <EditProfileBtn>프로필 수정</EditProfileBtn>
                </Link>
              </>
            ) : (
              <FollowBtn onClick={toggleFollow}>
                {isFollowing ? "unfollow" : "follow"}
              </FollowBtn>
            )}
          </ProfileBtnContainer>
        </UserInfo>
      </HeaderContainer>
      <BannerContainer></BannerContainer>
      <FeedContainer></FeedContainer>
    </ProfilePageContainer>
  );
}
export default ProfilePage;

const ProfilePageContainer = styled.div`
  width: 80%;
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
  /* border: 1px solid ${(props) => props.theme.colors.point}; */
  background-color: ${(props) => props.theme.colors.point};
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  /* padding-top: 20px; */
`;
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
const EditProfileBtn = styled(ProfileBtn)`
  background-color: ${(props) => props.theme.colors.point};
  color: white;
`;
const BannerContainer = styled.div`
  width: 100%;
  height: 150px;
  /* border: 1px solid ${(props) => props.theme.colors.point}; */
  margin-top: 40px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.point};
`;
const FeedContainer = styled.div``;