import axios from "axios";

const UPLOAD_PHOTO = async (data) => {
  try {
    const response = await axios.post("/api/photos/register", data);
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.message,
    };
  }
};
const EDIT_PHOTO = async ({ pid, data }) => {
  try {
    const response = await axios.post(`/api/photos/${pid}/edit`, data);
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.message,
    };
  }
};
const GET_PHOTO = async (pid) => {
  try {
    const response = await axios.get(`/api/photos/${pid}`);
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.message,
    };
  }
};
const DELETE_PHOTO = async (pid) => {
  try {
    const response = await axios.post(`/api/photos/${pid}/delete`);
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.message,
    };
  }
};
const PHOTO_LISTUP = async (uid) => {
  try {
    const response = await axios.get(`/api/photos/${uid}/listUp`);
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.message,
    };
  }
};

export { UPLOAD_PHOTO, EDIT_PHOTO, GET_PHOTO, DELETE_PHOTO, PHOTO_LISTUP };
