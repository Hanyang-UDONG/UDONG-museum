import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { GET_NEAR } from "../../../api/exhibitionAPI";
import ExhibitionCard from "./ExhibitionCard";
import { exhibitionActions } from "../../../store/exhibitionSlice";
import { mapActions } from "../../../store/mapSlice";

function NearExhibitions() {
  const dispatch = useDispatch();
  const [exhibitions, setExhibitions] = useState([]);
  const [crntLocation, setCrntLocation] = useState({
    latitude: "",
    longitude: "",
  });

  let target_area;

  const { data, isLoading, isFetched, refetch } = useQuery(
    ["get_near", target_area],
    () => GET_NEAR(target_area),
    {
      enabled: false,
      onSuccess: (data) => {
        setExhibitions(data.data.exhibitions);
        dispatch(exhibitionActions.near(data.data.exhibitions));
      },
    }
  );
  useEffect(() => {
    let latitude;
    let longitude;
    let locationPromise = new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        resolve({ latitude, longitude });
      });
    });
    locationPromise.then(function ({ latitude, longitude }) {
      // setCrntLocation({ latitude, longitude });
      target_area = {
        maxLatitude: latitude + 0.01893173974,
        minLatitude: latitude - 0.01893173974,
        maxLongitude: longitude + 0.0398315272,
        minLongitude: longitude - 0.0398315272,
      };
      refetch(target_area);
      dispatch(mapActions.location({ latitude, longitude }));
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          {exhibitions?.length !== 0 ? (
            <>
              {exhibitions.map((exhibition, idx) => (
                <ExhibitionCard
                  isNear={true}
                  exhibition={exhibition}
                  key={idx}
                />
              ))}
            </>
          ) : (
            <>No exhibition nearby!</>
          )}
        </>
      )}
    </>
  );
}
export default NearExhibitions;
