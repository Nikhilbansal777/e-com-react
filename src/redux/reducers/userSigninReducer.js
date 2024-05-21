import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSigninSlice = createSlice({
    name: "signin",
    initialState: {
        signinInfo: [],
        status: "idle",
        isUserSignin: false,
        errorMessage: "Your authentication info is wrong, please enter correct details."
    },
    reducers: {
        isUserSigninSuccessfull: (state, action) => {
            state.isUserSignin = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getSigninInfo.pending, (state) => {
    //             state.status = "loading";
    //         })
    //         .addCase(getSigninInfo.fulfilled, (state, action) => {
    //             state.status = "succeeded";
    //             state.signinInfo = action.payload;
    //         })
    //         .addCase(getSigninInfo.rejected, (state) => {
    //             state.status = "failed";
    //         });
    // }
});

// export const getSigninInfo = createAsyncThunk("admin/getSigninInfo", async () => {
//     const res = await axios.get('http://localhost:5000/api/getSignupInfo');
//     console.log(res);
//     return res.data;
// });


export const { isUserSigninSuccessfull } = userSigninSlice.actions;
export default userSigninSlice.reducer;