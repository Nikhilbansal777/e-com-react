import { createSlice } from "@reduxjs/toolkit";

const UserSignupSlice = createSlice({
    name: "signup",
    initialState: {
        signupInfo: [],
        status: "idle",
        isSignup: false
    },
    reducers: {
        isUserSignup: (state, action) => {
            state.isSignup = action.payload;
        },
        setSignupInfo: (state, action) => {
            state.signupInfo = action.payload;
        }
    },
});
export const { isUserSignup, setSignupInfo } = UserSignupSlice.actions;
export default UserSignupSlice.reducer;