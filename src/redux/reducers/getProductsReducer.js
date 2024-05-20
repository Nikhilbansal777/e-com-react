import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: "idle",
        error: null,
        categories: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                console.log(action.payload);
                state.products = action.payload;
            })
            .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
                state.status = "loading";
            })
            .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export const getProducts = createAsyncThunk("products/getProducts", async () => {
    const res = await axios.get("http://localhost:5000/api/getData");
    console.log(res.data);
    return res.data;
});

export default productSlice.reducer;