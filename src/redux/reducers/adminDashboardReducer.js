import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        products: [],
        status: "idle"
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsForAdmin.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(deleteProductsForAdmin.fulfilled, (state, action) => {
                console.log(action.payload);
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
                state.status = "pending";
            })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state) => {
                state.status = "error";
            });
    }
});

export const getProductsForAdmin = createAsyncThunk("products/getProducts", async () => {
    const res = await axios.get("http://localhost:5000/api/getProducts");
    return res.data;
});

export const deleteProductsForAdmin = createAsyncThunk("products/deleteProducts", async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/deleteProduct/${id}`);
    return res.data.id;
});

export default adminSlice.reducer;