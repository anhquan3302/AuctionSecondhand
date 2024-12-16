import {createSlice} from "@reduxjs/toolkit";

const itemShopSlice = createSlice({
    name: "itemShop",
    initialState: {
        keyword: "",
        min: 0,
        max: 16000000000,
        scIds: [],
        page: 0,
        limit: 6,
        userId: 0,
    },
    reducers: {
        setFilters: (state, action) => {
            const { keyword, min, max, scIds, page, limit, userId } = action.payload;
            if (keyword !== undefined) state.keyword = keyword;
            if (min !== undefined) state.min = min;
            if (max !== undefined) state.max = max;
            if (scIds !== undefined) state.scIds = scIds;
            if (page !== undefined) state.page = page;
            if (limit !== undefined) state.limit = limit;
            if (userId !== undefined) state.userId = userId;
        },
    },
});

export const { setFilters: setItemShopFilters } = itemShopSlice.actions;
export default itemShopSlice.reducer;
