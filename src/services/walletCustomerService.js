import {apiSlice} from "@/redux/api/apiSlice.js";

export const walletCustomerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        depositUser: builder.mutation({
            query: (credentials) => ({
                url: "/walletCustomer/deposit",
                method: "POST",
                body: {...credentials},
            }),
        }),

        checkDepositUser: builder.mutation({
            query: (orderCode) => ({
                url: `/walletCustomer/${encodeURIComponent(orderCode)}`,
                method: "GET",
            }),
        }),

        getBalance: builder.query({
            query: () => "/walletCustomer/get-balance",
            transformResponse: (response) => {
                console.log("API Response:", response); // Log to verify structure
                return response.data; // Adjust based on actual response
            },
        }),

        getTransactionWalletByUser: builder.query({
            query: ({ transactionCode }) => `/walletCustomer/${transactionCode}`,
            transformResponse: (response) => {
                console.log("API Response:", response); // Log to verify structure
                return response.data; 
            },
        }),
        
        
    }),
});

export const {useDepositUserMutation, useCheckDepositUserMutation, useGetBalanceQuery, useGetTransactionWalletByUserQuery} = walletCustomerApiSlice;