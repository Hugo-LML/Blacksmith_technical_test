import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userValue: null,
        usersValue: null,
    },
    reducers: {
        getUser: (state, action) => {
            state.userValue = action.payload;
        },
        getUsers: (state, action) => {
            state.usersValue = action.payload;
        }
    }
});

export const { getUser, getUsers} = userSlice.actions;
export default userSlice.reducer;