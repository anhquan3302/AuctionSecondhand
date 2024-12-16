import { apiSlice } from "../redux/api/apiSlice.js";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/user/getUser",
            transformResponse: (response) => response.users,
        }),
        getUserById: builder.query({
            query: () => "/user",
            transformResponse: (response) => response.data,
        }),

        changePassword: builder.mutation({
            query: (credentials) => ({
                url: "/user/changePassword",
                method: "PATCH",
                body: { ...credentials },
            }),
        }),

        updateUser: builder.mutation({
            query: (credentials) => ({
                url: "/user",
                method: "PUT",
                body: { ...credentials },
            }),
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: "DELETE",
            }),
        }),

        getAllUser: builder.query({
            query: (paging) => ({
                url: "/user/get-users",
                params: {
                    page: paging.page || 0,
                    limit: paging.limit || 10,
                },
            }),
            transformResponse: (response) => {
                return {
                    items: response.data || [],
                    totalPages: response.data.totalPages || 0,
                    totalProducts: response.data.totalElements || 0,
                };
            },
            
        }),

        getUserComparison: builder.query({
            query: () => "/user/comparison",
        }),

        getCountUserByWeek: builder.query({
            query: () => "/user/count-by-week",
        })
       
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useChangePasswordMutation,
    useUpdateUserMutation,
    useGetAllUserQuery,
    useDeleteUserMutation,
    useGetUserComparisonQuery ,
    useGetCountUserByWeekQuery,
} = userApiSlice;
