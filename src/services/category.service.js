import {apiSlice} from "@/redux/api/apiSlice.js";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "/main-category",
            transformResponse: (response) => response.data,
        }),

        getSCategoriesStream: builder.query({
            query: () => "/sub-category/stream",
            //transformResponse: (response) => response.data,
        }),
    }),
});

export const { useGetCategoriesQuery, useGetSCategoriesStreamQuery } = categoryApiSlice;