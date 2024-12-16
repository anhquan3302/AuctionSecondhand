import {apiSlice} from "../redux/api/apiSlice.js";

export const itemApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query({
            query: (paging) => ({
                url: "item/product-appraisal",
                params: {
                    page: paging.page || 0,
                    limit: paging.limit || 10,
                },
            }),
            transformResponse: (response) => {
                return {
                    items: response.data.data || [],
                    totalPages: response.data.totalPages || 0,
                    totalProducts: response.data.totalElements || 0,
                };
            },
        }),
        getFeatureItems: builder.query({
            query: () => "item/top-10-featured-item",
            transformResponse: (response) => response.data,
        }),

        getItemsFilter: builder.query({
            query: (filters) => ({
                url: "item",
                params: {
                    keyword: filters.keyword || "",
                    page: filters.page || 0,
                    limit: filters.limit || 8,
                    minPrice: filters.min || 0,
                    maxPrice: filters.max || 1600000,
                    scIds: filters.scIds?.join(",") || "",
                }
            }),
            transformResponse: (response) => {
                return {
                    item: response.data.data || [],
                    totalPages: response.data.totalPages || 0,
                    totalProducts: response.data.totalProducts || 0,
                };
            },
        }),

        getItemDetail: builder.query({
            query: ({id}) => `/item/detail/${encodeURIComponent(id)}`,
            transformResponse: (response) => response.data,
        }),

        getAuctionProcessItem: builder.query({
            query: (paging) => ({
                url: "item/auction-process/user",
                params: {
                    page: paging.page || 0,
                    limit: paging.limit || 10,
                },
            }),
            transformResponse: (response) => {
                return {
                    items: response.data.data || [],
                    totalPages: response.data.totalPages || 0,
                    totalProducts: response.data.totalElements || 0,
                };
            },
        }),

        getAuctionProcessDetail: builder.query({
            query: ({id}) => `/item/auction-process/${encodeURIComponent(id)}`,
            transformResponse: (response) => response.data,
        }),

        getAuctionCompletedItem: builder.query({
            query: (paging) => ({
                url: "item/auction-completed/user",
                params: {
                    page: paging.page || 0,
                    limit: paging.limit || 10,
                },
            }),
            transformResponse: (response) => {
                return {
                    totalPages: response.data.totalPages || 0,
                    items: response.data.items || [],
                    totalProducts: response.data.totalElements || 0,
                };
            },
        }),

        registerItem: builder.mutation({
            query: (credentials) => ({
                url: "/item",
                method: "POST",
                body: {...credentials},
            }),
        }),

        getItemByUser: builder.query({
            query: (paging) => ({
                url: "item/product-user",
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

        createItem: builder.mutation({
            query: (credentials) => ({
                url: "/item",
                method: "POST",
                body: {...credentials},
            }),
            transformResponse: (response) => response.data,
        }),

        getItemAdmin: builder.query({
            query: (paging) => ({
                url: "item/pending",
                params: {
                    page: paging.page || 0,
                    limit: paging.limit || 10,
                },
            }),

        }),

        // Trong services/item.service.js
        approveItemAdmin: builder.mutation({
            query: ({itemId, status, reason}) => ({
                url: `/item/approve/${itemId}`,
                method: "PUT",
                body: {status, reason},
            }),
        }),


        getSeller: builder.query({
            query: ({id}) => `/item/get-seller/${id}`,
            transformResponse: (response) => response.data,
        }),

        getItemPendingAuction: builder.query({
            query: (paging) => ({
                url: "item/pending-auction",
                params: {
                    page: paging.page || 0,
                    limit: paging.limit || 10,
                },
            }),

        }),

        getItemsBySeller: builder.query({
            query: (filters) => ({
                url: "/item/by-seller",
                params: {
                    keyword: filters?.keyword || "",
                    page: filters?.page || 0,
                    limit: filters?.limit || 8,
                    minPrice: filters?.min || 0,
                    maxPrice: filters?.max || 1600000,
                    scIds: filters?.scIds?.join(",") || "",
                    userId: filters?.userId || null,
                }
            }),
        }),

        getMostParticipatingItems: builder.query({
            query: () => "item/top-10-most-participating-products",
            transformResponse: (response) => response.data,
        }),

        getSimilarItemAuction: builder.query({
            query: (paging) => ({
                url: "item/similar-item",
                params: {
                    mainCategoryId: paging.mainCategoryId,
                    page: paging.page || 0,
                    limit: paging.limit || 10,
                },
            }),
        }),

        getUpdateItem: builder.mutation({
            query: ({ id, body }) => ({
                url: `item/${id}`,
                method: "PUT",
                body: body,
            }),
        }),

    }),
});

export const {
    useGetItemsQuery,
    useGetFeatureItemsQuery,
    useGetItemsFilterQuery,
    useGetItemDetailQuery,
    useGetAuctionProcessItemQuery,
    useGetAuctionProcessDetailQuery,
    useGetAuctionCompletedItemQuery,
    useRegisterItemMutation,
    useGetItemByUserQuery,
    useCreateItemMutation,
    useGetItemAdminQuery,
    useApproveItemAdminMutation,
    useGetSellerQuery,
    useGetItemPendingAuctionQuery,
    useGetItemsBySellerQuery,
    useGetMostParticipatingItemsQuery,
    useGetSimilarItemAuctionQuery,
    useGetUpdateItemMutation
} = itemApiSlice;