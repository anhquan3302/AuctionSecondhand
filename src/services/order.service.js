import {apiSlice} from "../redux/api/apiSlice.js";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrder: builder.query({
            query: (paging) => ({
                url: "/orders/user", // Adjust URL if necessary
                method: "GET", // Ensure this is a GET request
                params: {
                    page: paging.page || 0, // Default to 0 if not provided
                    limit: paging.limit || 10, // Default to 10 if not provided
                },
            }),

        }),

        createOrder: builder.mutation({
            query: (credentials) => ({
                url: "/orders",
                method: "POST",
                body: {...credentials},
            }),
        }),

        getOrderAdmin: builder.query({
            query: (paging) => ({
                url: '/orders',
                params: {
                    page: paging.page || 0,
                    limit: paging.limit || 10,
                    status: paging.status,
                },
            }),
        }),

        getOrderRevenue: builder.query({
            query: () => ({
                url: "/orders/revenue",
            }),
        }),

        getOrderSeller: builder.query({
            query: (paging) => ({
                url: "/orders/seller",
                method: "GET",
                params: {
                    page: paging.page || 0,
                    limit: paging.limit || 10,
                },
            }),
        }),

        getOrderDetail: builder.query({
            query: (orderId) => ({
                url: `/orders/detail/${encodeURIComponent(orderId)}`,
                method: "GET",
            }),
        }),

        getOrderUserByMonth: builder.query({
            query: () => ({
                url: '/orders/statistics/monthly',
                method: 'GET',
            }),
        }),
    }),
});

// Export the hook for use in components
export const {
    useGetOrderQuery,
    useCreateOrderMutation,
    useGetOrderAdminQuery,
    useGetOrderRevenueQuery,
    useGetOrderSellerQuery,
    useGetOrderDetailQuery,
    useGetOrderUserByMonthQuery,
} = orderApiSlice;
 