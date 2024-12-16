import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";
import { api } from "../../configs/config";

const baseQuery = fetchBaseQuery({
  baseUrl: api,
  prepareHeaders: (headers, { getState }) => {
    let token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithoutAuth = fetchBaseQuery({
  baseUrl: api,
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  //console.log("Initial result:", result);

  if (result?.error?.status === 403) {
    //console.log("Sending refresh token");

    const refreshToken = localStorage.getItem("refreshToken");
    //console.log("Stored refresh token:", refreshToken);

    if (refreshToken) {
      const refreshResult = await baseQueryWithoutAuth(
        {
          url: "/auth/refreshToken",
          method: "POST",
          headers: {
            authorization: `Bearer ${refreshToken}`,
          },
        },
        api,
        extraOptions,
      );

      //console.log("Refresh result:", refreshResult);

      if (refreshResult?.data) {
        const { token, refresh_token } = refreshResult.data.data;
        const user = api.getState().auth.user;

        // Cập nhật token mới vào Redux store và localStorage
        api.dispatch(setCredentials({ data: { user, token, refresh_token } }));

        // Cập nhật lại localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refresh_token);

        // Gửi lại yêu cầu gốc với token mới
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
