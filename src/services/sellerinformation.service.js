import { apiSlice } from "../redux/api/apiSlice.js";

export const sellerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({


    getSellerInformationByAuctionId: builder.query({
      query: (auctionId) => `/seller-information/auction/${auctionId}`, // Đường dẫn API
    }),


    getSellerInformationByUserId: builder.query({
      query: (userId) => `/seller-information/user/${userId}`, // New user-based API path
    }),

    updateSellerInformation: builder.mutation({
      query: (sellerInformationDto) => ({
        url: '/seller-information',  // Địa chỉ API
        method: 'PUT',  // Phương thức PUT
        body: sellerInformationDto,  // Dữ liệu gửi lên API
      }),
    }),

    getSellerInformationByToken: builder.query({
      query: () => '/seller-information',  
    }),


  }),
});

export const
  { useGetSellerInformationByAuctionIdQuery,
    useGetSellerInformationByUserIdQuery,
    useUpdateSellerInformationMutation,
    useGetSellerInformationByTokenQuery, 
  } = sellerApiSlice;
