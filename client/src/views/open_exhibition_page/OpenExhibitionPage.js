import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import {
  CREATE_EXHIBITION,
  DELETE_EXHIBITION,
  EDIT_EXHIBITION,
  GET_EXHIBITION,
} from "../../api/exhibitionAPI";
import { PHOTO_LISTUP } from "../../api/photoAPI";
import * as S from "../../components/uploadForm/UploadForm_Style";
import * as D from "../../components/feed/Feed_Style";
import * as F from "../../components/feed/Feed_Style";
import { BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import SideMap from "./components/SideMap";
import moment from "moment";

function OpenExhibitionPage({ isUpload }) {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [place, setPlace] = useState("");
  const { mutate: open } = useMutation(CREATE_EXHIBITION);
  const { mutate: edit } = useMutation(EDIT_EXHIBITION);
  const { mutate: del } = useMutation(DELETE_EXHIBITION);
  const { register, handleSubmit, getValues, reset } = useForm();
  let { id: uid } = useSelector((state) => state.user.user);
  const { eid } = useParams();

  // if exhibition edit page
  const { data } = useQuery(
    ["get_exhibition", eid],
    () => GET_EXHIBITION(eid),
    {
      onSuccess: (data) => {
        reset({
          // set default form value
          title: data.data.info?.name,
          description: data.data.info?.description,
          start_date: moment(data.data.info?.startDate).format("yyyy-MM-DD"),
          end_date: moment(data.data.info?.endDate).format("yyyy-MM-DD"),
        });
        setUploads(data.data.info?.photos);
        setPlace({
          latitude: data.data.info?.latitude,
          longitude: data.data.info?.longitude,
        });
      },
    }
  );

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
  const onDeleteClick = () => {
    del(eid, {
      onSuccess: (res) => {
        if (res.data.deleteExhibitionSuccess) {
          navigate(`/${uid}`);
        }
      },
    });
  };
  const onFormSubmit = () => {
    const { title, start_date, end_date, description } = getValues();
    const data = {
      name: title,
      startDate: start_date,
      endDate: end_date,
      description,
      photos: uploads,
      latitude: place.latitude,
      longitude: place.longitude,
    };
    if (isUpload) {
      // open exhibition
      open(data, {
        onSuccess: (res) => {
          if (res.data.registerExhibitionSuccess) {
            navigate(`/${uid}`);
          }
        },
      });
    } else {
      // edit exhibition
      edit(
        { eid, data },
        {
          onSuccess: (res) => {
            console.log(res);
            if (res.data.editExhibitionInfoSuccess) {
              navigate(`/exhibition/${eid}`);
            }
          },
        }
      );
    }
  };
  const toggleCheck = (pid, used) => {
    if (!used) {
      if (uploads.includes(pid)) {
        setUploads(uploads.filter((id) => id !== pid));
      } else {
        setUploads([...uploads, pid]);
      }
    }
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <S.UploadFormContainer>
        <S.UploadInfoInputContainer>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: "30px" }}>전시회 열기</div>
              <div style={{ display: "flex" }}>
                {!isUpload && (
                  <FormSubmitBtn
                    isDelete={true}
                    onClick={handleSubmit(onDeleteClick)}
                  >
                    삭제하기
                  </FormSubmitBtn>
                )}
                <FormSubmitBtn>
                  {isUpload ? <>등록하기</> : <>수정하기</>}
                </FormSubmitBtn>
              </div>
            </div>
            <S.UploadFormInputs style={{ marginBottom: "50px" }}>
              <S.UploadInfoInputContainer>
                <S.InfoInput>
                  <S.FormLabel htmlFor="title">제목</S.FormLabel>
                  <S.TitleInput
                    type="text"
                    id="title"
                    {...register("title", {
                      required: "Title is required",
                    })}
                  />
                </S.InfoInput>
                <S.InfoInput>
                  <S.FormLabel htmlFor="place">장소</S.FormLabel>
                  <PlaceAlert>
                    {place === ""
                      ? "지도에서 전시회를 열 장소를 선택해주세요"
                      : "전시회 장소가 선택되었습니다"}
                  </PlaceAlert>
                </S.InfoInput>
                <S.InfoInput>
                  <S.FormLabel htmlFor="start_date">시작일</S.FormLabel>
                  <S.DateInput
                    type="date"
                    id="start_date"
                    {...register("start_date")}
                  ></S.DateInput>
                  <S.InfoInput style={{ flexGrow: "1", marginLeft: "10px" }}>
                    <S.FormLabel htmlFor="end_date">종료일</S.FormLabel>
                    <S.DateInput
                      type="date"
                      id="end_date"
                      {...register("end_date")}
                    ></S.DateInput>
                  </S.InfoInput>
                </S.InfoInput>

                <S.InfoInput>
                  <S.FormLabel htmlFor="description">설명</S.FormLabel>
                  <S.DescriptionInput
                    type="text"
                    id="description"
                    {...register("description")}
                  />
                </S.InfoInput>
              </S.UploadInfoInputContainer>
              <MapContainer>
                <SideMap place={place} setPlace={setPlace} />
              </MapContainer>
            </S.UploadFormInputs>
            <D.FeedContainer>
              {photos.map(({ _id: pid, used, title }, index) => (
                <D.PhotoContainer
                  key={index}
                  onClick={() => toggleCheck(pid, used)}
                >
                  {used ? (
                    <D.PhotoCover enabled={used}>
                      {used && "전시중"}
                    </D.PhotoCover>
                  ) : (
                    <CheckBtnContainer>
                      {uploads.includes(pid) ? (
                        <BsCheckCircleFill size={30} />
                      ) : (
                        <BsCheckCircle size={30} />
                      )}
                    </CheckBtnContainer>
                  )}

                  <D.PhotoImg>{title}</D.PhotoImg>
                </D.PhotoContainer>
              ))}
              {photos.length % 3 === 2 && (
                <F.PhotoContainer filling={true}></F.PhotoContainer>
              )}
            </D.FeedContainer>
          </form>
        </S.UploadInfoInputContainer>
      </S.UploadFormContainer>
    </div>
  );
}

export default OpenExhibitionPage;

const PlaceAlert = styled.div`
  font-size: 13px;
  margin-top: 5px;
`;
const FormSubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  height: 40px;
  border: none;
  border-radius: 7px;
  margin-top: 20px;
  margin-left: 10px;
  background-color: ${(props) => props.theme.colors.point};
  color: white;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.isDelete &&
    css`
      background-color: ${(props) => props.theme.colors.error};
    `}
`;
const MapContainer = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 20px;
  background-color: #f2f6f9;
  margin-left: 50px;
  overflow: hidden;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.3);
`;
const CheckBtnContainer = styled.div`
  padding: 10px;
  width: 100%;
  position: absolute;
  opacity: 1;
  display: flex;
  justify-content: flex-end;
  color: white;
`;
