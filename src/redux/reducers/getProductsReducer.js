import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("products/getProducts", async () => {
    const res = await axios.get("http://localhost:5000/api/getProducts");
    return res.data;
});

export const getCategoryProducts = createAsyncThunk("products/getCategoryProducts", async (category) => {
    const res = await axios.get(`http://localhost:5000/api/getCategoryProducts/${category}`);
    return res.data;
});

export const getWishlistProducts = createAsyncThunk("products/getWishlistProduct", async (email) => {
    const res = await axios.get(`http://localhost:5000/api/getWishlistProducts?email=${email}`);
    return res.data;
});

export const setWishlist = createAsyncThunk('products/setWishlist', async (wishlistProduct) => {
    const res = await axios.post(`http://localhost:5000/api/setWishlist`, wishlistProduct);
    return res.data;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: "idle",
        error: null,
        categories: [],
        wishlist: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.status = "succeeded";
            })
            .addCase(getCategoryProducts.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.status = "succeeded";
            })
            .addCase(setWishlist.fulfilled, (state, action) => {
                // state.wishlist.push(action.payload);
                state.status = "succeeded";
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

export default productSlice.reducer;
