import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
import { useSelector } from "react-redux";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(`${BASE_URL}/getProducts`);
    const result = await response.json();
    return result;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    error: null,
    result: {
      success: null,
      products: [],
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        (state.loading = true), (state.error = null), (state.result = {});
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.result = action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload.message),
          (state.result = {});
      });
  },
});

export const productsSelector = () => {
  return useSelector((state) => state.products);
};

export default productSlice.reducer;
