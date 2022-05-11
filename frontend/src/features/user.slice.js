import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userValue: null,
        usersValue: null,
        userSignUpOrIn: null
    },
    reducers: {
        getUser: (state, action) => {
            state.userValue = action.payload;
        },
        getUsers: (state, action) => {
            state.usersValue = action.payload;
        },
        editUser: (state, action) => {
            state.userValue.forEach(user => {
                if (user.id === action.payload.id) {
                    user.first_name = action.payload.firstName;
                    user.last_name = action.payload.lastName;
                    user.phone = action.payload.phone;
                }
            })
            state.usersValue.forEach(user => {
                if (user.id === action.payload.id) {
                    user.first_name = action.payload.firstName;
                    user.last_name = action.payload.lastName;
                    user.phone = action.payload.phone;
                }
            })
        },
        deleteUser: (state, action) => {
            state.userValue = null;
            const arrayDelete = [];
            state.usersValue.forEach(user => {
                if (user.id !== action.payload) {
                    arrayDelete.push(user);
                }
            });
            state.usersValue = arrayDelete;
        },
        logUser: (state, action) => {
            state.userSignUpOrIn = action.payload;
        }
    }
});

export const { getUser, getUsers, editUser, deleteUser, logUser } = userSlice.actions;
export default userSlice.reducer;