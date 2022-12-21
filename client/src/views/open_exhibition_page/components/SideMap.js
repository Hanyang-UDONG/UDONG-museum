/* global kakao */

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function SideMap({ setPlace, place }) {
  const container = useRef(null);
  const location = useSelector((state) => state.user.location);
  const markerImage = new kakao.maps.MarkerImage(
    `${process.env.PUBLIC_URL}/image/marker1_red.png`,
    new kakao.maps.Size(40, 45),
    new kakao.maps.Point(13, 34)
  );
  let marker = new kakao.maps.Marker({});

  useEffect(() => {
    const options = {
      center: new window.kakao.maps.LatLng(
        location.latitude,
        location.longitude
      ),
      level: 6,
      scrollwheel: false,
      clickable: true,
      disableDoubleClick: true,
      disableDoubleClickZoom: true,
    };
    const map = new window.kakao.maps.Map(container.current, options);
    marker = new kakao.maps.Marker({
      image: markerImage,
      position: new kakao.maps.LatLng(place.latitude, place.longitude),
    });
    if (place !== "") {
      marker.setMap(map);
    }
    kakao.maps.event.addListener(map, "click", function (e) {
      marker.setMap(null);
      marker = new kakao.maps.Marker({
        image: markerImage,
        position: e.latLng,
      });
      marker.setMap(map);
      setPlace({ latitude: e.latLng.Ma, longitude: e.latLng.La });
    });
  }, [place]);

  return <KakaoMapContainer ref={container}></KakaoMapContainer>;
}
export default SideMap;

const KakaoMapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
