import {createSlice} from "@reduxjs/toolkit";

const itemSlice = createSlice({
        name: "item",
        initialState: {
            keyword: "",
            min: 0,
            max: 16000000000,
            scIds: [],
            page: 0,
            limit: 6,
        },
        reducers: {
            setFilters: (state, action) => {
                const {keyword, min, max, scIds, page, limit} =
                    action.payload;
                if (keyword !== undefined) state.keyword = keyword;
                if (min !== undefined) state.min = min;
                if (max !== undefined) state.max = max;
                if (scIds !== undefined)
                    state.scIds = scIds;
                if (page !== undefined) state.page = page;
                if (limit !== undefined) state.limit = limit;
                //console.log("State updated in reducer: ", state);
            },
        },
    }
);

export const {setFilters} = itemSlice.actions;
export default itemSlice.reducer;
