// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "../api/apiSlide";
// import authReducer, { setCredentials } from "../auth/authSlide";
import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../api/apiSlice";
import authReducer, {setCredentials} from "../auth/authSlice";
import itemReducer from "../item/itemSlice";
import itemShopReducer from "../item/itemStoreSlice";
import userReducer from "../user/userSlice";
//import { getDefaults } from "react-i18next";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        item: itemReducer,
        itemShop: itemShopReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});
// Khôi phục trạng thái đăng nhập từ localStorage nếu có
const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");
const user = JSON.parse(localStorage.getItem("user"));

if (token && refreshToken && user) {
    store.dispatch(
        setCredentials({data: {user, token, refresh_token: refreshToken}}),
    );
}
