import { createSlice } from "@reduxjs/toolkit";

export const spaceSlice = createSlice({
    name: "space",
    initialState: {
        spaceValue: null,
        spacesValue: null,
        mySpaceValue: null
    },
    reducers: {
        getSpace: (state, action) => {
            state.spaceValue = action.payload;
        },
        getSpaces: (state, action) => {
            state.spacesValue = action.payload;
        },
        getMySpace: (state, action) => {
            state.mySpaceValue = action.payload;
        }
    }
});

export const { getSpace, getSpaces, getMySpace } = spaceSlice.actions;
export default spaceSlice.reducer;