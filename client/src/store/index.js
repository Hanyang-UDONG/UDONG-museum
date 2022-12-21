import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { profileSlice } from "./profileSlice";
import { exhibitionSlice } from "./exhibitionSlice";
import { mapSlice } from "./mapSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  profile: profileSlice.reducer,
  exhibition: exhibitionSlice.reducer,
  map: mapSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // user와 관련된 state는 새로고침 시 persistent함
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({ reducer: persistedReducer });

export default store;
