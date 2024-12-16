import {apiSlice} from "../redux/api/apiSlice.js";

export const auctionTypeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAuctionType: builder.query({
            query: () => "/auctionType/find-all",
            transformResponse: (response) => response.data,
        }),
    }),
});

export const {
    useGetAuctionTypeQuery
} = auctionTypeApiSlice;