import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    //TODO post:postSlice create post store and store all the posts in store so tht everytime there is no need to make an request to database
  },
});

export default store;
