import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSigninSlice = createSlice({
    name: "signin",
    initialState: {
        signinInfo: null,
        status: "idle",
        isUserSignin: false,
        errorMessage: "Your authentication info is wrong, please enter correct details."
    },
    reducers: {
        isUserSigninSuccessfull: (state, action) => {
            state.isUserSignin = action.payload;
        },
        setSigninInfo: (state, action) => {
            state.signinInfo = action.payload
        }
    }
});


export const { isUserSigninSuccessfull, setSigninInfo } = userSigninSlice.actions;
export default userSigninSlice.reducer;