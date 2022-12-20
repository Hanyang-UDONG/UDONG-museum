import { useQuery } from "react-query";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { GET_ME } from "../api/userAPI";
import { userActions } from "../store/userSlice";

const Me = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state) => state.user.isLoggedIn,
    shallowEqual
  );
  const { data, isLoading, isFetched, refetch } = useQuery("get_me", GET_ME, {
    // staleTime: Infinity, // fetch only once
    onSuccess: (data) => {
      dispatch(userActions.me(data.data));
    },
  });

  return isLoggedIn ? isFetched ? children : <>loading page</> : children;
};
export default Me;
