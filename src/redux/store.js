//Import redux
import { configureStore } from "@reduxjs/toolkit";

//import reducer
import usersSlice from "./reducers/usersSlice.js";

const store = configureStore({
  reducer: {
    users: usersSlice,
  },
  devTools: false
});

export default store;
