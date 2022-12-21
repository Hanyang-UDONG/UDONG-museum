import { useState } from "react";
import { useQuery } from "react-query";
import { GET_RECENT } from "../../../api/exhibitionAPI";
import ExhibitionCard from "./ExhibitionCard";

function FollowingExhibitions() {
  const [exhibitions, setExhibitions] = useState([]);
  const { data, isLoading } = useQuery("get_recent", GET_RECENT, {
    onSuccess: (data) => {
      setExhibitions(data.data.exhibitions);
    },
  });

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          {exhibitions?.length !== 0 ? (
            <>
              {exhibitions?.map((exhibition, idx) => (
                <ExhibitionCard
                  isNear={false}
                  exhibition={exhibition}
                  key={idx}
                />
              ))}
            </>
          ) : (
            <>start following others!</>
          )}
        </>
      )}
    </>
  );
}
export default FollowingExhibitions;
