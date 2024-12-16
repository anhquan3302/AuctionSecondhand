import {apiSlice} from "../redux/api/apiSlice";

export const auctionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        auctionCreate: builder.mutation({
            query: (credentials) => ({
                url: "/auctions",
                method: "POST",
                body: {...credentials},
            }),
        }),

        getAuctionById: builder.query({
            query: (id) => ({
              url: `/auctions/${encodeURIComponent(id)}`,
            }),
        
          }),

        getAuctionCreatedToday: builder.query({
            query: () => '/auctions/count-today', // Nếu baseUrl đã được cấu hình
            transformResponse: (response) => response, // Không sửa đổi kết quả trả về
        }),

        getAuctionCreatedMonth: builder.query({
            query: () => '/auctions/count-month',
        })
    }),
});

export const {
    useAuctionCreateMutation,
    useGetAuctionByIdQuery,
    useGetAuctionCreatedTodayQuery,
    useGetAuctionCreatedMonthQuery,
} = auctionApiSlice;

