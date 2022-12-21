import styled, { css } from "styled-components";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  DELETE_PHOTO,
  EDIT_PHOTO,
  GET_PHOTO,
  UPLOAD_PHOTO,
} from "../../api/photoAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import * as S from "../../components/uploadForm/UploadForm_Style";

function UploadPhotoPage({ isUpload }) {
  const navigate = useNavigate();
  const { pid } = useParams();
  const user = useSelector((state) => state.user.user);
  const { mutate: upload } = useMutation(UPLOAD_PHOTO);
  const { mutate: edit } = useMutation(EDIT_PHOTO);
  const { mutate: del } = useMutation(DELETE_PHOTO);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();
  const { data } = useQuery(["get_photo", pid], () => GET_PHOTO(pid), {
    onSuccess: (data) => {
      reset({
        // set default form value
        title: data.data.info?.title,
        description: data.data.info?.description,
        date: moment(data.data.info?.date).format("yyyy-MM-DD"),
        photo: data.data.info?.img,
      });
    },
  });
  const onFormSubmit = () => {
    const { photo, title, date, description } = getValues();
    const data = {
      photo,
      title,
      date,
      description,
    };

    if (isUpload) {
      // upload photo
      upload(data, {
        onSuccess: (res) => {
          if (res.data.registerPhotoSuccess) {
            navigate(`/${user.id}`);
          }
        },
      });
    } else {
      // edit photo
      edit(
        { pid, data },
        {
          onSuccess: (res) => {
            console.log(res);
            if (res.data.editPhotoInfoSuccess) {
              navigate(-1);
            }
          },
        }
      );
    }
  };

  const onDeleteClick = () => {
    del(pid, {
      onSuccess: (res) => {
        if (res.data.deletePhotoSuccess) {
          navigate(-1);
        }
      },
    });
  };
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <S.UploadFormContainer>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div style={{ fontSize: "30px" }}>
            {isUpload ? <>사진 등록하기</> : <>사진 수정하기</>}
          </div>
          <S.UploadFormInputs>
            <label htmlFor="photo">
              <UploadPhotoInput>
                <IoIosAddCircleOutline size={50} />
              </UploadPhotoInput>
            </label>
            <input
              type="file"
              id="photo"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              {...register("photo", {
                // required: "Photo is required",
              })}
            />
            <S.UploadInfoInputContainer>
              <S.InfoInput>
                <S.FormLabel htmlFor="title">제목</S.FormLabel>
                <S.TitleInput
                  type="text"
                  id="title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  isError={errors.title}
                />
              </S.InfoInput>
              <S.InfoInput>
                <S.FormLabel htmlFor="date">날짜</S.FormLabel>
                <S.DateInput
                  type="date"
                  id="date"
                  {...register("date")}
                ></S.DateInput>
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
          </S.UploadFormInputs>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "right" }}
          >
            {!isUpload && (
              <PhotoDeleteBtn onClick={handleSubmit(onDeleteClick)}>
                사진 삭제
              </PhotoDeleteBtn>
            )}
            <FormSubmitBtn>
              {isUpload ? <>등록하기</> : <>수정하기</>}
            </FormSubmitBtn>
          </div>
        </form>
      </S.UploadFormContainer>
    </div>
  );
}
export default UploadPhotoPage;

const UploadForm = styled.form``;

const UploadPhotoInput = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 20px;
  background-color: #f2f6f9;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: gray;
    cursor: pointer;
  }
  margin-right: 50px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  height: 40px;
  border-radius: 7px;
  border: none;
  margin-top: 20px;
  margin-left: 10px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
  color: white;
`;
const FormSubmitBtn = styled(Button)`
  background-color: ${(props) => props.theme.colors.point};
`;
const PhotoDeleteBtn = styled(Button)`
  background-color: ${(props) => props.theme.colors.error};
`;
