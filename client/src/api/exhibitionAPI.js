import axios from "axios";

const GET_NEAR = async (data) => {
  try {
    const response = await axios.get("/api/exhibitions/near", {
      params: data,
    });
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.message,
    };
  }
};

const GET_RECENT = async () => {
  try {
    const response = await axios.get("/api/exhibitions/following/recent");
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.message,
    };
  }
};
const CREATE_EXHIBITION = async (data) => {
  try {
    const response = await axios.post("/api/exhibitions/register", data);
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.message,
    };
  }
};
const deleteExhibition = () => {};
const editExhibition = () => {};
const GET_EXHIBITION = async (eid) => {
  try {
    const response = await axios.get(`/api/exhibitions/${eid}`);
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.message,
    };
  }
};

export {
  GET_NEAR,
  GET_RECENT,
  CREATE_EXHIBITION,
  deleteExhibition,
  editExhibition,
  GET_EXHIBITION,
};
