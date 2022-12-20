import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { GET_NEAR } from "../../../api/exhibitionAPI";
import ExhibitionCard from "./ExhibitionCard";
import { exhibitionActions } from "../../../store/exhibitionSlice";
import { mapActions } from "../../../store/mapSlice";
import { userActions } from "../../../store/userSlice";

function NearExhibitions() {
  const dispatch = useDispatch();
  const [exhibitions, setExhibitions] = useState([]);
  const mapLocation = useSelector((state) => state.map.location);

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
  const makeTargetArea = (latitude, longitude) => {
    target_area = {
      maxLatitude: latitude + 0.01893173974,
      minLatitude: latitude - 0.01893173974,
      maxLongitude: longitude + 0.0398315272,
      minLongitude: longitude - 0.0398315272,
    };
    return target_area;
  };

  useEffect(() => {
    let latitude;
    let longitude;
    if (Object.keys(mapLocation).length == 0) {
      let locationPromise = new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition((position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        });
      });

      locationPromise.then(function ({ latitude, longitude }) {
        target_area = makeTargetArea(latitude, longitude);
        refetch(target_area);
        dispatch(userActions.location({ latitude, longitude }));
      });
    } else {
      target_area = makeTargetArea(mapLocation.latitude, mapLocation.longitude);
      refetch(target_area);
    }
    // let locationPromise = new Promise(function (resolve, reject) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     latitude = position.coords.latitude;
    //     longitude = position.coords.longitude;
    //     resolve({ latitude, longitude });
    //   });
    // });

    // locationPromise.then(function ({ latitude, longitude }) {
    //   target_area = makeTargetArea(latitude, longitude);
    //   refetch(target_area);
    //   dispatch(userActions.location({ latitude, longitude }));
    // });
  }, [mapLocation]);

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
