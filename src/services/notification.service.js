import {apiSlice} from "@/redux/api/apiSlice.js";

export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: () => "/notifications",
            transformResponse: (response) => response.data,
        }),
    }),
});

export const { useGetNotificationQuery } = notificationApiSlice;