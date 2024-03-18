import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../config";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrdsers",
  async (userId) => {
    const response = await fetch(`${BASE_URL}/orders/${userId}`);
    const result = await response.json();
    return result;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    orders: {
      success: null,
      result: [],
    },
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        (state.loading = true), (state.orders = {}), (state.error = null);
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        (state.loading = false),
          (state.orders = action.payload),
          (state.error = null);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        (state.loading = false),
          (state.orders = {}),
          (state.error = action.payload);
      });
  },
});

export const orderSelector = () => {
  return useSelector((state) => state.orders);
};

export default orderSlice.reducer;
