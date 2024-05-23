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
                state.products = action.payload;
            })
            .addCase(getCategoryProducts.fulfilled, (state, action) => {
                state.categories = action.payload;
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
    const res = await axios.get("http://localhost:5000/api/getProducts");
    return res.data;
});

export const getCategoryProducts = createAsyncThunk("products/getCategoryProducts", async (category) => {
    console.log(category);
    const res = await axios.get(`http://localhost:5000/api/getCategoryProducts/${category}`);
    console.log(res.data);
    return res.data;
});
export default productSlice.reducer;