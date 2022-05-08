import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user.slice";
import spaceReducer from "../features/space.slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        space: spaceReducer
    }
});