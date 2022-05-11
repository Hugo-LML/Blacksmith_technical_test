import { createSlice } from "@reduxjs/toolkit";

export const spaceSlice = createSlice({
    name: "space",
    initialState: {
        spaceValue: null,
        spacesValue: null,
        mySpaceValue: null,
        parkedValue: null
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
        },
        editSpace: (state, action) => {
            state.spacesValue.forEach(space => {
                if (space.id === action.payload.id) {
                    space.availability = action.payload.availability;
                    space.user_id = action.payload.user_id;
                }
            });
            state.parkedValue = action.payload.parked;
        },
        addSpace: (state, action) => {
            state.spacesValue.push(action.payload);
        }
    }
});

export const { getSpace, getSpaces, getMySpace, editSpace, addSpace } = spaceSlice.actions;
export default spaceSlice.reducer;