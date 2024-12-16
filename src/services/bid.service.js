import {apiSlice} from "../redux/api/apiSlice.js";

export const bidApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // API tạo bid
        createBid: builder.mutation({
            query: (bidData) => ({
                url: "/bids",
                method: "POST",
                body: bidData,
            }),
        }),


        getAllBids: builder.query({
            query: ({auctionId, page}) =>
                `/bids/history-bid/${auctionId}?page=${page}`,
        }),

        getWinBid: builder.query({
            query: (auctionId) =>
                `/bids/find-winner/${auctionId}`,
        }),

        getBidInfo: builder.query({
            query: (auctionId) =>
                `/bids/information-bid/${auctionId}`,
            //transformResponse: (response) => response.data,
        }),

        getBidDetail: builder.query({
            query: (auctionId) =>
                `/bids/detail/${auctionId}`,
            //transformResponse: (response) => response.data,
        }),

        getHighestBid: builder.query({
            query: (auctionId) =>
                `/bids/highest-bid/${auctionId}`,
        }),


        createBidSealed: builder.mutation({
            query: (bidData) => ({
                url: "/bids/create/Sealed",
                method: "POST",
                body: bidData,
            }),
        }),
        
    }),
});

export const {
    useCreateBidMutation,
    useGetAllBidsQuery,
    useGetWinBidQuery,
    useGetBidInfoQuery,
    useGetBidDetailQuery,
    useGetHighestBidQuery,
    useCreateBidSealedMutation,
} = bidApiSlice;
