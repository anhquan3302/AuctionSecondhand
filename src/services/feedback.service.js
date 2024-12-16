import { apiSlice } from "../redux/api/apiSlice.js";

export const feedbackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbackBySellerUserId: builder.query({
      query: ({ userId, page = 0, size = 10 }) => `/feedback/seller/${userId}?page=${page}&size=${size}`,
    }),



    createFeedback: builder.mutation({
      query: (feedbackDto) => ({
        url: '/feedback',
        method: 'POST',
        body: feedbackDto,
      }),
    }),


    checkFeedback: builder.query({
      query: (orderId) => `/feedback/check-feedback/${orderId}`,
    }),

  }),
});



export const
  {
    useGetFeedbackBySellerUserIdQuery,
    useCreateFeedbackMutation,
    useCheckFeedbackQuery
  } = feedbackApiSlice;
