import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const adminLoginSlice = createSlice({
    name: "adminLogin",
    initialState: {
        adminCred: [],
        status: "idle",
        errorMessage: "Your authentication info is wrong, please enter correct details.",
        isValuesCorrect: false,
        isAdminSignedIn: false
    },
    reducers: {
        checkValues: (state, action) => {
            state.isValuesCorrect = action.payload;
        },
        isAdminLoggedIn: (state, action) => {
            state.isAdminSignedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAdminCred.fulfilled, (state, action) => {
            state.adminCred = action.payload;
        })
            .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
                state.status = "pending";
            });
    }
});

export const getAdminCred = createAsyncThunk("admin/getAdminCred", async () => {
    const res = await axios.get('http://localhost:5000/api/adminCreds');
    console.log(res);
    return res.data;
});

export const { checkValues, isAdminLoggedIn } = adminLoginSlice.actions;
export default adminLoginSlice.reducer;